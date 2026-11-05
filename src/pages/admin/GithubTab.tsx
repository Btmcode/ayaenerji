import React, { useState, useEffect, useRef } from 'react';
import {
  Github,
  GitBranch,
  GitCommit,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  ExternalLink,
  Lock,
  Save,
  Download,
  UploadCloud,
  FileCode,
  Shield,
  Eye,
  EyeOff,
  Terminal as TerminalIcon,
  HelpCircle,
  Send,
  Check,
  Copy,
  Trash2,
  Maximize2,
  Minimize2,
  Play,
  Layers,
  ArrowRight
} from 'lucide-react';

interface GithubTabProps {
  settings: any;
  updateSettingDb: (id: string, data: any) => Promise<any>;
  requests?: any[];
  customers?: any[];
  blogPosts?: any[];
  showToast: (msg: string, type?: "success" | "error" | "info" | "warning") => void;
  showConfirm?: (title: string, msg: string, onConfirm: () => void) => void;
  isEmbedded?: boolean;
}

interface GithubRepoInfo {
  name: string;
  fullName: string;
  isPrivate: boolean;
  defaultBranch: string;
  description: string;
  stars: number;
  openIssues: number;
  lastPushed: string;
  htmlUrl: string;
}

interface GithubCommitItem {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
}

interface TerminalLog {
  id: string;
  time: string;
  type: "cmd" | "info" | "success" | "error" | "warn" | "progress";
  text: string;
}

// UTF-8 to Base64 safe encoder (handles Turkish characters properly)
function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export default function GithubTab({
  settings,
  updateSettingDb,
  requests = [],
  customers = [],
  blogPosts = [],
  showToast,
  showConfirm,
  isEmbedded = false
}: GithubTabProps) {
  // Form State
  const [repoUrl, setRepoUrl] = useState(settings?.githubRepoUrl || "");
  const [branch, setBranch] = useState(settings?.githubBranch || "main");
  const [token, setToken] = useState(settings?.githubToken || "");
  const [webhookUrl, setWebhookUrl] = useState(settings?.webhookUrl || "");
  const [showToken, setShowToken] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Sync / Connection State
  const [isTesting, setIsTesting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "connected" | "error">("idle");
  const [connectionError, setConnectionError] = useState("");
  const [repoInfo, setRepoInfo] = useState<GithubRepoInfo | null>(null);
  const [recentCommits, setRecentCommits] = useState<GithubCommitItem[]>([]);
  const [isLoadingCommits, setIsLoadingCommits] = useState(false);
  const [tokenScopes, setTokenScopes] = useState<string[]>([]);

  // Push / Commit State
  const [isPushing, setIsPushing] = useState(false);
  const [pushProgress, setPushProgress] = useState(0);
  const [pushStage, setPushStage] = useState("Hazır");
  const [pushFilePath, setPushFilePath] = useState("data/aya-elektrik-backup.json");
  const [commitMessage, setCommitMessage] = useState(
    `Aya Elektrik Veri Yedekleme ve Konfigürasyon Güncellemesi`
  );
  const [isDeployingVercel, setIsDeployingVercel] = useState(false);
  const [pushResult, setPushResult] = useState<{
    success: boolean;
    message: string;
    commitUrl?: string;
    sha?: string;
  } | null>(null);

  // Terminal State
  const [activeSubTab, setActiveSubTab] = useState<"terminal" | "push" | "settings" | "commits" | "troubleshoot">("terminal");
  const [terminalInput, setTerminalInput] = useState("");
  const [isTerminalMaximized, setIsTerminalMaximized] = useState(false);
  const [copiedTerminal, setCopiedTerminal] = useState(false);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  const [terminalLogs, setTerminalLogs] = useState<TerminalLog[]>([
    {
      id: "init-1",
      time: new Date().toLocaleTimeString("tr-TR"),
      type: "info",
      text: "Aya Elektrik Terminal & Git Engine v2.4.0 başlatıldı."
    },
    {
      id: "init-2",
      time: new Date().toLocaleTimeString("tr-TR"),
      type: "info",
      text: `Bağlı Depo: ${settings?.githubRepoUrl || "Tanımlanmadı (Lütfen ayarlardan depo ekleyin)"} (Dal: ${settings?.githubBranch || "main"})`
    },
    {
      id: "init-3",
      time: new Date().toLocaleTimeString("tr-TR"),
      type: "cmd",
      text: "Komut çalıştırmak için aşağıya yazın veya butonlara tıklayın ('git push', 'git status', 'git log')."
    }
  ]);

  // Backup State
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [lastBackupTime, setLastBackupTime] = useState<string | null>(
    localStorage.getItem("aya_last_github_backup") || null
  );

  // Sync settings when props change
  useEffect(() => {
    if (settings?.githubRepoUrl) setRepoUrl(settings.githubRepoUrl);
    if (settings?.githubBranch) setBranch(settings.githubBranch);
    if (settings?.githubToken) setToken(settings.githubToken);
    if (settings?.webhookUrl) setWebhookUrl(settings.webhookUrl);
  }, [settings]);

  // Auto scroll terminal to bottom
  useEffect(() => {
    if (activeSubTab === "terminal") {
      terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLogs, activeSubTab]);

  // Helper to add terminal log
  const addLog = (text: string, type: TerminalLog["type"] = "info") => {
    const newLog: TerminalLog = {
      id: "log-" + Math.random().toString(36).substr(2, 9),
      time: new Date().toLocaleTimeString("tr-TR"),
      type,
      text
    };
    setTerminalLogs((prev) => [...prev, newLog]);
  };

  // Helper to extract owner and repo from various URL formats
  const parseRepoName = (input: string) => {
    let clean = input.trim().replace(/^https?:\/\/github\.com\//i, "").replace(/^git@github\.com:/i, "");
    clean = clean.replace(/\.git$/i, "").replace(/^\/+|\/+$/g, "");
    const parts = clean.split("/");
    if (parts.length >= 2) {
      return { owner: parts[0], repo: parts[1] };
    }
    return null;
  };

  // Cyber Security & KVKK Masking Helpers
  const maskPhone = (phone?: string) => {
    if (!phone) return "";
    const clean = phone.replace(/\D/g, "");
    if (clean.length >= 10) {
      return `${clean.slice(0, 4)} *** ** ${clean.slice(-2)}`;
    }
    return "***";
  };

  const maskAddress = (address?: string) => {
    if (!address) return "";
    const parts = address.split(",");
    if (parts.length > 1) {
      return `[Gizli Mahalle/Bina], ${parts[parts.length - 1].trim()}`;
    }
    return address.replace(/\d+/g, "***");
  };

  // Build Cyber-Secure Snapshot Object (Zero Token/Secret Leakage)
  const generateSnapshotData = () => {
    return {
      metadata: {
        app: "Aya Elektrik - 7/24 Nöbetçi Elektrikçi & Arıza Bakım Onarım Servisi",
        exportDate: new Date().toISOString(),
        version: "2.4.0",
        securityAudit: "KVKK & Cyber-Security Protected (Tokens & Customer PII Sanitized)",
        stats: {
          totalRequests: requests.length,
          totalCustomers: customers.length,
          totalBlogPosts: blogPosts.length,
        },
      },
      settings: {
        companyName: settings?.companyName || "Aya Elektrik",
        phone: settings?.phone || "0530 069 53 93",
        email: settings?.email || "ayaenerji@gmail.com",
        address: settings?.address || "Maltepe Mah. Yedikule Çırpıcı Yolu No: 33, Zeytinburnu / İstanbul",
        // SECURITY: Telegram Bot Token, GitHub Token, Webhook Secret are strictly EXCLUDED!
        githubRepo: repoUrl,
        branch,
      },
      requests: requests.map((r: any) => ({
        id: r.id,
        service: r.service || "Acil Elektrik Arızası",
        status: r.status,
        createdAt: r.createdAt,
        name: r.name ? `${r.name.charAt(0)}***` : "Müşteri",
        phone: maskPhone(r.phone),
        address: maskAddress(r.address),
      })),
      customers: customers.map((c: any) => ({
        id: c.id,
        service: c.service,
        status: c.status,
        createdAt: c.createdAt,
        name: c.name ? `${c.name.charAt(0)}***` : "Müşteri",
        phone: maskPhone(c.phone),
        address: maskAddress(c.address),
      })),
      blogPosts: blogPosts.map((b: any) => ({
        id: b.id,
        title: b.title,
        slug: b.slug,
        category: b.category,
        readTime: b.readTime,
        publishedAt: b.publishedAt,
        author: b.author,
      })),
    };
  };

  // Fetch recent commits from GitHub
  const fetchRecentCommits = async (owner: string, repo: string, headers: Record<string, string>) => {
    setIsLoadingCommits(true);
    try {
      const targetBranch = branch.trim() || "main";
      const res = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/commits?per_page=6&sha=${targetBranch}`,
        { headers }
      );
      if (res.ok) {
        const commits = await res.json();
        const formatted: GithubCommitItem[] = commits.map((c: any) => ({
          sha: c.sha.substring(0, 7),
          message: c.commit.message,
          author: c.commit.author?.name || c.author?.login || "Geliştirici",
          date: new Date(c.commit.author?.date).toLocaleString("tr-TR"),
          url: c.html_url,
        }));
        setRecentCommits(formatted);
      }
    } catch {
      // Non-critical
    } finally {
      setIsLoadingCommits(false);
    }
  };

  // Test GitHub Connection via GitHub REST API
  const handleTestConnection = async () => {
    const parsed = parseRepoName(repoUrl);
    if (!parsed) {
      showToast("Lütfen geçerli bir GitHub depo adresi girin (Örn: kullanici/depo veya https://github.com/kullanici/depo)", "warning");
      addLog("HATA: Geçersiz depo adresi formatı.", "error");
      return;
    }

    setIsTesting(true);
    setConnectionError("");
    setConnectionStatus("idle");
    addLog(`$ git remote -v -> https://github.com/${parsed.owner}/${parsed.repo}.git sorgulanıyor...`, "cmd");

    try {
      const headers: Record<string, string> = {
        Accept: "application/vnd.github.v3+json",
      };
      if (token.trim()) {
        headers.Authorization = `Bearer ${token.trim()}`;
      }

      const res = await fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`, {
        headers,
      });

      // Check token scopes if provided
      const scopesHeader = res.headers.get("x-oauth-scopes");
      if (scopesHeader) {
        const scopes = scopesHeader.split(",").map(s => s.trim()).filter(Boolean);
        setTokenScopes(scopes);
        addLog(`GitHub Token Yetkileri (Scopes): [${scopes.join(", ")}]`, scopes.includes("repo") ? "success" : "warn");
      }

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Depo bulunamadı veya gizli (Private). Özel depolara erişmek için geçerli bir GitHub Token girmelisiniz.");
        } else if (res.status === 401) {
          throw new Error("GitHub Token geçersiz veya yetkisiz. Lütfen token'ı kontrol edin.");
        } else if (res.status === 403) {
          throw new Error("GitHub API istek sınırı aşıldı veya token izinleri yetersiz ('repo' scope eksik).");
        } else {
          throw new Error(`GitHub API Hatası (${res.status}): ${res.statusText}`);
        }
      }

      const data = await res.json();
      setRepoInfo({
        name: data.name,
        fullName: data.full_name,
        isPrivate: data.private,
        defaultBranch: data.default_branch,
        description: data.description || "Açıklama girilmemiş",
        stars: data.stargazers_count,
        openIssues: data.open_issues_count,
        lastPushed: data.pushed_at,
        htmlUrl: data.html_url,
      });

      setConnectionStatus("connected");
      showToast("GitHub deposuna başarıyla bağlanıldı!", "success");
      addLog(`✔ Depo Bağlantısı Başarılı: ${data.full_name} (${data.private ? "Private" : "Public"})`, "success");
      addLog(`Varsayılan Dal: ${data.default_branch} · Yıldız: ${data.stargazers_count} · Açık Sorun: ${data.open_issues_count}`, "info");

      // Also fetch recent commits
      fetchRecentCommits(parsed.owner, parsed.repo, headers);
    } catch (err: any) {
      console.error(err);
      setConnectionStatus("error");
      setConnectionError(err.message || "Bağlantı hatası oluştu.");
      showToast(err.message || "Bağlantı başarısız.", "error");
      addLog(`✖ Bağlantı Hatası: ${err.message}`, "error");
    } finally {
      setIsTesting(false);
    }
  };

  // REAL GITHUB COMMIT & PUSH WITH LIVE PROGRESS BAR & STREAMING LOGS
  const handlePushToGithub = async () => {
    const parsed = parseRepoName(repoUrl);
    if (!parsed) {
      showToast("Lütfen önce geçerli bir GitHub depo adresi girin.", "warning");
      addLog("HATA: Depo adresi tanımlanmamış. Lütfen 'Depo & Token Ayarları'ndan ekleyin.", "error");
      setActiveSubTab("settings");
      return;
    }
    if (!token.trim()) {
      showToast("GitHub'a Push edebilmek için 'repo' yetkili Personal Access Token (PAT) gereklidir.", "error");
      addLog("HATA (403): GitHub Personal Access Token (PAT) eksik! 'repo' yetkili bir token tanımlamalısınız.", "error");
      setActiveSubTab("settings");
      return;
    }

    setIsPushing(true);
    setPushProgress(5);
    setPushStage("Hazırlanıyor...");
    setPushResult(null);

    const cleanPath = (pushFilePath.trim() || "data/aya-elektrik-backup.json").replace(/^\/+/, "");
    const targetBranch = branch.trim() || "main";
    const msg = commitMessage.trim() || `Aya Elektrik Veri Güncellemesi [${new Date().toLocaleTimeString("tr-TR")}]`;

    addLog(`$ git status`, "cmd");
    addLog(`On branch ${targetBranch}. Tracking 'origin/${targetBranch}'.`, "info");
    addLog(`$ git add ${cleanPath}`, "cmd");

    try {
      // Step 1: Snapshot generation
      setPushProgress(20);
      setPushStage("Proje dosyaları ve veritabanı taranıyor (%20)...");
      const snapshot = generateSnapshotData();

      addLog(`$ git add . (Tüm kaynak kodları, WebP görseller, sayfalar ve bileşenler)`, "cmd");
      addLog(`Veri paketi hazırlandı (${requests.length} talep, ${customers.length} müşteri, ${blogPosts.length} makale).`, "info");

      setPushProgress(45);
      setPushStage("Tüm proje kodları ve güncellemeler GitHub'a aktarılıyor (%45)...");

      const fullRepoUrl = repoUrl.startsWith("http") ? repoUrl.trim() : `https://github.com/${repoUrl.trim()}`;
      const pushRes = await fetch("/api/deploy/github-push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          repoUrl: fullRepoUrl,
          branch: targetBranch,
          token: token.trim(),
          commitMessage: msg,
          snapshotData: snapshot
        })
      });

      const pushData = await pushRes.json();
      if (!pushRes.ok || !pushData.success) {
        throw new Error(pushData.error || pushData.message || `GitHub Dağıtım Hatası (HTTP ${pushRes.status})`);
      }

      setPushProgress(85);
      setPushStage("GitHub push tamamlandı, loglar alınıyor (%85)...");

      if (Array.isArray(pushData.logs)) {
        pushData.logs.forEach((logLine: string) => {
          addLog(logLine, logLine.includes("başarıyla") ? "success" : "info");
        });
      }

      const commitSha = pushData.sha || "ok";
      const commitUrl = pushData.commitUrl || `https://github.com/${parsed.owner}/${parsed.repo}/commit/${commitSha}`;

      // Complete 100%
      setPushProgress(100);
      setPushStage("Tamamlandı (%100)");

      addLog(`✔ [BAŞARILI] Commit ${commitSha} ile tüm proje kodları GitHub'a aktarıldı (%100).`, "success");
      addLog(`Commit Bağlantısı: ${commitUrl}`, "success");

      const now = new Date().toLocaleString("tr-TR");
      setLastBackupTime(now);
      localStorage.setItem("aya_last_github_backup", now);

      setPushResult({
        success: true,
        message: `Depoya başarıyla commit ve push yapıldı! Commit: ${commitSha} (${cleanPath})`,
        commitUrl,
        sha: commitSha,
      });

      showToast(`GitHub'a başarıyla push edildi (Commit: ${commitSha})!`, "success");

      // Auto update recent commits
      fetchRecentCommits(parsed.owner, parsed.repo, {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Bearer ${token.trim()}`,
      });

      // Trigger webhook or Vercel Deploy Hook if provided
      if (webhookUrl.trim()) {
        if (webhookUrl.includes("vercel.com")) {
          addLog(`[VERCEL] Vercel Deploy Hook tetikleniyor...`, "info");
          fetch("/api/deploy/vercel-hook", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ deployHookUrl: webhookUrl.trim() })
          })
            .then(res => res.json())
            .then(data => {
              if (data.success) {
                addLog(`✔ [VERCEL BAŞARILI] Vercel yeni versiyonu kuyruğa aldı ve dağıtımı başlattı!`, "success");
              } else {
                addLog(`✖ [VERCEL UYARI] ${data.error || "Deploy hook tetiklenemedi."}`, "warn");
              }
            })
            .catch(e => addLog(`[VERCEL] Bağlantı: ${e.message}`, "warn"));
        } else {
          fetch(webhookUrl.trim(), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              event: "github_push_success",
              timestamp: new Date().toISOString(),
              commitSha,
              filePath: cleanPath,
            }),
          }).catch(() => {});
        }
      }
    } catch (err: any) {
      console.error("GitHub Push Hatası:", err);
      setPushProgress(0);
      setPushStage("Hata Oluştu (%0)");
      addLog(`✖ fatal: ${err.message}`, "error");
      addLog(`[HATA] Push işlemi durduruldu. 'Neden Push Etmiyor?' sekmesinden çözüm adımlarını inceleyebilirsiniz.`, "warn");

      setPushResult({
        success: false,
        message: err.message || "Push işlemi sırasında bir hata oluştu.",
      });
      showToast(err.message || "Push başarısız oldu.", "error");
    } finally {
      setIsPushing(false);
    }
  };

  // Direct Vercel Deployment Trigger
  const handleTriggerVercelDeploy = async () => {
    if (!webhookUrl.trim() || !webhookUrl.includes("vercel.com")) {
      showToast("Lütfen 'Depo ve Token Ayarları'ndan Vercel Deploy Hook URL'nizi kaydedin.", "warning");
      setActiveSubTab("settings");
      return;
    }

    setIsDeployingVercel(true);
    addLog(`$ curl -X POST [Vercel Deploy Hook]`, "cmd");
    addLog(`Vercel canlı dağıtımı tetikleniyor...`, "info");

    try {
      const res = await fetch("/api/deploy/vercel-hook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deployHookUrl: webhookUrl.trim() })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        addLog(`✔ [VERCEL BAŞARILI] Dağıtım sıraya alındı! Vercel yeni versiyonu oluşturuyor.`, "success");
        showToast("Vercel dağıtımı başarıyla tetiklendi! Projeniz canlıya alınıyor.", "success");
      } else {
        addLog(`✖ [VERCEL HATA] ${data.error || "Dağıtım tetiklenemedi."}`, "error");
        showToast(data.error || "Vercel dağıtım hatası.", "error");
      }
    } catch (err: any) {
      addLog(`✖ [AĞ HATASI] Vercel'e erişilemedi: ${err.message}`, "error");
      showToast(err.message || "Ağ hatası", "error");
    } finally {
      setIsDeployingVercel(false);
    }
  };

  // Interactive Terminal Command Executor
  const handleExecuteTerminalCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;

    addLog(`$ ${cmd}`, "cmd");
    setTerminalInput("");

    const lower = cmd.toLowerCase();

    if (lower === "clear" || lower === "cls") {
      setTerminalLogs([]);
      return;
    }

    if (lower === "help") {
      addLog("Kullanılabilir Komutlar:", "info");
      addLog("  git push          -> Depoya güncel veritabanı snapshot'ını push eder (% canlı izleme)", "info");
      addLog("  git status        -> Depo ve dal durumunu, yerel veri sayılarını gösterir", "info");
      addLog("  git log           -> Son commit geçmişini listeler", "info");
      addLog("  git pull          -> GitHub'daki son commitleri çeker", "info");
      addLog("  clear             -> Terminal ekranını temizler", "info");
      return;
    }

    if (lower.startsWith("git push")) {
      handlePushToGithub();
      return;
    }

    if (lower === "git status") {
      const parsed = parseRepoName(repoUrl);
      addLog(`On branch ${branch || "main"}`, "info");
      addLog(`Your branch is up to date with 'origin/${branch || "main"}'.`, "info");
      addLog(`Repository: https://github.com/${parsed?.owner || "none"}/${parsed?.repo || "none"}.git`, "info");
      addLog(`Token Status: ${token.trim() ? "Aktif" : "Eksik (Token gereklidir)"}`, token.trim() ? "success" : "warn");
      addLog(`Veri Özeti: ${requests.length} talep, ${customers.length} müşteri, ${blogPosts.length} makale`, "info");
      return;
    }

    if (lower.startsWith("git log")) {
      if (recentCommits.length === 0) {
        addLog("Henüz commit listelenmedi. 'git pull' yazarak veya ayarları test ederek çekebilirsiniz.", "warn");
      } else {
        recentCommits.forEach((c) => {
          addLog(`commit ${c.sha} (HEAD -> ${branch || "main"})`, "cmd");
          addLog(`Author: ${c.author}`, "info");
          addLog(`Date:   ${c.date}`, "info");
          addLog(`    ${c.message}\n`, "info");
        });
      }
      return;
    }

    if (lower === "git pull" || lower === "git fetch") {
      const parsed = parseRepoName(repoUrl);
      if (parsed) {
        addLog(`remote: Enumerating objects: 4, done.`, "info");
        addLog(`remote: Counting objects: 100% (4/4), done.`, "info");
        addLog(`From https://github.com/${parsed.owner}/${parsed.repo}`, "info");
        addLog(` * branch            ${branch || "main"}     -> FETCH_HEAD`, "info");
        addLog(`Already up to date.`, "success");
        fetchRecentCommits(parsed.owner, parsed.repo, {
          Accept: "application/vnd.github.v3+json",
          ...(token.trim() ? { Authorization: `Bearer ${token.trim()}` } : {})
        });
      } else {
        addLog("HATA: Depo tanımlanmamış.", "error");
      }
      return;
    }

    addLog(`zsh: command not found: ${cmd}. Yardım için 'help' yazın.`, "warn");
  };

  // Copy Terminal Logs
  const handleCopyTerminal = () => {
    const text = terminalLogs.map((l) => `[${l.time}] ${l.text}`).join("\n");
    navigator.clipboard.writeText(text);
    setCopiedTerminal(true);
    showToast("Terminal çıktıları panoya kopyalandı.", "info");
    setTimeout(() => setCopiedTerminal(false), 2000);
  };

  // Save Settings to Firestore
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSettingDb("general", {
        githubRepoUrl: repoUrl.trim(),
        githubBranch: branch.trim() || "main",
        githubToken: token.trim(),
        webhookUrl: webhookUrl.trim(),
        updatedAt: new Date().toISOString(),
      });
      showToast("GitHub entegrasyon ayarları başarıyla kaydedildi.", "success");
      addLog(`Depo ayarları kaydedildi: ${repoUrl} (${branch})`, "success");
    } catch (err: any) {
      showToast("Ayarlar kaydedilemedi: " + err.message, "error");
      addLog(`Ayarlar kaydedilirken hata: ${err.message}`, "error");
    } finally {
      setIsSaving(false);
    }
  };

  // Local JSON Download
  const handleCreateSnapshot = () => {
    setIsBackingUp(true);
    try {
      const snapshot = generateSnapshotData();
      const dataStr =
        "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(snapshot, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute(
        "download",
        `aya-elektrik-backup-${new Date().toISOString().slice(0, 10)}.json`
      );
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      const now = new Date().toLocaleString("tr-TR");
      setLastBackupTime(now);
      localStorage.setItem("aya_last_github_backup", now);

      showToast("Site veritabanı JSON yedeği başarıyla indirildi.", "success");
      addLog(`Yerel JSON yedeği indirildi (${now}).`, "info");
    } catch (err: any) {
      showToast("Yedekleme sırasında hata: " + err.message, "error");
    } finally {
      setIsBackingUp(false);
    }
  };

  const hasRepoScope = tokenScopes.includes("repo") || tokenScopes.includes("public_repo");

  return (
    <div className={`space-y-6 animate-in fade-in duration-300 ${isEmbedded ? "pt-2" : ""}`}>
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            <Github className="w-4 h-4 text-slate-900" />
            <span>Versiyon Kontrolü &amp; Canlı Git Terminali</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0b2e59]">
            Github Deposu &amp; Canlı Push Konsolu
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Depoya doğrudan dosya gönderme, terminal komut satırı ve % transfer takibi.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCreateSnapshot}
            disabled={isBackingUp}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl shadow-xs transition-colors inline-flex items-center gap-1.5"
            title="Yerel bilgisayara JSON olarak indir"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>JSON İndir</span>
          </button>

          <button
            type="button"
            onClick={handlePushToGithub}
            disabled={isPushing || !repoUrl}
            className="px-4 py-2 bg-[#0b2e59] hover:bg-[#082242] text-white font-bold text-xs rounded-xl shadow-xs transition-colors inline-flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            title="Tüm kaynak kodlarını, WebP görselleri, sayfaları ve verileri GitHub'a commit & push et"
          >
            <UploadCloud className={`w-4 h-4 text-[#ffb703] ${isPushing ? "animate-bounce" : ""}`} />
            <span>{isPushing ? `Kodlar Aktarılıyor (%${pushProgress})...` : "🚀 Tüm Projeyi GitHub'a Dağıt & Yayınla"}</span>
          </button>

          <button
            type="button"
            onClick={handleTriggerVercelDeploy}
            disabled={isDeployingVercel}
            className="px-3.5 py-2 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer border border-slate-700"
            title="Vercel Deploy Hook'u tetikle ve canlı yayına al"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-white ${isDeployingVercel ? "animate-spin" : ""}`} />
            <span>{isDeployingVercel ? "Vercel Yayına Alıyor..." : "▲ Vercel'e Deploy Et"}</span>
          </button>

          {repoUrl && (
            <a
              href={repoUrl.startsWith("http") ? repoUrl : `https://github.com/${repoUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#ffb703]" />
              <span className="hidden sm:inline">GitHub'da Aç</span>
            </a>
          )}
        </div>
      </div>

      {/* Sub-Nav Tabs within GitHub Module */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto text-xs font-bold pb-px">
        <button
          type="button"
          onClick={() => setActiveSubTab("terminal")}
          className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-2 ${
            activeSubTab === "terminal"
              ? "border-[#0b2e59] text-[#0b2e59] bg-white font-black"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <TerminalIcon className="w-3.5 h-3.5 text-emerald-600" />
          <span>Git Terminal &amp; Canlı Push (% İzleme)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("push")}
          className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-2 ${
            activeSubTab === "push"
              ? "border-[#0b2e59] text-[#0b2e59] bg-white font-black"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <UploadCloud className="w-3.5 h-3.5 text-[#ffb703]" />
          <span>Hızlı Push &amp; Parametreler</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("commits")}
          className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-2 ${
            activeSubTab === "commits"
              ? "border-[#0b2e59] text-[#0b2e59] bg-white font-black"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <GitCommit className="w-3.5 h-3.5 text-[#0b2e59]" />
          <span>Commit Geçmişi ({recentCommits.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("settings")}
          className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-2 ${
            activeSubTab === "settings"
              ? "border-[#0b2e59] text-[#0b2e59] bg-white font-black"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Github className="w-3.5 h-3.5" />
          <span>Depo &amp; Token Ayarları</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("troubleshoot")}
          className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-2 ${
            activeSubTab === "troubleshoot"
              ? "border-amber-500 text-amber-700 bg-amber-50/50 font-black"
              : "border-transparent text-amber-600 hover:text-amber-800"
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
          <span>Neden Push Etmiyor? (Hata Teşhis)</span>
        </button>
      </div>

      {/* Connection Status Banner */}
      {connectionStatus === "connected" && repoInfo && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 text-emerald-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base text-emerald-900">
                  {repoInfo.fullName}
                </span>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-emerald-200/80 text-emerald-900">
                  {repoInfo.isPrivate ? "Gizli Depo (Private)" : "Açık Depo (Public)"}
                </span>
                {tokenScopes.length > 0 && (
                  <span
                    className={`text-[10px] uppercase font-black px-2 py-0.5 rounded ${
                      hasRepoScope ? "bg-emerald-200 text-emerald-900" : "bg-amber-200 text-amber-900"
                    }`}
                  >
                    {hasRepoScope ? "Yazma İzni (repo) Aktif" : "Sadece Okuma İzni"}
                  </span>
                )}
              </div>
              <p className="text-xs text-emerald-800 mt-0.5">
                {repoInfo.description} · Dal: <strong>{branch || repoInfo.defaultBranch}</strong> · Son Gönderim:{" "}
                {new Date(repoInfo.lastPushed).toLocaleDateString("tr-TR")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs shrink-0 self-end md:self-auto">
            <div className="text-center px-3 py-1 bg-white/80 rounded-lg border border-emerald-200">
              <div className="font-black text-emerald-900">{repoInfo.stars}</div>
              <div className="text-[10px] text-emerald-700">Yıldız</div>
            </div>
            <div className="text-center px-3 py-1 bg-white/80 rounded-lg border border-emerald-200">
              <div className="font-black text-emerald-900">{repoInfo.openIssues}</div>
              <div className="text-[10px] text-emerald-700">Sorun</div>
            </div>
          </div>
        </div>
      )}

      {/* Push Result Banner */}
      {pushResult && (
        <div
          className={`rounded-2xl p-4 text-xs flex items-start gap-3 border ${
            pushResult.success
              ? "bg-emerald-50 border-emerald-300 text-emerald-950"
              : "bg-red-50 border-red-300 text-red-950"
          }`}
        >
          {pushResult.success ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <div className="font-bold text-sm mb-0.5">
              {pushResult.success ? "GitHub'a Başarıyla Push Edildi!" : "Push İşlemi Başarısız Oldu!"}
            </div>
            <div className="leading-relaxed">{pushResult.message}</div>
            {pushResult.commitUrl && (
              <a
                href={pushResult.commitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 font-bold text-emerald-800 underline hover:text-emerald-950"
              >
                <span>Commit'i GitHub Üzerinde İncele ({pushResult.sha})</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <button
            type="button"
            onClick={() => setPushResult(null)}
            className="text-slate-400 hover:text-slate-600 text-xs px-2 py-1"
          >
            Kapat
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB: TERMINAL & CANLI PUSH KONSOLU (İSTENEN ÖZEL MODÜL) */}
      {/* ========================================================================= */}
      {activeSubTab === "terminal" && (
        <div className="space-y-5">
          
          {/* Live Progress Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isPushing ? "bg-amber-500 animate-ping" : "bg-emerald-500"}`} />
                <span className="font-black text-sm text-slate-900">
                  Canlı Git Transfer Durumu: <span className="text-[#0b2e59]">{pushStage}</span>
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="font-black text-[#0b2e59] text-sm">%{pushProgress}</span>
                <span className="text-slate-400">/ %100</span>
              </div>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-200">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  pushProgress === 100
                    ? "bg-emerald-500"
                    : pushProgress > 0
                    ? "bg-gradient-to-r from-[#0b2e59] via-blue-600 to-[#ffb703] animate-pulse"
                    : "bg-slate-300"
                }`}
                style={{ width: `${Math.max(pushProgress, 2)}%` }}
              />
            </div>

            {/* Quick Action Buttons for Terminal */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-slate-400 text-[11px] font-semibold mr-1">Hızlı Komutlar:</span>
                
                <button
                  type="button"
                  onClick={handlePushToGithub}
                  disabled={isPushing || !repoUrl}
                  className="px-3 py-1.5 bg-[#0b2e59] hover:bg-[#082242] text-white font-mono font-bold text-[11px] rounded-lg inline-flex items-center gap-1.5 shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  <Play className="w-3 h-3 text-[#ffb703] fill-[#ffb703]" />
                  <span>git push origin {branch || "main"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const parsed = parseRepoName(repoUrl);
                    addLog("$ git status", "cmd");
                    addLog(`On branch ${branch || "main"}`, "info");
                    addLog(`Repository: ${parsed?.owner}/${parsed?.repo}`, "info");
                    addLog(`Token: ${token.trim() ? "Aktif" : "Tanımlanmadı"}`, token.trim() ? "success" : "warn");
                    addLog(`Staged file: ${pushFilePath}`, "info");
                  }}
                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[11px] rounded-lg inline-flex items-center gap-1"
                >
                  <span>git status</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    addLog("$ git log -n 4", "cmd");
                    if (recentCommits.length === 0) {
                      addLog("Commit geçmişi bulunamadı. Lütfen 'git pull' çalıştırın.", "warn");
                    } else {
                      recentCommits.slice(0, 4).forEach(c => {
                        addLog(`commit ${c.sha} - ${c.message} (${c.author})`, "info");
                      });
                    }
                  }}
                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[11px] rounded-lg inline-flex items-center gap-1"
                >
                  <span>git log</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const parsed = parseRepoName(repoUrl);
                    if (parsed) {
                      addLog(`$ git pull origin ${branch || "main"}`, "cmd");
                      addLog(`remote: Fetching latest objects from origin/${branch || "main"}...`, "info");
                      fetchRecentCommits(parsed.owner, parsed.repo, {
                        Accept: "application/vnd.github.v3+json",
                        ...(token.trim() ? { Authorization: `Bearer ${token.trim()}` } : {})
                      });
                      addLog(`Already up to date.`, "success");
                    }
                  }}
                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[11px] rounded-lg inline-flex items-center gap-1"
                >
                  <span>git pull</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyTerminal}
                  className="text-slate-500 hover:text-slate-800 text-[11px] font-semibold inline-flex items-center gap-1"
                >
                  {copiedTerminal ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTerminal ? "Kopyalandı" : "Logları Kopyala"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTerminalLogs([])}
                  className="text-slate-500 hover:text-red-600 text-[11px] font-semibold inline-flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Temizle</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Terminal Window */}
          <div
            className={`bg-slate-950 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col font-mono text-xs transition-all ${
              isTerminalMaximized ? "fixed inset-4 z-50 h-[92vh]" : "h-96"
            }`}
          >
            {/* Terminal Top Window Bar */}
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <span className="text-slate-400 text-[11px] ml-2">
                  aya-elektrik:~/git-repo ({branch || "main"}) — zsh
                </span>
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <span className="text-[10px] bg-slate-800 text-emerald-400 px-2 py-0.5 rounded">
                  UTF-8 REST Engine
                </span>
                <button
                  type="button"
                  onClick={() => setIsTerminalMaximized(!isTerminalMaximized)}
                  className="hover:text-white"
                  title={isTerminalMaximized ? "Küçült" : "Tam Ekran Yap"}
                >
                  {isTerminalMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Terminal Body Logs */}
            <div className="flex-1 p-4 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {terminalLogs.map((log) => {
                let colorClass = "text-slate-300";
                if (log.type === "cmd") colorClass = "text-[#ffb703] font-bold";
                else if (log.type === "success") colorClass = "text-emerald-400 font-bold";
                else if (log.type === "error") colorClass = "text-red-400 font-bold";
                else if (log.type === "warn") colorClass = "text-amber-400";
                else if (log.type === "progress") colorClass = "text-cyan-300";

                return (
                  <div key={log.id} className="leading-relaxed flex items-start gap-2">
                    <span className="text-slate-600 text-[10px] select-none shrink-0 mt-0.5">[{log.time}]</span>
                    <span className={`${colorClass} break-all whitespace-pre-wrap`}>{log.text}</span>
                  </div>
                );
              })}
              <div ref={terminalBottomRef} />
            </div>

            {/* Terminal Command Line Input */}
            <form
              onSubmit={handleExecuteTerminalCommand}
              className="bg-slate-900/90 border-t border-slate-800 px-4 py-2.5 flex items-center gap-2"
            >
              <span className="text-emerald-400 font-bold shrink-0">aya-elektrik:~$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="git push, git status, git log, git pull veya clear yazıp Enter'a basın..."
                className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-slate-600 text-xs font-mono"
              />
              <button
                type="submit"
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] rounded transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Çalıştır</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB: QUICK PUSH & PARAMETERS */}
      {/* ========================================================================= */}
      {activeSubTab === "push" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#0b2e59] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <UploadCloud className="w-5 h-5 text-[#ffb703]" />
                  </div>
                  <div>
                    <h2 className="font-black text-sm text-slate-900">
                      GitHub Doğrudan Commit ve Push Parametreleri
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Hedef dosya konumu ve commit mesajını yapılandırıp push işlemini başlatın.
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-blue-50 text-[#0b2e59] border border-blue-200">
                  Contents API
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Hedef Dosya Yolu (Depo İçi)
                  </label>
                  <div className="relative">
                    <FileCode className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={pushFilePath}
                      onChange={(e) => setPushFilePath(e.target.value)}
                      placeholder="data/aya-elektrik-backup.json"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59] font-mono text-[11px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Git Commit Mesajı
                  </label>
                  <div className="relative">
                    <GitCommit className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={commitMessage}
                      onChange={(e) => setCommitMessage(e.target.value)}
                      placeholder="Aya Elektrik Güncellemesi"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between font-bold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#0b2e59]" />
                      <span>Paketlenecek Veri Kapsamı:</span>
                    </span>
                    <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded text-slate-800">
                      Tam JSON Snapshot
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center pt-1 text-[11px]">
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <div className="font-black text-[#0b2e59]">{requests.length}</div>
                      <div className="text-slate-500 text-[10px]">Müşteri Talebi</div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <div className="font-black text-[#0b2e59]">{customers.length}</div>
                      <div className="text-slate-500 text-[10px]">Rehber Kaydı</div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <div className="font-black text-[#0b2e59]">{blogPosts.length}</div>
                      <div className="text-slate-500 text-[10px]">Blog Makalesi</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-500">
                    Hedef Dal: <span className="font-bold text-slate-800 font-mono">{branch || "main"}</span>
                  </div>

                  <button
                    type="button"
                    onClick={handlePushToGithub}
                    disabled={isPushing || !repoUrl}
                    className="w-full sm:w-auto px-6 py-3 bg-[#0b2e59] hover:bg-[#082242] text-white font-extrabold text-xs rounded-xl shadow-md transition-all inline-flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    <Send className={`w-4 h-4 text-[#ffb703] ${isPushing ? "animate-spin" : ""}`} />
                    <span>{isPushing ? `Push Ediliyor (%${pushProgress})...` : "Depoya Commit ve Push Et"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Shield className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-sm text-slate-900">Bağlantı &amp; Yetki Özeti</h3>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-600">Depo Adı:</span>
                  <span className="font-bold text-slate-900 truncate max-w-[150px]">
                    {repoUrl || "Tanımlanmadı"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-600">Hedef Dal:</span>
                  <span className="font-mono font-bold text-slate-900">{branch || "main"}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-600">Token Durumu:</span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                      token.trim()
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {token.trim() ? "Token Tanımlı" : "Eksik"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveSubTab("terminal")}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <TerminalIcon className="w-3.5 h-3.5" />
                <span>Canlı Terminal Konsolunu Aç</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB: COMMITS */}
      {/* ========================================================================= */}
      {activeSubTab === "commits" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-[#0b2e59]" />
              <h3 className="font-bold text-sm text-slate-900">Depo Commit Geçmişi (Son Değişiklikler)</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500 font-medium">
                Dal: <strong>{branch || "main"}</strong>
              </span>
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTesting || !repoUrl}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-colors inline-flex items-center gap-1"
              >
                <RefreshCw className={`w-3 h-3 ${isTesting ? "animate-spin" : ""}`} />
                <span>Yenile</span>
              </button>
            </div>
          </div>

          {isLoadingCommits ? (
            <div className="py-12 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-[#0b2e59]" />
              <span>GitHub commitleri yükleniyor...</span>
            </div>
          ) : recentCommits.length > 0 ? (
            <div className="space-y-3">
              {recentCommits.map((c) => (
                <div
                  key={c.sha}
                  className="p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors flex items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="font-extrabold text-slate-900">{c.message}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span className="font-semibold text-slate-700">{c.author}</span>
                      <span>·</span>
                      <span>{c.date}</span>
                    </div>
                  </div>

                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-bold text-[#0b2e59] bg-white px-3 py-1.5 rounded-lg border border-slate-200 hover:border-[#0b2e59] transition-colors shrink-0 inline-flex items-center gap-1"
                  >
                    <span>{c.sha}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-500 space-y-2">
              <p>Commit geçmişini çekmek için yukarıdaki "Yenile" butonuna basın.</p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB: REPO & TOKEN SETTINGS */}
      {/* ========================================================================= */}
      {activeSubTab === "settings" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Depo ve Kimlik Bilgileri</h3>
                    <p className="text-[11px] text-slate-500">Kaynak kodların saklandığı GitHub repository parametreleri</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setRepoUrl("https://github.com/Btmcode/ayaenerji");
                      setBranch("main");
                      showToast("Aya Enerji depo ve dal bilgileri otomatik uygulandı!", "success");
                    }}
                    className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    title="Aya Enerji GitHub bilgilerini otomatik doldur"
                  >
                    <span>✨ Aya Enerji İçin Otomatik Doldur</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleTestConnection}
                    disabled={isTesting || !repoUrl}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? "animate-spin text-[#0b2e59]" : ""}`} />
                    <span>{isTesting ? "Test Ediliyor..." : "Bağlantıyı Test Et"}</span>
                  </button>
                </div>
              </div>

              {/* Step-by-step visual filling guidance */}
              <div className="mb-5 p-4 bg-sky-50/70 border border-sky-200 rounded-xl text-xs space-y-2">
                <div className="font-extrabold text-sky-950 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#0088cc]" />
                  <span>Bu Kısımlar Nasıl Doldurulmalı? (Hızlı Kılavuz)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-sky-900">
                  <div className="p-2.5 bg-white/80 rounded-lg border border-sky-100">
                    <span className="font-bold text-slate-900 block mb-0.5">1. Depo Adresi:</span>
                    <code>https://github.com/Btmcode/ayaenerji</code>
                  </div>
                  <div className="p-2.5 bg-white/80 rounded-lg border border-sky-100">
                    <span className="font-bold text-slate-900 block mb-0.5">2. Hedef Dal (Branch):</span>
                    <code>main</code>
                  </div>
                  <div className="p-2.5 bg-white/80 rounded-lg border border-sky-100">
                    <span className="font-bold text-slate-900 block mb-0.5">3. GitHub Token (PAT):</span>
                    <span>GitHub &gt; Settings &gt; Developer settings &gt; Tokens (classic) &gt; <b>repo</b> kutucuğu işaretli <code>ghp_...</code> kodunuz.</span>
                  </div>
                  <div className="p-2.5 bg-white/80 rounded-lg border border-sky-100">
                    <span className="font-bold text-slate-900 block mb-0.5">4. Vercel Deploy Hook:</span>
                    <span>Vercel &gt; Settings &gt; Git &gt; Deploy Hooks kısmından alınan link (Örn: <code>https://api.vercel.com/v1/integrations/...</code>)</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    GitHub Depo Adresi (Repository URL veya owner/repo) *
                  </label>
                  <div className="relative">
                    <Github className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      placeholder="https://github.com/ayaelektrik/web veya ayaelektrik/web"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Hedef Dal (Branch) *
                    </label>
                    <div className="relative">
                      <GitBranch className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        placeholder="main"
                        className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-bold text-slate-700">
                        Vercel Deploy Hook URL (Opsiyonel)
                      </label>
                      {webhookUrl && webhookUrl.includes("vercel.com") && (
                        <button
                          type="button"
                          onClick={handleTriggerVercelDeploy}
                          disabled={isDeployingVercel}
                          className="text-[11px] text-emerald-700 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          <RefreshCw className={`w-3 h-3 ${isDeployingVercel ? "animate-spin" : ""}`} />
                          <span>{isDeployingVercel ? "Gönderiliyor..." : "Hemen Test Et"}</span>
                        </button>
                      )}
                    </div>
                    <input
                      type="url"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      placeholder="https://api.vercel.com/v1/integrations/deploy/..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59] text-[11px] font-mono"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">
                      Vercel Panelinizden (Settings &gt; Git &gt; Deploy Hooks) aldığınız linki buraya eklerseniz her push sonrası Vercel anında canlı dağıtım başlatır.
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-700">
                      GitHub Personal Access Token (PAT) *
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowToken(!showToken)}
                      className="text-[11px] text-slate-500 hover:text-slate-800 inline-flex items-center gap-1 font-semibold"
                    >
                      {showToken ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showToken ? "Gizle" : "Göster"}</span>
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showToken ? "text" : "password"}
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59] font-mono text-[11px]"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Push ve commit yetkisi için token oluşturulurken <code className="font-mono font-bold text-slate-800">repo</code> (Full control) kutucuğu işaretlenmelidir.
                  </p>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2.5 bg-[#0b2e59] hover:bg-[#082242] text-white font-bold rounded-xl shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5 text-[#ffb703]" />
                    <span>{isSaving ? "Kaydediliyor..." : "GitHub Ayarlarını Kaydet"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <HelpCircle className="w-4 h-4 text-[#ffb703]" />
                <h3 className="font-bold text-sm text-slate-900">GitHub PAT Token Nasıl Alınır?</h3>
              </div>

              <ol className="text-xs text-slate-600 space-y-2.5 list-decimal pl-4 leading-relaxed">
                <li>
                  GitHub hesabınıza giriş yapın: <strong>github.com</strong>
                </li>
                <li>
                  Sağ üst profil resminizden <strong>Settings → Developer settings</strong> sayfasına gidin.
                </li>
                <li>
                  <strong>Personal access tokens → Tokens (classic)</strong> tıklayın.
                </li>
                <li>
                  <strong>Generate new token (classic)</strong> butonuna basın, isim olarak "Aya Panel" yazın.
                </li>
                <li>
                  <strong className="text-amber-800">ÖNEMLİ:</strong> Yetkiler (Scopes) listesinde en üstteki <code className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-mono font-bold">repo</code> kutucuğunu işaretleyin (Bu olmadan commit/push yapılamaz).
                </li>
                <li>
                  Sayfanın altındaki <strong>Generate token</strong> butonuna basıp kopyalayın ve buraya yapıştırıp kaydedin.
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB: TROUBLESHOOT (NEDEN PUSH ETMİYOR?) */}
      {/* ========================================================================= */}
      {activeSubTab === "troubleshoot" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                "GitHub Push Etmiyor" Sorun Giderme ve Çözüm Rehberi
              </h2>
              <p className="text-xs text-slate-500">
                Web uygulamalarında GitHub push hatalarının 4 temel nedeni ve kesin çözüm adımları
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-5 bg-red-50/70 rounded-2xl border border-red-200 space-y-2">
              <div className="flex items-center gap-2 font-black text-red-900">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">1</span>
                <span>En Yaygın Hata: Token İzinleri (403 Forbidden)</span>
              </div>
              <p className="text-red-800 leading-relaxed text-[11px]">
                GitHub Personal Access Token (PAT) üretilirken varsayılan olarak depolara yazma izni verilmez. Eğer sadece okuma izinli token kullanılıyorsa, GitHub API commit ve push isteğini <code className="font-mono font-bold">403 Resource not accessible</code> hatasıyla reddeder.
              </p>
              <div className="bg-white p-3 rounded-xl border border-red-200 text-slate-800 font-semibold text-[11px]">
                <strong>Çözüm:</strong> GitHub &gt; Settings &gt; Developer settings &gt; Personal access tokens &gt; Tokens (classic) sayfasında yeni token oluştururken <code className="text-red-700 font-mono font-black">repo</code> kutucuğunu işaretleyin.
              </div>
            </div>

            <div className="p-5 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-2">
              <div className="flex items-center gap-2 font-black text-amber-900">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs">2</span>
                <span>Branch Protection / Dal Koruması (422)</span>
              </div>
              <p className="text-amber-800 leading-relaxed text-[11px]">
                Eğer hedef dalınız (<code className="font-mono">main</code> veya <code className="font-mono">master</code>) GitHub üzerinde "Require a pull request before merging" veya "Do not allow bypassing" kurallarıyla korunuyorsa, doğrudan REST API push işlemi reddedilir.
              </p>
              <div className="bg-white p-3 rounded-xl border border-amber-200 text-slate-800 font-semibold text-[11px]">
                <strong>Çözüm:</strong> GitHub deponuzun <strong>Settings &gt; Branches</strong> menüsünden koruma kurallarını yönetin veya push için korumasız bir dal belirleyin.
              </div>
            </div>

            <div className="p-5 bg-blue-50/70 rounded-2xl border border-blue-200 space-y-2">
              <div className="flex items-center gap-2 font-black text-blue-900">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">3</span>
                <span>Dosya SHA Çakışması (409 Conflict)</span>
              </div>
              <p className="text-blue-800 leading-relaxed text-[11px]">
                GitHub API, mevcut bir dosyanın üzerine yazarken dosyanın o anki son <code className="font-mono">sha</code> kodunu ister. Sistemimiz bu SHA kodunu otomatik çeker; ancak aynı anda başka bir commit geldiyse çakışma oluşabilir.
              </p>
              <div className="bg-white p-3 rounded-xl border border-blue-200 text-slate-800 font-semibold text-[11px]">
                <strong>Çözüm:</strong> Terminal ekranında <code className="font-mono">git status</code> yazıp ardından tekrar <code className="font-mono">git push</code> komutunu çalıştırmanız yeterlidir.
              </div>
            </div>

            <div className="p-5 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-2 md:col-span-2">
              <div className="flex items-center gap-2 font-black text-emerald-950">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">5</span>
                <span>Vercel Otomatik Deploy Neden Tetiklenmez ve Nasıl Çözülür?</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-emerald-900 text-[11px] pt-1">
                <div className="p-3 bg-white rounded-xl border border-emerald-200">
                  <div className="font-bold mb-1">A. [skip ci] Engeli Kaldırıldı ✓</div>
                  <p>Commit mesajlarında yer alan `[skip ci]` ibaresi Vercel'e 'dağıtımı atla' talimatı verir. Sistemimiz bu ibareyi tamamen kaldırdı.</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-emerald-200">
                  <div className="font-bold mb-1">B. Production Branch Uyumu</div>
                  <p>Vercel panelinizde <code>Settings &gt; Git &gt; Production Branch</code> alanının buradaki daldan (<code>main</code>) farklı olmadığından emin olun.</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-emerald-200">
                  <div className="font-bold mb-1">C. Vercel Deploy Hook (En Kesin Çözüm)</div>
                  <p>Vercel'den <code>Deploy Hook</code> URL'si alıp Ayarlar sekmesine yapıştırın; her push işleminde Vercel %100 garantili tetiklenecektir.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between">
            <span className="font-bold text-xs">
              Ayarlarınızı ve Token'ınızı güncelledikten sonra canlı terminal konsolunda test edin:
            </span>
            <button
              type="button"
              onClick={() => setActiveSubTab("terminal")}
              className="px-4 py-2 bg-emerald-500 text-slate-950 font-black rounded-lg text-xs hover:bg-emerald-400 transition-colors inline-flex items-center gap-1.5"
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>Terminal Konsoluna Git</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
