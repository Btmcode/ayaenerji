const fs = require('fs');
let lines = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8').split('\n');
const startIndex = lines.findIndex(l => l.includes('{activeTab === "Blog Yönetimi" && ('));
let nextTabIndex = -1;
for(let i = startIndex + 1; i < lines.length; i++) {
  if (lines[i].includes('{activeTab === ')) {
    nextTabIndex = i;
    break;
  }
}
const block = lines.slice(startIndex, nextTabIndex).join('\n');
// Match generic state usages
const matches = block.match(/\b(set[A-Z]\w+|is\w+|blog\w+)\b/g) || [];
const unique = [...new Set(matches)];
console.log("Used states:", unique.join(', '));
