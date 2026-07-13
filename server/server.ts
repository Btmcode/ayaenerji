import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import googleTrends from "google-trends-api";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { exec } from "child_process";
import fs from "fs";
import cron from "node-cron";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "";

let supabase: any = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
  
  // Set up a cron job to ping Supabase every 5 minutes to prevent it from sleeping
  cron.schedule("*/5 * * * *", async () => {
    try {
      console.log("Supabase ping job running to prevent sleep...");
      // A lightweight query just to keep the connection alive
      const { data, error } = (await supabase.from("todos").select("id").limit(1)) || {};
      if (error && error.code !== "PGRST116") {
        console.error("Supabase ping job error:", error);
      } else {
        console.log("Supabase ping job successful.");
      }
    } catch (err) {
      console.error("Supabase ping job caught error:", err);
    }
  });
}

// Enable trust proxy so that express-rate-limit can accurately detect client IP behind proxy/ingress
app.set("trust proxy", 1);

// Security measures
app.use(helmet({
  contentSecurityPolicy: false, // Disabling CSP for Vite HMR and iframes in dev/studio mode
  crossOriginEmbedderPolicy: false,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  frameguard: { action: "sameorigin" }
}));

// Permissions-Policy middleware
app.use((req, res, next) => {
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

// Strict CORS Configuration for API Routes
const allowedOrigins = [
  "https://ayaelektrik.com",
  "https://www.ayaelektrik.com",
  "http://localhost:3000",
  "http://localhost:5173"
];

app.use("/api", cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.run.app') || origin.endsWith('.netlify.app') || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation: Origin not allowed.'));
    }
  },
  credentials: true,
}));

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "Çok fazla istek gönderildi, lütfen daha sonra tekrar deneyin.",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use("/api/", apiLimiter);

app.use(express.json({ limit: '10kb' })); // Limit body payload to prevent DoS

// Initialize Gemini client lazily
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!ai) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY" && key.trim() !== "") {
      ai = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "custom-build",
          },
        },
      });
    }
  }
  return ai;
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY",
  });
});

// Helper function to run shell commands as promises
function runCmd(command: string, cwd: string = process.cwd()): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(stderr || stdout || error.message));
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

// Real GitHub Push and Deploy Endpoint
app.post("/api/deploy/github-push", async (req, res) => {
  const { repoUrl, branch, token, commitMessage } = req.body;

  if (!repoUrl) {
    return res.status(400).json({ error: "Lütfen geçerli bir GitHub Repository URL'si girin." });
  }
  if (!token) {
    return res.status(400).json({ error: "Lütfen bir GitHub Personal Access Token (PAT) girin. Bu işlem şifreniz yerine token gerektirir." });
  }

  const activeBranch = branch || "main";
  const msg = commitMessage || `Aya Enerji Admin Paneli Güncellemesi - ${new Date().toLocaleString("tr-TR")}`;

  try {
    const logs: string[] = [];
    logs.push("GitHub Dağıtım İşlemi Başlatıldı...");

    // Validate repoUrl structure
    if (!repoUrl.startsWith("https://github.com/")) {
      throw new Error("Repository URL mutlaka 'https://github.com/' ile başlamalıdır.");
    }

    // Format authenticated URL
    const cleanRepoUrl = repoUrl.trim();
    const cleanToken = token.trim();
    const authenticatedUrl = cleanRepoUrl.replace("https://github.com/", `https://x-access-token:${cleanToken}@github.com/`);

    const gitDir = path.join(process.cwd(), ".git");
    const hasGit = fs.existsSync(gitDir);

    if (!hasGit) {
      logs.push("Git deposu bulunamadı, yeni depo başlatılıyor...");
      await runCmd("git init");
    }

    // Configure local git identity if not set
    try {
      await runCmd("git config user.name 'Aya Enerji Auto-Deploy'");
      await runCmd("git config user.email 'deploy@ayaenerji.com'");
    } catch (e: any) {
      logs.push(`Kimlik yapılandırma uyarısı: ${e.message}`);
    }

    logs.push("Değişiklikler toplanıyor...");
    await runCmd("git add .");

    logs.push("Değişiklikler commit ediliyor...");
    try {
      const commitRes = await runCmd(`git commit -m "${msg.replace(/"/g, '\\"')}"`);
      logs.push(`Commit tamamlandı: ${commitRes.stdout.trim().split("\n")[0]}`);
    } catch (e: any) {
      if (e.message.includes("nothing to commit") || e.message.includes("clean")) {
        logs.push("Yeni bir değişiklik bulunmuyor, mevcut durum push ediliyor...");
      } else {
        throw e;
      }
    }

    logs.push(`Kodlar GitHub'a gönderiliyor (Branch: ${activeBranch})...`);
    // Use -c credential.helper="" to prevent override by aistudioblack credential helper
    await runCmd(`git -c credential.helper="" push --force "${authenticatedUrl}" HEAD:"${activeBranch}"`);
    logs.push("GitHub Push işlemi başarıyla tamamlandı!");

    res.json({
      success: true,
      logs: logs,
      message: "Projeniz başarıyla GitHub'a aktarıldı ve yayına alındı!"
    });
  } catch (error: any) {
    console.error("GitHub Push Error:", error);
    const safeErrorMessage = error.message ? error.message.replace(new RegExp(token, "g"), "***TOKEN***") : "Bilinmeyen bir hata oluştu.";
    res.status(500).json({
      success: false,
      error: safeErrorMessage,
      message: "GitHub'a yükleme sırasında hata oluştu."
    });
  }
});

// Real Google Trends API Endpoint
app.get("/api/trends", async (req, res) => {
  const { serviceType = "", targetDistrict = "İstanbul" } = req.query;
  const keyword = typeof serviceType === "string" ? serviceType : "elektrikçi";
  const geo = "TR";

  try {
    const results = await googleTrends.relatedQueries({ keyword, geo });
    const parsed = JSON.parse(results);
    
    let suggestions: string[] = [];
    if (parsed && parsed.default && parsed.default.rankedList && parsed.default.rankedList.length > 0) {
      const topQueries = parsed.default.rankedList[0].rankedKeyword || [];
      const risingQueries = parsed.default.rankedList[1]?.rankedKeyword || [];
      
      const allQueries = [...risingQueries, ...topQueries];
      suggestions = allQueries.map((item: any) => item.query).filter(Boolean);
    }
    
    // Fallback to keyword combinations if API returns empty
    if (suggestions.length === 0) {
      const base = keyword.split(" ")[0].toLowerCase();
      const dist = typeof targetDistrict === "string" ? targetDistrict : "İstanbul";
      suggestions = [
        `acil ${base} ${dist}`,
        `en yakın ${base} ${dist}`,
        `${dist} nöbetçi ${base}`,
        `${base} fiyatları ${new Date().getFullYear()}`,
        `7/24 ${base} servisi`,
      ];
    }

    res.json({ trends: suggestions.slice(0, 8) });
  } catch (error: any) {
    console.error("Google Trends API Error:", error.message);
    // Fallback on error
    const base = keyword.split(" ")[0].toLowerCase();
    const dist = typeof targetDistrict === "string" ? targetDistrict : "İstanbul";
    res.json({
      trends: [
        `acil ${base} ${dist}`,
        `en yakın ${base} ${dist}`,
        `${dist} nöbetçi ${base}`,
        `7/24 ${base} servisi`,
        `${base} fiyatları`,
      ],
    });
  }
});

// AI Content Generator Endpoint
app.post("/api/generate-image", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const client = getGeminiClient();
  if (!client) {
    return res.json({ imageUrl: "https://ayaelektrik.com/assets/turkish_electrician_hero_1782073722580-DwQLpvV-.jpg" });
  }

  try {
    const result = await client.models.generateImages({
      model: "imagen-3.0-generate-001",
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: "image/jpeg",
        aspectRatio: "16:9",
      },
    });

    if (result.generatedImages && result.generatedImages.length > 0) {
      const base64Image = result.generatedImages[0].image.imageBytes;
      const imageUrl = `data:image/jpeg;base64,${base64Image}`;
      res.json({ imageUrl });
    } else {
      res.status(500).json({ error: "No image generated." });
    }
  } catch (error: any) {
    console.error("Gemini API Error (Image Generation):", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/score-lead", async (req, res) => {
  const { service, description } = req.body;
  const client = getGeminiClient();

  if (!client) {
    return res.json({
      difficulty: "Orta",
      profitability: "Yüksek",
      estimatedTime: "2-3 Saat",
      score: 75
    });
  }

  try {
    const prompt = `Sen kıdemli bir elektrik ustası ve işletme yöneticisisin. Aşağıdaki müşteri talebini analiz et.
Talep: "${service} - ${description}"
Bu işin zorluk derecesini (Kolay, Orta, Zor), karlılığını (Düşük, Orta, Yüksek), tahmini süresini ve 100 üzerinden genel cazibe skorunu JSON formatında döndür.
Sadece JSON döndür. Örnek: {"difficulty":"Orta","profitability":"Yüksek","estimatedTime":"2 Saat","score":80}`;

    const result = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    
    const responseText = result.text;
    if (responseText) {
      const parsed = JSON.parse(responseText);
      res.json(parsed);
    } else {
      throw new Error("Boş yanıt");
    }
  } catch (error: any) {
    console.error("Gemini API Error (Score Lead):", error.message);
    res.json({
      difficulty: "Orta",
      profitability: "Belirsiz",
      estimatedTime: "Bilinmiyor",
      score: 50
    });
  }
});

function cleanAiTracesBackend(text: string): string {
  if (!text) return "";
  let cleaned = text;

  // 1. Remove markdown formatting markers if any
  cleaned = cleaned.replace(/^```html\s*/i, "").replace(/```$/, "");
  cleaned = cleaned.trim();

  // 2. Replace common AI clichés and expressions with authentic Turkish professional tone
  const cliches: Record<string, string> = {
    "insan elinden çıkmış": "profesyonel",
    "insan elinden cikmis": "profesyonel",
    "hayat kurtarıcı": "kritik öneme sahip",
    "hayat kurtarici": "kritik öneme sahip",
    "adeta kalbidir": "merkezidir",
    "adeta kalbi": "merkezi",
    "unutmayın ki": "belirtmek gerekir ki",
    "unutmayin ki": "belirtmek gerekir ki",
    "özetle": "kısacası",
    "ozetle": "kısacası",
    "sonuç olarak": "bu doğrultuda",
    "sonuc olarak": "bu doğrultuda",
    "göz önünde bulundurulduğunda": "göz önüne alındığında",
    "goz onunde bulunduruldugunda": "göz önüne alındığında",
    "büyük önem taşımaktadır": "önemlidir",
    "buyuk onem tasimaktadir": "önemlidir",
    "büyük önem taşır": "önemlidir",
    "buyuk onem tasir": "önemlidir",
    "büyük bir hassasiyetle": "titizlikle",
    "buyuk bir hassasiyetle": "titizlikle",
    "şüphesiz": "kesinlikle",
    "suphesiz": "kesinlikle",
    "göz ardı edilmemelidir": "dikkat edilmelidir",
    "goz ardi edilmemelidir": "dikkat edilmelidir",
    "çarpıcı": "önemli",
    "carpici": "önemli",
    "adeta ": " ",
    "kesinlikle ": "",
    "titizlikle ": "özenle "
  };

  Object.entries(cliches).forEach(([key, val]) => {
    const regex = new RegExp(key, "gi");
    cleaned = cleaned.replace(regex, val);
  });

  // 3. Strip out common AI conversational intro/outro lines
  const introFluff = [
    /^tabii ki, işte hazırladığım makale:\s*/i,
    /^tabii ki, işte talep ettiğiniz içerik:\s*/i,
    /^harika! işte makale:\s*/i,
    /^işte aradığınız seo uyumlu içerik:\s*/i,
    /^tabii, işte aya elektrik için hazırladığım yazı:\s*/i,
    /^tabii ki, işte hazırladığım seo uyumlu makale:\s*/i
  ];
  introFluff.forEach(regex => {
    cleaned = cleaned.replace(regex, "");
  });

  return cleaned.trim();
}

app.get("/api/tiles/:z/:x/:y", async (req, res) => {
  try {
    const { z, x, y } = req.params;
    // We use a specific cartocdn server (a, b, c, or d). Here we use 'a'
    const url = `https://a.basemaps.cartocdn.com/light_all/${z}/${x}/${y}`;
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).send(response.statusText);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    res.setHeader('Content-Type', response.headers.get('content-type') || 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    res.send(buffer);
  } catch (error) {
    console.error("Tile proxy error:", error);
    res.status(500).send("Error fetching tile");
  }
});

app.get("/api/tts", async (req, res) => {
  try {
    const text = req.query.text as string;
    if (!text) return res.status(400).send("Text is required");
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=tr&client=tw-ob`;
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).send(response.statusText);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.send(buffer);
  } catch (error) {
    console.error("TTS proxy error:", error);
    res.status(500).send("Error fetching TTS");
  }
});

app.post("/api/generate-content", async (req, res) => {
  const { contentType, serviceType, keyword, targetDistrict } = req.body;

  const target = targetDistrict || "İstanbul Avrupa Yakası";
  const client = getGeminiClient();

  if (!client) {
    // Elegant fallback simulated content in Turkish if no API Key provided
    let fallbackText = "";
    if (contentType === "blog") {
      fallbackText = `### ${target} Bölgesinde Güvenilir Elektrik Hizmeti Nasıl Seçilir?\n\n` +
        `Günümüzde ev ve iş yerlerimizin kalbi elektrik tesisatıdır. Özellikle **${serviceType || "akıllı ev sistemleri"}** gibi gelişmiş teknolojilerin entegrasyonu söz konusu olduğunda, uzman ve sertifikalı kadrolarla çalışmak hayati önem taşır. İşte elektrikçi seçerken dikkat etmeniz gereken kritik noktalar:\n\n` +
        `1. **TSE Standartlarında Malzeme ve Belgeli Kadro:** Elektrik işleri tolerans kabul etmez. Kullanılan sigortalar, kablolar ve anahtarlama elemanları mutlaka TSE onaylı olmalıdır. Fotoğraflarımızda da görüldüğü üzere, **Aya Elektrik** ekipleri sadece dünya standartlarında test edilmiş, kaliteli markalar kullanır.\n` +
        `2. **7/24 Kesintisiz Hizmet and Hızlı Müdahale:** Acil bir sigorta atması veya şalter arızası gece yarısı yaşanabilir. İstanbul genelinde, özellikle **${target}** bölgesinde tam donanımlı araç filomuzla 7/24 hizmet sunuyoruz.\n` +
        `3. **Mühendislik ve Ölçüm Altyapısı:** Sıradan bir elektrikçi sadece kablo çeker. Profesyonel bir elektrik mühendisliği firması ise topraklama ölçümü yapar, paratoner hizmeti sağlar ve UPS/Jeneratör bağlantılarını standartlara uygun projelendirir.\n\n` +
        `**💡 İstanbul Avrupa Yakası İçin Öneri:** Elektrik tesisatınızda güvenlik ve lüksü bir araya getirmek istiyorsanız, akıllı ev otomasyonlarından ağ kablolamaya kadar geniş bir yelpazede hizmet veren, güler yüzlü ve kurumsal logolu teknik üniformalı ekibimizle iletişime geçebilirsiniz. Telefonumuz: **0530 069 53 93**`;
    } else if (contentType === "social") {
      fallbackText = `⚡️ **Haftalık Elektrik Güvenliği İpucu!** ⚡️\n\n` +
        `Ev ve ofislerinizde kullandığınız ${serviceType || "elektrik tesisatı"} altyapısının sağlığından emin misiniz?\n\n` +
        `✅ **Tavsiye:** Düzenli olarak topraklama ölçümü yaptırmak elektrik çarpması ve cihaz arızası risklerini sıfıra indirir. Ekibimiz modern multimetreler ve kazıklı ölçüm cihazları ile topraklama değerlerinizin sıfıra yakın olmasını sağlıyor.\n\n` +
        `🚚 İstanbul Avrupa Yakası'nda nerede olursanız olun, donanımlı servis araçlarımız ve belgeli kadromuzla **7/24** bir telefon uzağınızdayız.\n\n` +
        `📞 Detaylar için arayın: **0530 069 53 93**\n` +
        `🌐 Web sitemiz: **ayaelektrik.com**\n\n` +
        `#ayaelektrik #elektrikçi #istanbulavrupayakası #724acilservis #akıllıev`;
    } else {
      fallbackText = `📢 **Google Benim İşletmem Güncellemesi:**\n\n` +
        `İstanbul Avrupa Yakası'nda güvenli ve profesyonel elektrik hizmeti! 🛠⚡️\n\n` +
        `**Aya Elektrik** olarak, en zorlu pano montajlarından lüks avize kurulumlarına, akıllı ev otomasyonlarından veri merkezi yapısal ethernet kablolamasına kadar tüm elektrik altyapı işlerinizde yanınızdayız.\n\n` +
        `🌟 Uzman Belgeli Kadro\n` +
        `🌟 7/24 Acil Müdahale Hizmeti\n` +
        `🌟 TSE Onaylı Malzemeler ve %100 Garantili İşçilik\n\n` +
        `İşletme profilimizdeki hizmet görsellerini inceleyerek yaptığımız profesyonel uygulamaları görebilirsiniz. Bölgenizde en yakın nöbetçi elektrikçi arıyorsanız bize ulaşın:\n\n` +
        `📞 **0530 069 53 93**\n` +
        `📍 İstanbul Avrupa Yakası (Beşiktaş, Şişli, Beylikdüzü, Bakırköy, Sarıyer ve tüm çevre ilçeler)`;
    }

    return res.json({
      text: fallbackText,
      metaTitle: `${target} Acil Elektrikçi | 7/24 Aya Elektrik`,
      metaDescription: `${target}'da acil elektrik arıza çözümleri! Aya Elektrik 7/24 profesyonel kadrosuyla hizmetinizde. Hemen arayın: 0530 069 53 93.`,
      isDemo: true,
      message: "GEMINI_API_KEY bulunamadı veya konfigure edilmedi. Demo modu aktif edilerek otomatik pazarlama içeriği üretildi.",
    });
  }

  try {
    const prompt = `Lütfen İstanbul Avrupa Yakası'nda faaliyet gösteren profesyonel "Aya Elektrik" (Aya Elektrik - Elektrik Hizmetleri, Telefon: 0530 069 53 93, web sitesi: ayaelektrik.com) firması için çok güçlü teknik SEO odakli bir icerik hazirla.

Icerik turu: "${contentType}" (Secenekler: blog, social, google-update).
Ilgili elektrik muhendisligi hizmeti: "${serviceType}".
Musteri hedef anahtar kelimesi: "${keyword || "en yakin elektrikci"}".
Hedeflenen İstanbul Avrupa Yakası ilcesi/bolgesi: "${target}".

Firma Ozellikleri:
- 7/24 Kesintisiz Hizmet (7/24 Acil Servis) ve donanimli arac filosu
- Uzman Belgeli Kadro (kurumsal üniformalı, profesyonel ekip)
- Garantili Iscilik ve TSE onayli malzemeler
- Hizmetler: Akilli ev paneli kurulumu, elektrik ariza tespiti (multimetre ile hassas olcum), pano kurulumu, yapisal veri/ethernet kablolamasi sistem odasi kurulumlari, luks aydinlatma ve avize montaji, jenerator & kesintisiz guc kaynagi (UPS) devreye alma, topraklama olcumu ve elektrod cakimi.

LUFTEN SU SEO VE KALITE KURALLARINA KESINLIKLE UY:
1. H1, H2, H3 hiyerarsisini kusursuz sekilde kullan.
2. Icerikte LSI (Gizli Semantik Indeksleme) kelimelerini (ornek: sigorta atmasi, kacak akim rolesi, kisa devre, lisansli usta) dogal bir sekilde serpistir.
3. Okunabilirligi yuksek tutmak icin listeler, kalin yazilar ve tablolar kullan.
4. Mutlaka Footer veya CTA (Call to Action) kisminda acikca 0530 069 53 93 telefon numarasini ve Aya Elektrik marka ismini gecir.
5. Teknik bilgi guven vermeli ancak son kullanicinin anlayacagi dilde olmali.
6. ASLA yapay zeka klisesi sozcukler kullanma ('insan elinden cikmis', 'hayat kurtarici', 'adeta kalbidir', 'ozetle', 'sonuc olarak', 'unutmayin ki'). Dogrudan, profesyonel teknik muhendis gibi akici ve kesintisiz yaz.`;

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            metaTitle: { 
              type: "STRING", 
              description: "Maksimum 60 karakterlik, yerel anahtar kelimeleri ve Aya Elektrik marka ismini iceren akilda kalici SEO Basligi." 
            },
            metaDescription: { 
              type: "STRING", 
              description: "Maksimum 155 karakterlik, dikkat cekici, telefon numarasi iceren ve tiklama tesviki yuksek SEO Aciklamasi." 
            },
            content: { 
              type: "STRING", 
              description: "Makale veya paylasim metninin kendisi. Markdown formatinda yazilmis, profesyonel, akici, zekice hazirlanmis, yapay zeka izi veya basmakolip tekrarlar tasimayan yuksek kaliteli icerik." 
            },
            imagePrompt: {
              type: "STRING",
              description: "Bu içeriğe uygun yüksek kaliteli İngilizce görsel promptu. Örn: 'Professional electrician fixing modern electrical panel, 4k, photorealistic'."
            }
          },
          required: ["metaTitle", "metaDescription", "content", "imagePrompt"]
        },
        systemInstruction: "Sen Istanbul'un en prestijli elektrik muhendisligi sirketlerinden 'Aya Elektrik' icin calisan uc duzey bir Teknik SEO ve Dijital Pazarlama Uzmanisin. Amacin, yerel aramalarda (Local SEO) rakipsiz, tamamen dogal ve insan elinden cikmis hissi veren mukemmel akicilikta icerikler ureterek sirketin donusum oranini maksimize etmektir. Urettigin metinlerde asla siradan yapay zeka kaliplari kullanma. Dogrudan profesyonel, guven veren ve dogrudan sonuca giden bir tonda yaz. Tokenleri son derece verimli ve nokta atisi zekayla kullan.",
      },
    });

    let resultJson;
    try {
      resultJson = JSON.parse(response.text || "{}");
    } catch (e) {
      resultJson = {
        metaTitle: `${target} Acil Elektrikçi | 7/24 Aya Elektrik`,
        metaDescription: `${target}'da acil elektrik arıza çözümleri! Aya Elektrik 7/24 profesyonel kadrosuyla hizmetinizde. Hemen arayın: 0530 069 53 93.`,
        content: response.text,
        imagePrompt: `Professional electrician working in ${target}, photorealistic, 4k`
      };
    }

    res.json({
      text: cleanAiTracesBackend(resultJson.content),
      metaTitle: cleanAiTracesBackend(resultJson.metaTitle),
      metaDescription: cleanAiTracesBackend(resultJson.metaDescription),
      imagePrompt: resultJson.imagePrompt,
      isDemo: false,
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "İçerik üretilirken hata oluştu." });
  }
});

// Middleware for Vite / Static Assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  if (process.env.VERCEL !== "1") {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

startServer();


export default app;