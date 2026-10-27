const fs = require('fs');
let code = fs.readFileSync('firestore.rules', 'utf8');
code = code.replace('match /metrics/{document} {\n      allow read, write: if true;\n    }', 'match /metrics/{document} {\n      allow read: if true;\n      allow write: if request.auth != null;\n    }');
fs.writeFileSync('firestore.rules', code);
