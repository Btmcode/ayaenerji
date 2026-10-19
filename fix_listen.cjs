const fs = require('fs');
let code = fs.readFileSync('server/server.ts', 'utf8');

code = code.replace(
  /if \(process\.env\.NODE_ENV !== "production" \|\| process\.env\.VERCEL !== "1"\) \{/g,
  `if (process.env.VERCEL !== "1") {`
);

fs.writeFileSync('server/server.ts', code);
