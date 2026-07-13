const fs = require('fs');
let lines = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8').split('\n');
const startIndex = lines.findIndex(l => l.includes('{activeTab === "Arama Kayıtları" && ('));
let nextTabIndex = -1;
for(let i = startIndex + 1; i < lines.length; i++) {
  if (lines[i].includes('{activeTab === ')) {
    nextTabIndex = i;
    break;
  }
}
lines.splice(startIndex, nextTabIndex - startIndex, '          {activeTab === "Arama Kayıtları" && <AramaKayitlariTab />}');
fs.writeFileSync('src/pages/AdminPage.tsx', lines.join('\n'));
