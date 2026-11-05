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
    title: "Kurucu & Kıdemli Elektrik Teknisyeni (1. Sınıf Fen Adamı)",
    role: "Başteknisyen & Tesisat Danışmanı",
    credentials: "MYK Seviye 5 · EKAT Yüksek Gerilim & Tesisat Belgesi",
    emoNumber: "Yetki No: 34-4892",
    university: "Elektrik Teknik Programı & Saha İhtisası",
    experienceYears: 18,
    bio: "18 yılı aşkın süredir konut ve ticari binalarda elektrik arıza onarımı, dağıtım panoları revizyonu, kaçak akım koruma ve kablo altyapı yenileme alanlarında saha liderliği yapmaktadır.",
    avatarText: "AÇ",
    specialties: [
      "Acil Arıza Tespiti & Sigorta Değişimi",
      "Elektrik İç Tesisleri ve Pano Revizyonu",
      "Kaçak Akım Rölesi & Topraklama Ölçümü",
      "Elektrik Yangın Güvenliği Denetimi"
    ]
  },
  "engin-yilmaz": {
    id: "engin-yilmaz",
    name: "Engin YILMAZ",
    title: "Elektrik Teknikeri & Altyapı Uzmanı",
    role: "Teknik Editör & Standart Doğrulayıcı",
    credentials: "TSE Yangın Koruma & Tesisat Denetim Sertifikası",
    emoNumber: "Sertifika No: 34-5310",
    university: "Teknik Bilimler Elektrik Bölümü",
    experienceYears: 12,
    bio: "Elektrikli araç (EV) şarj altyapıları, kablo kesit hesapları ve bina elektrik güvenlik testleri konularında uzmanlaşmıştır. IEC 61851 ve TSE standartlarının sahada eksiksiz uygulanmasını denetlemektedir.",
    avatarText: "EY",
    specialties: [
      "Elektrikli Araç Wallbox Altyapısı",
      "Kablo Kesit & Güç Hesaplamaları",
      "Topraklama Ölçümü ve Paratoner",
      "Kaçak Akım & Şebeke Güvenliği"
    ]
  },
  "mustafa-kaya": {
    id: "mustafa-kaya",
    name: "Mustafa KAYA",
    title: "TSE Yetkili Elektrik Fen Adamı (1. Sınıf)",
    role: "Saha Operasyon ve Uygulama Şefi",
    credentials: "MYK Seviye 5 · EKAT Belgeli Başteknisyen",
    emoNumber: "Fen Adamı No: 34-8841",
    university: "Marmara Üniversitesi Teknik Bilimler MYO",
    experienceYears: 15,
    bio: "İstanbul genelinde 15 yılı aşkın süredir 7/24 acil arıza müdahalesi, bina sayaç panoları yenileme, şofben ve klima bağımsız linye hatları kurulumunda yüzlerce başarılı saha operasyonuna liderlik etmiştir.",
    avatarText: "MK",
    specialties: [
      "7/24 Acil Arıza ve Kısa Devre Tespiti",
      "Monofaze / Trifaze Sayaç Panoları",
      "Bina Zayıf Akım ve Diafon Sistemleri",
      "Termal Kamera ile Isınma Taraması"
    ]
  }
};

export const defaultAuthor = technicalAuthors["ahmet-cagoglu"];
export const defaultReviewer = technicalAuthors["engin-yilmaz"];
