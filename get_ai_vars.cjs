const fs = require('fs');
let lines = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8').split('\n');
const block = lines.slice(2375, 2727).join('\n');
const matches = block.match(/\b([a-zA-Z]\w*)\b/g) || [];
console.log([...new Set(matches)].filter(w => w.startsWith('bulk') || w.includes('Gmb') || w.includes('Trend')).join(', '));
