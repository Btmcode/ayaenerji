/**
 * Aya Elektrik Telegram Bot Client
 * Dispatches emergency calls, analytics conversion alerts, and satisfaction feedback
 * to the backend Telegram dispatcher.
 */

export interface EmergencyLeadPayload {
  name: string;
  phone: string;
  service: string;
  address: string;
  district?: string;
  message?: string;
  time?: string;
}

export interface AnalyticsAlertPayload {
  toolName: string;
  details: string;
  district?: string;
  actionTaken: string;
}

export interface SatisfactionPayload {
  customerName: string;
  phone: string;
  service: string;
  rating: number;
  comment?: string;
}

/**
 * Sends a real-time 7/24 emergency dispatch alert to the Telegram group of technicians and management.
 */
export async function sendTelegramEmergencyAlert(payload: EmergencyLeadPayload): Promise<boolean> {
  try {
    const res = await fetch("/api/telegram/lead-alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    return Boolean(data.success);
  } catch (err) {
    console.warn("[Telegram Client] Emergency alert could not be sent:", err);
    return false;
  }
}

/**
 * Sends a high-intent conversion / calculator alert to Telegram.
 */
export async function sendTelegramAnalyticsAlert(payload: AnalyticsAlertPayload): Promise<boolean> {
  try {
    const res = await fetch("/api/telegram/analytics-alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    return Boolean(data.success);
  } catch (err) {
    console.warn("[Telegram Client] Analytics alert could not be sent:", err);
    return false;
  }
}

/**
 * Sends post-service customer feedback / satisfaction score to Telegram.
 */
export async function sendTelegramSatisfaction(payload: SatisfactionPayload): Promise<boolean> {
  try {
    const res = await fetch("/api/telegram/satisfaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    return Boolean(data.success);
  } catch (err) {
    console.warn("[Telegram Client] Satisfaction alert could not be sent:", err);
    return false;
  }
}
