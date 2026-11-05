const DEFAULT_PHONE = "905300695393";

/**
 * Aya Elektrik 7/24 kesintisiz nöbetçi elektrikçi servisi sunar.
 * Mesai saati ayrımı olmaksızın her saat aktif usta yönlendirmesi yapılır.
 */
export const getWhatsAppGreeting = (customMessage?: string): string => {
  if (customMessage && typeof customMessage === "string" && customMessage.trim().length > 0) {
    return encodeURIComponent(customMessage.trim());
  }

  return encodeURIComponent(
    "Merhaba Aya Elektrik, acil elektrikçi ustası ve servis desteği almak istiyorum. Müsait misiniz?"
  );
};

export const getWhatsAppLink = (param1?: string, param2?: string): string => {
  let phone = DEFAULT_PHONE;
  let message: string | undefined = undefined;

  if (param1) {
    // If param1 looks like a phone number (e.g. "905300695393", "+90 530...")
    const cleaned = param1.replace(/[\s+-]/g, "");
    if (/^\d{10,14}$/.test(cleaned)) {
      phone = cleaned;
      message = param2;
    } else {
      // param1 is a custom message string
      message = param1;
      if (param2) {
        const cleanedParam2 = param2.replace(/[\s+-]/g, "");
        if (/^\d{10,14}$/.test(cleanedParam2)) {
          phone = cleanedParam2;
        }
      }
    }
  }

  return `https://wa.me/${phone}?text=${getWhatsAppGreeting(message)}`;
};

