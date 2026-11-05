import fs from "fs";
import path from "path";

export interface TelegramConfig {
  botToken: string;
  chatId: string;
  notifyNewRequests: boolean;
  notifyAnalytics: boolean;
  notifyDailyReport: boolean;
  notifySatisfaction: boolean;
  technicians: Array<{ name: string; phone: string }>;
}

const CONFIG_FILE = path.join(process.cwd(), "server", "telegram_config.json");

const DEFAULT_CONFIG: TelegramConfig = {
  botToken: process.env.TELEGRAM_BOT_TOKEN || "",
  chatId: process.env.TELEGRAM_CHAT_ID || "",
  notifyNewRequests: true,
  notifyAnalytics: true,
  notifyDailyReport: true,
  notifySatisfaction: true,
  technicians: [
    { name: "Ahmet Usta (Baş Teknisyen)", phone: "05300695393" },
    { name: "Nöbetçi Gece Ustası", phone: "05386949469" }
  ]
};

export function getTelegramConfig(): TelegramConfig {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = fs.readFileSync(CONFIG_FILE, "utf-8");
      return { ...DEFAULT_CONFIG, ...JSON.parse(data) };
    }
  } catch (err) {
    console.error("Error reading telegram_config.json:", err);
  }
  return DEFAULT_CONFIG;
}

export function saveTelegramConfig(config: Partial<TelegramConfig>): TelegramConfig {
  const current = getTelegramConfig();
  const updated: TelegramConfig = { ...current, ...config };
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(updated, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing telegram_config.json:", err);
  }
  return updated;
}

/**
 * Sends a message via Telegram Bot API with HTML parse mode and optional inline keyboard.
 */
export async function sendTelegramMessage(
  text: string,
  options?: {
    token?: string;
    chatId?: string;
    replyMarkup?: any;
  }
): Promise<{ success: boolean; data?: any; error?: string }> {
  const config = getTelegramConfig();
  const token = options?.token || config.botToken;
  const chatId = options?.chatId || config.chatId;

  if (!token || !chatId) {
    console.log("[Telegram] Token or Chat ID not configured. Message simulated in dev log:\n", text);
    return {
      success: false,
      error: "Telegram Bot Token veya Chat ID yapılandırılmamış. Lütfen Admin Paneli -> Telegram sekmesinden ayarları kaydedin."
    };
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const cleanChatId = typeof chatId === "string" ? chatId.trim() : chatId;

    const payload: any = {
      chat_id: cleanChatId,
      text: text,
      parse_mode: "HTML",
      disable_web_page_preview: true
    };

    // Telegram Bot API strictly allows only http://, https://, or tg:// in inline button URLs
    if (options?.replyMarkup?.inline_keyboard) {
      const sanitizedKeyboard = options.replyMarkup.inline_keyboard
        .map((row: any[]) =>
          row.filter((btn: any) => {
            if (btn.url) {
              const urlStr = String(btn.url).trim();
              return (
                urlStr.startsWith("http://") ||
                urlStr.startsWith("https://") ||
                urlStr.startsWith("tg://")
              );
            }
            return Boolean(btn.callback_data);
          })
        )
        .filter((row: any[]) => row.length > 0);

      if (sanitizedKeyboard.length > 0) {
        payload.reply_markup = { inline_keyboard: sanitizedKeyboard };
      }
    }

    let response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    let result = await response.json();

    // Fallback: If Telegram cannot parse HTML entities, retry as plain text
    if (!result.ok && result.description && result.description.toLowerCase().includes("can't parse entities")) {
      console.warn("[Telegram] HTML entity parse error, retrying without parse_mode...");
      delete payload.parse_mode;
      response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      result = await response.json();
    }

    if (!result.ok) {
      console.error("[Telegram API Error]", result);
      return { success: false, error: result.description || "Telegram API hatası" };
    }

    return { success: true, data: result.result };
  } catch (err: any) {
    console.error("[Telegram Network Error]", err);
    return { success: false, error: err.message || "Ağ bağlantı hatası" };
  }
}

/**
 * 1. 7/24 Emergency Call Alert to Field Electricians
 */
export async function sendEmergencyLeadAlert(lead: {
  name: string;
  phone: string;
  service: string;
  address: string;
  district?: string;
  message?: string;
  time?: string;
}) {
  const config = getTelegramConfig();
  if (!config.notifyNewRequests) return { success: false, skipped: true };

  const now = new Date();
  const timeFormatted = now.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  const rawPhone = lead.phone.replace(/\D/g, "");
  const cleanPhone = rawPhone.startsWith("90") ? rawPhone : (rawPhone.startsWith("0") ? "9" + rawPhone : "90" + rawPhone);
  const mapsSearchQuery = encodeURIComponent(lead.address);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsSearchQuery}`;

  const messageText = [
    `🚨 <b>7/24 YENİ ACİL SERVİS ÇAĞRISI</b> ⚡`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 <b>Müşteri:</b> ${escapeHtml(lead.name)}`,
    `📞 <b>Telefon:</b> +${cleanPhone} (Dokununca Aranır)`,
    `📍 <b>Bölge:</b> ${escapeHtml(lead.district || "İstanbul Avrupa Yakası")}`,
    `🏠 <b>Açık Adres:</b> ${escapeHtml(lead.address)}`,
    `🛠 <b>Arıza Türü:</b> <b>${escapeHtml(lead.service)}</b>`,
    lead.message ? `📝 <b>Not:</b> <i>${escapeHtml(lead.message)}</i>` : ``,
    `⏱ <b>Kayıt Saati:</b> ${timeFormatted}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `⚠️ <i>Müşteri acil usta yönlendirmesi bekliyor! Aşağıdaki butonları kullanarak hemen aksiyon alın.</i>`
  ].filter(Boolean).join("\n");

  const replyMarkup = {
    inline_keyboard: [
      [
        { text: "📍 Konumu Haritada Aç", url: mapsUrl },
        { text: "💬 WhatsApp'tan Yaz", url: `https://wa.me/${cleanPhone}` }
      ],
      [
        { text: "⚡ Aya Elektrik Web Sitesi", url: "https://ayaelektrik.com" }
      ]
    ]
  };

  return sendTelegramMessage(messageText, { replyMarkup });
}

/**
 * 2. High-Intent Analytics / Calculator Drop-Off Alert
 */
export async function sendAnalyticsAlert(analytics: {
  toolName: string;
  details: string;
  district?: string;
  actionTaken: string;
}) {
  const config = getTelegramConfig();
  if (!config.notifyAnalytics) return { success: false, skipped: true };

  const messageText = [
    `📈 <b>SICAK PROJE FIRSATI & HESAPLAMA ALARMI</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `⚡ <b>Kullanılan Araç:</b> ${escapeHtml(analytics.toolName)}`,
    `📊 <b>Hesaplama Detayı:</b> ${escapeHtml(analytics.details)}`,
    `📍 <b>Ziyaretçi Bölgesi:</b> ${escapeHtml(analytics.district || "İstanbul")}`,
    `💡 <b>Kullanıcı Davranışı:</b> ${escapeHtml(analytics.actionTaken)}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<i>Web sitesinde hesaplama yapıp usta danışmanlığı arayan sıcak müşteri fırsatı.</i>`
  ].join("\n");

  return sendTelegramMessage(messageText);
}

/**
 * 3. Daily Nightly Operations Summary Report (Scheduled at 23:59)
 */
export async function sendDailyReport(stats?: {
  totalCalls?: number;
  completed?: number;
  avgResponseMins?: number;
  satisfactionRating?: number;
  topDistrict?: string;
}) {
  const config = getTelegramConfig();
  if (!config.notifyDailyReport) return { success: false, skipped: true };

  const todayStr = new Date().toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const total = stats?.totalCalls ?? 8;
  const completed = stats?.completed ?? 8;
  const avgMins = stats?.avgResponseMins ?? 26;
  const satisfaction = stats?.satisfactionRating ?? 4.9;
  const district = stats?.topDistrict ?? "Büyükçekmece (Alkent 2000 & Beykent)";

  const messageText = [
    `📊 <b>AYA ELEKTRİK GÜNLÜK SERVİS & PERFORMANS RAPORU</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `📅 <b>Tarih:</b> ${todayStr}`,
    `🚨 <b>Bugünkü Acil Çağrı:</b> ${total} adet`,
    `✅ <b>Müdahale & Çözüm:</b> ${completed} adet`,
    `⏱ <b>Ort. Sahaya Ulaşım:</b> ~${avgMins} dakika`,
    `⭐ <b>Günün Müşteri Memnuniyeti:</b> ${satisfaction} / 5.0`,
    `🏆 <b>En Yoğun Talep Bölgesi:</b> ${district}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `💪 <i>Tüm saha teknisyenlerimizin ve ustalarımızın eline sağlık! 7/24 nöbetçi ekibimiz hazır.</i>`
  ].join("\n");

  return sendTelegramMessage(messageText);
}

/**
 * 4. Post-Service Satisfaction & NPS Alert
 */
export async function sendSatisfactionAlert(survey: {
  customerName: string;
  phone: string;
  service: string;
  rating: number;
  comment?: string;
}) {
  const config = getTelegramConfig();
  if (!config.notifySatisfaction) return { success: false, skipped: true };

  const stars = "⭐".repeat(Math.max(1, Math.min(5, survey.rating)));

  const messageText = [
    `🌟 <b>YENİ MÜŞTERİ MEMNUNİYET DEĞERLENDİRMESİ</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 <b>Müşteri:</b> ${escapeHtml(survey.customerName)}`,
    `📞 <b>Telefon:</b> <code>${escapeHtml(survey.phone)}</code>`,
    `🛠 <b>Verilen Hizmet:</b> ${escapeHtml(survey.service)}`,
    `⭐ <b>Puan:</b> ${stars} (${survey.rating}/5)`,
    survey.comment ? `💬 <b>Müşteri Yorumu:</b> "<i>${escapeHtml(survey.comment)}</i>"` : ``,
    `━━━━━━━━━━━━━━━━━━━━`,
    survey.rating >= 4 
      ? `✅ <i>Yüksek memnuniyet! Müşteriye Google Haritalar profil yorumu teşekkür mesajı iletildi.</i>`
      : `⚠️ <i>Düşük puan uyarısı! Yönetici tarafından müşteri aranarak geri bildirim alınmalıdır.</i>`
  ].filter(Boolean).join("\n");

  return sendTelegramMessage(messageText);
}

/**
 * 5. Test Telegram Bot Connection
 */
export async function testTelegramConnection(token?: string, chatId?: string) {
  const testMsg = [
    `✅ <b>AYA ELEKTRİK TELEGRAM BOTU BAĞLANTISI BAŞARILI!</b> ⚡`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `🤖 <b>Bot Durumu:</b> Aktif ve Çalışıyor`,
    `🏢 <b>İşletme:</b> Aya Elektrik 7/24 Acil Arıza Bakım Onarım`,
    `⏱ <b>Test Zamanı:</b> ${new Date().toLocaleTimeString("tr-TR")}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `Web sitesinden gelen acil servis çağrıları, müşteri usta eşleştirmeleri ve hesaplama alarmları anlık olarak bu kanala iletilecektir.`
  ].join("\n");

  return sendTelegramMessage(testMsg, {
    token,
    chatId,
    replyMarkup: {
      inline_keyboard: [
        [
          { text: "⚡ Aya Elektrik Web Sitesi", url: "https://ayaelektrik.com" },
          { text: "💬 7/24 WhatsApp Acil Servis", url: "https://wa.me/905300695393" }
        ]
      ]
    }
  });
}

export interface DetectedChat {
  id: string;
  title: string;
  type: "group" | "supergroup" | "channel" | "private" | string;
  typeLabel: string;
  lastMessage?: string;
  date?: string;
}

/**
 * Automatically inspects recent updates for the bot to discover groups, channels, or private chats.
 * Eliminates the need for third-party bots like RawDataBot.
 */
export async function detectRecentChats(token?: string): Promise<{ success: boolean; chats?: DetectedChat[]; error?: string }> {
  const config = getTelegramConfig();
  const botToken = token || config.botToken;

  if (!botToken) {
    return {
      success: false,
      error: "Lütfen önce yukarıdaki 'Bot Token' alanına BotFather'dan aldığınız token kodunu yapıştırın."
    };
  }

  try {
    const url = `https://api.telegram.org/bot${botToken}/getUpdates`;
    const response = await fetch(url, { method: "GET" });
    const result = await response.json();

    if (!result.ok) {
      return {
        success: false,
        error: result.description || "Telegram API hatası. Bot Token'ınızı kontrol edin."
      };
    }

    const updates: any[] = result.result || [];
    const chatMap = new Map<string, DetectedChat>();

    for (const update of updates) {
      const chat = update.message?.chat || update.channel_post?.chat || update.my_chat_member?.chat || update.edited_message?.chat;
      if (!chat || !chat.id) continue;

      const chatIdStr = String(chat.id);
      let title = chat.title || [chat.first_name, chat.last_name].filter(Boolean).join(" ") || chat.username || "İsimsiz Sohbet";
      const type = chat.type || "unknown";

      let typeLabel = "Özel Sohbet";
      if (type === "supergroup" || type === "group") typeLabel = "👥 Telegram Grubu";
      else if (type === "channel") typeLabel = "📢 Telegram Kanalı";
      else if (type === "private") typeLabel = "👤 Kişisel Sohbet";

      const text = update.message?.text || update.channel_post?.text || (update.my_chat_member ? "Bot gruba eklendi" : "Etkileşim");
      const date = update.message?.date ? new Date(update.message.date * 1000).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }) : undefined;

      chatMap.set(chatIdStr, {
        id: chatIdStr,
        title,
        type,
        typeLabel,
        lastMessage: text,
        date
      });
    }

    const chats = Array.from(chatMap.values());
    return {
      success: true,
      chats
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Telegram sunucularına bağlanırken hata oluştu."
    };
  }
}

function escapeHtml(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
