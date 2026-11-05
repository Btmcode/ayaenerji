const fs = require('fs');
let code = fs.readFileSync('src/utils/crypto.ts', 'utf8');

code = code.replace(
  'const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY || "aya_elektrik_secure_key_2026";',
  `const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

if (!SECRET_KEY) {
  console.warn("VITE_ENCRYPTION_KEY is missing! Using an insecure fallback for local storage. Please set this in your environment variables.");
}

// Fallback is purely to prevent app crashes if env var is missing during preview/development
const ACTIVE_KEY = SECRET_KEY || "INSECURE_DEV_FALLBACK_KEY";`
);

code = code.replace(/SECRET_KEY/g, 'ACTIVE_KEY').replace('const ACTIVE_KEY = ACTIVE_KEY', 'const ACTIVE_KEY = SECRET_KEY');

fs.writeFileSync('src/utils/crypto.ts', code);
