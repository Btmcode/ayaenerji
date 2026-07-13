const fs = require('fs');

let content = fs.readFileSync('src/pages/admin/DashboardTab.tsx', 'utf8');

content = content.replace(
  /Şişli bölgesi için "Aydınlatma Tesisatı" kelimesinde rakip analizi tamamlandı\. %45 aranma hacmi artışı var\./g,
  'Şu an için yeni bir SEO eksikliği bulunmuyor.'
);

content = content.replace(
  /\{ title: "Toplam Ciro", value: "₺14,500", trend: "\+12\.5%",/g,
  '{ title: "Toplam Ciro", value: "₺0", trend: "0%",'
);

content = content.replace(
  /\{ title: "Müşteri Memnuniyeti", value: "%98", trend: "\+2\.1%",/g,
  '{ title: "Müşteri Memnuniyeti", value: "%0", trend: "0%",'
);

content = content.replace(
  /<p className="text-slate-400 text-sm font-medium">Recharts Grafik Alanı<\/p>/g,
  '<p className="text-slate-400 text-sm font-medium">Henüz yeterli veri bulunmuyor</p>'
);

fs.writeFileSync('src/pages/admin/DashboardTab.tsx', content);
