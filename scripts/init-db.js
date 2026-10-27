const { createClient } = require('@supabase/supabase-js');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initDB() {
  console.log("Starting Database Initialization...");

  // Supabase Initialization
  console.log("\n--- Supabase ---");
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  
  if (supabaseUrl && supabaseKey) {
    console.log("Supabase credentials found. Initializing Supabase...");
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Check if tables exist by querying them
    const collections = ['admins', 'requests', 'jobApplications', 'blogPosts', 'metrics', 'abTests', 'settings', 'users', 'profiles'];
    for (const table of collections) {
      const { error } = await supabase.from(table).select('id').limit(1);
      if (error && error.code === '42P01') {
        console.warn(`Table '${table}' is missing. Please run supabase_schema.sql in your Supabase SQL Editor to create schemas and RLS policies.`);
      } else if (error) {
        console.error(`Error checking table '${table}': ${error.message}`);
      } else {
        console.log(`Table '${table}' exists.`);
      }
    }
  } else {
    console.log("No Supabase credentials found. Skipping Supabase check.");
  }

  console.log("\n--- Firestore ---");
  let db;
  try {
    const serviceAccountPath = path.resolve(__dirname, '../service-account.json');
    if (fs.existsSync(serviceAccountPath)) {
      console.log("Initializing Firestore with service account...");
      initializeApp({ credential: cert(require(serviceAccountPath)) });
      db = getFirestore();
    } else {
      console.log("No service-account.json found. Skipping Firebase Admin SDK check.");
      console.log("Note: Firestore creates collections automatically on first write. Make sure your rules in firestore.rules are deployed.");
    }
  } catch (err) {
    console.error("Error initializing Firebase:", err);
  }

  if (db) {
    const firestoreCollections = ['admins', 'requests', 'jobApplications', 'blogPosts', 'metrics', 'abTests', 'settings', 'users', 'profiles'];
    for (const coll of firestoreCollections) {
      try {
        const snapshot = await db.collection(coll).limit(1).get();
        if (snapshot.empty) {
          console.log(`Firestore collection '${coll}' is empty. Initializing with demo data...`);
          if (coll === 'admins') {
            await db.collection(coll).doc('demo-admin').set({
              email: 'admin@ayaelektrik.com',
              role: 'admin',
              createdAt: new Date().toISOString()
            });
            console.log(`Added demo admin to '${coll}'.`);
          }
        } else {
          console.log(`Firestore collection '${coll}' is ready and not empty.`);
        }
      } catch (err) {
         console.error(`Error checking Firestore collection '${coll}': ${err.message}`);
      }
    }
  }

  console.log("\nDatabase Initialization Completed.");
}

initDB().catch(console.error);
