const fs = require('fs');
let lines = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8').split('\n');
console.log(lines.slice(2644, 2812).join('\n'));
