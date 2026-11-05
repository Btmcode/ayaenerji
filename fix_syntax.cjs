const fs = require('fs');
let code = fs.readFileSync('src/pages/admin/AramaKayitlariTab.tsx', 'utf-8');

// It's missing the ending `)}` for the `mockCalls.length === 0 ? (...) : (`
// Because I probably deleted both `)}`
