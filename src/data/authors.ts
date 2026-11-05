export interface Author {
  id: string;
  name: string;
  title: string;
  role: string;
  credentials: string;
  emoNumber: string;
  university: string;
  experienceYears: number;
  bio: string;
  avatarText: string;
  specialties: string[];
}

export const technicalAuthors: Record<string, Author> = {
  "ahmet-cagoglu": {
    id: "ahmet-cagoglu",
    name: "Ahmet ÇAĞOĞLU",
    title: "Kurucu & Elektrik Teknisyeni",
    role: "Başteknisyen & Saha Yöneticisi",
    credentials: "MYK Seviye 5 · Elektrik Tesisat & Bakım Belgesi",
    emoNumber: "Saha Yetki Kaydı",
    university: "Elektrik Teknik Alanı",
    experienceYears: 18,
    bio: "18 yılı aşkın süredir İstanbul genelinde konut ve ticari binalarda elektrik arıza onarımı, dağıtım panoları revizyonu, kaçak akım koruma ve kablo altyapı yenileme alanlarında saha liderliği yapmaktadır.",
    avatarText: "AÇ",
    specialties: [
      "Acil Arıza Tespiti & Sigorta Değişimi",
      "Elektrik İç Tesisleri ve Pano Revizyonu",
      "Kaçak Akım Rölesi & Topraklama Ölçümü",
      "Elektrik Yangın Güvenliği Denetimi"
    ]
  },
  "aya-teknik-ekip": {
    id: "aya-teknik-ekip",
    name: "Aya Elektrik Teknik Kurulu",
    title: "Saha Denetim ve Uygulama Ekibi",
    role: "Teknik Denetçi & Standart Doğrulayıcı",
    credentials: "TSE ve CE Standartları Denetim Güvencesi",
    emoNumber: "Aya Enerji Kurumsal Kalite Standartları",
    university: "Teknik Saha ve Mühendislik Uygulamaları",
    experienceYears: 15,
    bio: "Aya Elektrik bünyesindeki yetkili elektrik ustaları ve teknisyenlerden oluşan teknik inceleme kurulu; sitede yayınlanan rehberlerin ve saha uygulamalarının TSE ile uluslararası standartlara (HD 60364) uygunluğunu denetler.",
    avatarText: "AE",
    specialties: [
      "TSE Standartlarında Güvenli Tesisat",
      "7/24 Kesintisiz Nöbetçi Müdahale",
      "Pano, Sigorta ve Kaçak Akım Uyumu",
      "Mühendislik Hesaplama Doğrulamaları"
    ]
  }
};

export const defaultAuthor = technicalAuthors["ahmet-cagoglu"];
export const defaultReviewer = technicalAuthors["aya-teknik-ekip"];
