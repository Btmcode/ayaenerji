const fs = require('fs');
let lines = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8').split('\n');
const block = lines.slice(2375, 2727).join('\n');
const matches = block.match(/\b([a-zA-Z]\w*)\b/g) || [];
console.log([...new Set(matches)].filter(w => w.startsWith('set') || w.startsWith('is') || w.includes('prompt') || w.includes('Prompt') || w.includes('generate') || w.includes('Generate') || w.includes('Content') || w.includes('content') || w.includes('copied') || w.includes('Copied')).join(', '));
