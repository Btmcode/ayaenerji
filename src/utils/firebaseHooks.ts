import { useState, useEffect } from "react";
import { collection, onSnapshot, addDoc, setDoc, deleteDoc, doc, DocumentData } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "./firebase";
import { supabase, isSupabaseConfigured } from "./supabaseClient";

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.warn('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Table schema registry for Supabase column mapping/filtering
const ALLOWED_COLUMNS: Record<string, string[]> = {
  admins: ["id", "email", "createdAt"],
  requests: ["id", "name", "phone", "service", "address", "message", "time", "status", "createdAt"],
  jobApplications: ["id", "name", "phone", "experience", "specialty", "message", "date", "status", "createdAt", "certificateName", "certificateData"],
  blogPosts: ["id", "title", "content", "excerpt", "category", "image", "readTime", "publishedAt", "slug", "status", "createdAt"],
  metrics: ["id", "data", "updatedAt"],
  abTests: ["id", "name", "status", "variants", "updatedAt"],
  settings: [
    "id",
    "companyName",
    "email",
    "adminEmail",
    "adminPassword",
    "twoFactorEnabled",
    "twoFactorSecret",
    "githubRepoUrl",
    "githubBranch",
    "githubToken",
    "webhookUrl",
    "updatedAt"
  ],
  users: ["id", "email", "createdAt"],
  profiles: ["id", "fullName", "phone", "role", "updatedAt"],
  customers: ["id", "name", "address", "phone", "totalSpent", "lastVisit", "status", "service", "createdAt"],
  callLogs: ["id", "phone", "duration", "status", "alert", "time", "createdAt"]
};

export type DBStatus = "healthy" | "degraded" | "offline";
export type DBSource = "firestore" | "supabase";

export interface DBHealth {
  firestore: DBStatus;
  supabase: DBStatus;
  activeSource: DBSource;
  lastFailoverTime: string | null;
  failoverReason: string | null;
  latencyMs: Record<DBSource, number>;
}

// Global state for database routing & status tracking
let globalDBHealth: DBHealth = {
  firestore: "healthy",
  supabase: isSupabaseConfigured ? "healthy" : "offline",
  activeSource: "firestore",
  lastFailoverTime: null,
  failoverReason: null,
  latencyMs: { firestore: 12, supabase: 18 },
};

// Listeners to trigger React updates when health changes
const healthListeners = new Set<(health: DBHealth) => void>();

export function getDBHealth(): DBHealth {
  return { ...globalDBHealth };
}

export function subscribeToDBHealth(listener: (health: DBHealth) => void) {
  healthListeners.add(listener);
  listener({ ...globalDBHealth });
  return () => {
    healthListeners.delete(listener);
  };
}

export function setDBHealth(updates: Partial<DBHealth>) {
  globalDBHealth = { ...globalDBHealth, ...updates };
  healthListeners.forEach(listener => listener({ ...globalDBHealth }));
}

// Trigger failover from primary to standby
export function triggerFailover(reason: string, targetSource?: DBSource) {
  const nextSource = targetSource || (globalDBHealth.activeSource === "firestore" ? "supabase" : "firestore");
  
  if (nextSource === "supabase" && !isSupabaseConfigured) {
    console.warn("[Failover] Cannot failover to Supabase since it is not configured.");
    return;
  }

  console.warn(`[Failover] Database failover triggered! Active source switching from ${globalDBHealth.activeSource} to ${nextSource}. Reason: ${reason}`);
  
  setDBHealth({
    activeSource: nextSource,
    lastFailoverTime: new Date().toISOString(),
    failoverReason: reason,
    firestore: nextSource === "supabase" ? "degraded" : "healthy",
    supabase: nextSource === "firestore" ? "degraded" : "healthy",
  });
}

// Graceful sanitization of objects before saving to Supabase (PostgreSQL)
function sanitizeForSupabase(collectionName: string, item: any): any {
  const allowed = ALLOWED_COLUMNS[collectionName];
  if (!allowed) {
    return item; // Fallback if table not registered
  }

  const sanitized: any = {};
  allowed.forEach((col) => {
    let val = item[col];
    
    // Fallback if field name was mapped in Firestore with a different case (e.g. read_time)
    if (val === undefined) {
      const lowerCol = col.toLowerCase();
      const matchingKey = Object.keys(item).find(k => k.toLowerCase() === lowerCol);
      if (matchingKey) {
        val = item[matchingKey];
      }
    }

    if (val !== undefined) {
      if (val instanceof Date) {
        sanitized[col] = val.toISOString();
      } else if (typeof val === "string" && (col === "createdAt" || col === "updatedAt" || col === "publishedAt" || col === "date") && val.includes(".")) {
        // Handle DD.MM.YYYY Turkish format
        const parts = val.split(".");
        if (parts.length === 3) {
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10) - 1;
          const year = parseInt(parts[2], 10);
          if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
            try {
              sanitized[col] = new Date(year, month, day).toISOString();
            } catch (e) {
              sanitized[col] = val;
            }
          } else {
            sanitized[col] = val;
          }
        } else {
          sanitized[col] = val;
        }
      } else {
        sanitized[col] = val;
      }
    }
  });

  return sanitized;
}

// Resilient parallel write (Add) with auto ID matching and standby fallback
export async function addRedundantDoc(collectionName: string, item: any) {
  let docId = "";
  let firestoreSuccess = false;
  let supabaseSuccess = false;
  const errorMsgs: string[] = [];

  // Generate a matching random ID first if we need a uniform primary key
  const fallbackId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  const startTimeFirestore = Date.now();
  // 1. Write to Firestore
  if (globalDBHealth.firestore !== "offline" || globalDBHealth.activeSource === "firestore") {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...item,
        createdAt: new Date()
      });
      docId = docRef.id;
      firestoreSuccess = true;
      const latency = Date.now() - startTimeFirestore;
      setDBHealth({ 
        firestore: "healthy",
        latencyMs: { ...globalDBHealth.latencyMs, firestore: latency }
      });
    } catch (err: any) {
      console.warn(`Firestore add error for ${collectionName}:`, err.message);
      errorMsgs.push("Firestore: " + err.message);
      setDBHealth({ firestore: "offline" });
      if (globalDBHealth.activeSource === "firestore" && isSupabaseConfigured) {
        triggerFailover(`Firestore write failed: ${err.message}`, "supabase");
      }
      if (err.message?.includes("permission") || err.code === "permission-denied") {
        handleFirestoreError(err, OperationType.CREATE, collectionName);
      }
    }
  }

  if (!docId) {
    docId = fallbackId;
  }

  // 2. Dual-write to Supabase
  if (isSupabaseConfigured && supabase && (globalDBHealth.supabase !== "offline" || globalDBHealth.activeSource === "supabase")) {
    const startTimeSupabase = Date.now();
    try {
      // Clean up and sanitize the item based on the PostgreSQL table schema
      const supabaseItem = sanitizeForSupabase(collectionName, { id: docId, ...item });
      
      if (ALLOWED_COLUMNS[collectionName]?.includes("createdAt") && !supabaseItem.createdAt) {
        supabaseItem.createdAt = new Date().toISOString();
      }

      const { error } = (await supabase.from(collectionName).insert([supabaseItem])) || {};
      if (error) throw error;
      supabaseSuccess = true;
      const latency = Date.now() - startTimeSupabase;
      setDBHealth({ 
        supabase: "healthy",
        latencyMs: { ...globalDBHealth.latencyMs, supabase: latency }
      });
    } catch (err: any) {
      console.warn(`Supabase add error for ${collectionName}:`, err.message);
      errorMsgs.push("Supabase: " + err.message);
      setDBHealth({ supabase: "offline" });
      if (globalDBHealth.activeSource === "supabase") {
        triggerFailover(`Supabase write failed: ${err.message}`, "firestore");
      }
    }
  }

  // If both failed, crash. Otherwise return success!
  if (!firestoreSuccess && !supabaseSuccess) {
    throw new Error(`Dual-database insert failed completely: ${errorMsgs.join(" | ")}`);
  }

  return { id: docId };
}

// Resilient parallel write (Update)
export async function updateRedundantDoc(collectionName: string, id: string, item: any) {
  let firestoreSuccess = false;
  let supabaseSuccess = false;
  const errorMsgs: string[] = [];

  const startTimeFirestore = Date.now();
  // 1. Update Firestore
  if (globalDBHealth.firestore !== "offline" || globalDBHealth.activeSource === "firestore") {
    try {
      await setDoc(doc(db, collectionName, id), item, { merge: true });
      firestoreSuccess = true;
      const latency = Date.now() - startTimeFirestore;
      setDBHealth({ 
        firestore: "healthy",
        latencyMs: { ...globalDBHealth.latencyMs, firestore: latency }
      });
    } catch (err: any) {
      console.warn(`Firestore update error for ${collectionName}/${id}:`, err.message);
      errorMsgs.push("Firestore: " + err.message);
      setDBHealth({ firestore: "offline" });
      if (globalDBHealth.activeSource === "firestore" && isSupabaseConfigured) {
        triggerFailover(`Firestore update failed: ${err.message}`, "supabase");
      }
      if (err.message?.includes("permission") || err.code === "permission-denied") {
        handleFirestoreError(err, OperationType.UPDATE, `${collectionName}/${id}`);
      }
    }
  }

  // 2. Update Supabase
  if (isSupabaseConfigured && supabase && (globalDBHealth.supabase !== "offline" || globalDBHealth.activeSource === "supabase")) {
    const startTimeSupabase = Date.now();
    try {
      // Clean up and sanitize the item based on the PostgreSQL table schema
      const supabaseItem = sanitizeForSupabase(collectionName, { id, ...item });

      if (ALLOWED_COLUMNS[collectionName]?.includes("updatedAt") && !supabaseItem.updatedAt) {
        supabaseItem.updatedAt = new Date().toISOString();
      }

      const { error } = (await supabase.from(collectionName).upsert(supabaseItem)) || {};
      if (error) throw error;
      supabaseSuccess = true;
      const latency = Date.now() - startTimeSupabase;
      setDBHealth({ 
        supabase: "healthy",
        latencyMs: { ...globalDBHealth.latencyMs, supabase: latency }
      });
    } catch (err: any) {
      console.warn(`Supabase update error for ${collectionName}/${id}:`, err.message);
      errorMsgs.push("Supabase: " + err.message);
      setDBHealth({ supabase: "offline" });
      if (globalDBHealth.activeSource === "supabase") {
        triggerFailover(`Supabase update failed: ${err.message}`, "firestore");
      }
    }
  }

  if (!firestoreSuccess && !supabaseSuccess) {
    throw new Error(`Dual-database update failed completely: ${errorMsgs.join(" | ")}`);
  }
}

// Resilient parallel write (Delete)
export async function deleteRedundantDoc(collectionName: string, id: string) {
  let firestoreSuccess = false;
  let supabaseSuccess = false;
  const errorMsgs: string[] = [];

  const startTimeFirestore = Date.now();
  // 1. Delete from Firestore
  if (globalDBHealth.firestore !== "offline" || globalDBHealth.activeSource === "firestore") {
    try {
      await deleteDoc(doc(db, collectionName, id));
      firestoreSuccess = true;
      const latency = Date.now() - startTimeFirestore;
      setDBHealth({ 
        firestore: "healthy",
        latencyMs: { ...globalDBHealth.latencyMs, firestore: latency }
      });
    } catch (err: any) {
      console.warn(`Firestore delete error for ${collectionName}/${id}:`, err.message);
      errorMsgs.push("Firestore: " + err.message);
      setDBHealth({ firestore: "offline" });
      if (globalDBHealth.activeSource === "firestore" && isSupabaseConfigured) {
        triggerFailover(`Firestore delete failed: ${err.message}`, "supabase");
      }
      if (err.message?.includes("permission") || err.code === "permission-denied") {
        handleFirestoreError(err, OperationType.DELETE, `${collectionName}/${id}`);
      }
    }
  }

  // 2. Delete from Supabase
  if (isSupabaseConfigured && supabase && (globalDBHealth.supabase !== "offline" || globalDBHealth.activeSource === "supabase")) {
    const startTimeSupabase = Date.now();
    try {
      const { error } = (await supabase.from(collectionName).delete().eq("id", id)) || {};
      if (error) throw error;
      supabaseSuccess = true;
      const latency = Date.now() - startTimeSupabase;
      setDBHealth({ 
        supabase: "healthy",
        latencyMs: { ...globalDBHealth.latencyMs, supabase: latency }
      });
    } catch (err: any) {
      console.warn(`Supabase delete error for ${collectionName}/${id}:`, err.message);
      errorMsgs.push("Supabase: " + err.message);
      setDBHealth({ supabase: "offline" });
      if (globalDBHealth.activeSource === "supabase") {
        triggerFailover(`Supabase delete failed: ${err.message}`, "firestore");
      }
    }
  }

  if (!firestoreSuccess && !supabaseSuccess) {
    throw new Error(`Dual-database delete failed completely: ${errorMsgs.join(" | ")}`);
  }
}

// Custom subscription hook with automatic active-active routing and standby hot-swap
export function useCollection<T = DocumentData>(collectionName: string) {
  const [data, setData] = useState<(T & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSourceState, setActiveSourceState] = useState<DBSource>(globalDBHealth.activeSource);

  // Sync state with globalDBHealth.activeSource changes
  useEffect(() => {
    return subscribeToDBHealth((health) => {
      setActiveSourceState(health.activeSource);
    });
  }, []);

  useEffect(() => {
    let unsubscribeCurrent: (() => void) | undefined;
    let isMounted = true;
    
    // Public collections that can be read without authentication
    const publicCollections = ["blogPosts", "metrics", "abTests"];
    const isPublic = publicCollections.includes(collectionName);

    const setupFirestoreSubscription = () => {
      setLoading(true);
      const colRef = collection(db, collectionName);

      // 4-second timeout: if Firestore fails to load data or remains silent, failover to Supabase
      const failoverTimeout = setTimeout(() => {
        if (loading && isSupabaseConfigured && supabase && isMounted) {
          console.warn(`Firestore subscription timed out for "${collectionName}". Failover routing triggered...`);
          triggerFailover("Firestore subscription timeout", "supabase");
        }
      }, 4000);

      const unsubscribe = onSnapshot(colRef, (snapshot) => {
        clearTimeout(failoverTimeout);
        if (!isMounted) return;
        const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as T & { id: string }));
        setData(docs);
        setLoading(false);
        if (globalDBHealth.firestore !== "healthy") {
          setDBHealth({ firestore: "healthy" });
        }
      }, (err) => {
        clearTimeout(failoverTimeout);
        console.warn(`Error in useCollection(${collectionName}) Firestore subscription:`, err.message);
        
        // Instant failover if Firestore rejects or errors out
        if (isSupabaseConfigured && supabase && isMounted) {
          triggerFailover(`Firestore subscription failed: ${err.message}`, "supabase");
        } else {
          if (isMounted) setLoading(false);
        }

        if (err.message?.includes("permission") || err.code === "permission-denied") {
          handleFirestoreError(err, OperationType.LIST, collectionName);
        }
      });

      unsubscribeCurrent = unsubscribe;
    };

    const setupSupabaseSubscription = () => {
      if (!supabase) {
        if (isMounted) setLoading(false);
        return;
      }
      setLoading(true);

      const fetchSupabase = async () => {
        if (!isMounted || !supabase) return;
        try {
          const { data: sData, error } = (await supabase.from(collectionName).select("*")) || {};
          if (error) throw error;
          if (isMounted) {
            setData((sData || []) as any);
            setLoading(false);
            if (globalDBHealth.supabase !== "healthy") {
              setDBHealth({ supabase: "healthy" });
            }
          }
        } catch (sErr: any) {
          console.warn(`Supabase query failed for "${collectionName}":`, sErr.message);
          // If Supabase failed, retry falling back to Firestore
          triggerFailover(`Supabase query failed: ${sErr.message}`, "firestore");
          if (isMounted) setLoading(false);
        }
      };

      fetchSupabase();

      // Subscribe to real-time events on Supabase
      const channel = supabase
        .channel(`redundancy-sub-${collectionName}`)
        .on("postgres_changes" as any, { event: "*", schema: "public", table: collectionName }, () => {
          fetchSupabase();
        })
        .subscribe();

      unsubscribeCurrent = () => {
        if (supabase) {
          supabase.removeChannel(channel);
        }
      };
    };

    // Main Subscription Routing
    const startSubscription = () => {
      if (activeSourceState === "supabase" && isSupabaseConfigured && supabase) {
        setupSupabaseSubscription();
      } else {
        setupFirestoreSubscription();
      }
    };

    if (isPublic) {
      startSubscription();
    } else {
      const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
        if (user) {
          if (!unsubscribeCurrent) {
            startSubscription();
          }
        } else {
          if (unsubscribeCurrent) {
            unsubscribeCurrent();
            unsubscribeCurrent = undefined;
          }
          if (isMounted) {
            setData([]);
            setLoading(false);
          }
        }
      });
      return () => {
        isMounted = false;
        unsubscribeAuth();
        if (unsubscribeCurrent) unsubscribeCurrent();
      };
    }

    return () => {
      isMounted = false;
      if (unsubscribeCurrent) unsubscribeCurrent();
    };
  }, [collectionName, activeSourceState]);

  const add = async (item: any) => {
    await addRedundantDoc(collectionName, item);
    // Note: add is harder to optimistically update without the generated ID, relying on subscription
  };
  const update = async (id: string, item: any) => {
    setData(prev => prev.map(doc => doc.id === id ? { ...doc, ...item } : doc));
    await updateRedundantDoc(collectionName, id, item);
  };
  const remove = async (id: string) => {
    setData(prev => prev.filter(doc => doc.id !== id));
    await deleteRedundantDoc(collectionName, id);
  };

  return { data, loading, add, update, remove };
}
