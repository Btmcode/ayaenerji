const fs = require('fs');
let lines = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8').split('\n');
const block = lines.slice(2644, 2812).join('\n');
const matches = block.match(/\b([a-zA-Z]\w*)\b/g) || [];
console.log([...new Set(matches)].filter(w => w.startsWith('set') || w.startsWith('is') || w.includes('customers') || w.includes('customer')).join(', '));
