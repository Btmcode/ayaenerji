const fs = require('fs');

let code = fs.readFileSync('src/components/Testimonials.tsx', 'utf8');
code = code.replace('alt="Eski Tehlikeli Elektrik Panosu"', 'alt="İstanbul elektrik panosu yenileme öncesi eski pano"');
code = code.replace('alt="Yeni Düzenli Güvenli Elektrik Panosu"', 'alt="Elektrik panosu yenileme sonrası güvenli ve düzenli pano"');
fs.writeFileSync('src/components/Testimonials.tsx', code);
