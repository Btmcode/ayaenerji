const fs = require('fs');

let code = fs.readFileSync('src/components/Hero.tsx', 'utf8');
code = code.replace('alt="Elektrik Ustası Hizmeti"', 'alt="İstanbul acil elektrik servisi ve uzman elektrik ustası"');
fs.writeFileSync('src/components/Hero.tsx', code);
