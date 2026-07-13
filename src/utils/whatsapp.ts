export const getWhatsAppGreeting = () => {
  const currentHour = new Date().getHours();
  // Mesai saatleri dışı (18:00 - 08:00)
  const isOutOfHours = currentHour >= 18 || currentHour < 8;

  if (isOutOfHours) {
    return encodeURIComponent(
      "Merhaba, şu an mesai saatleri dışındayız ancak acil nöbetçi ustamız aktif. Adresinizi ve şikayetinizi yazarsanız hemen yönlendirme yapabiliriz. Size nasıl yardımcı olabiliriz?",
    );
  } else {
    return encodeURIComponent(
      "Merhaba, web sitenizden ulaşıyorum. Size bir elektrik arızası/sorusu hakkında danışmak istiyorum.",
    );
  }
};

export const getWhatsAppLink = (phoneNumber: string = "905300695393") => {
  return `https://wa.me/${phoneNumber}?text=${getWhatsAppGreeting()}`;
};
