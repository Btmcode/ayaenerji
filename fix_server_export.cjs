const fs = require('fs');
let code = fs.readFileSync('server/server.ts', 'utf8');

// Replace app.listen with an export for serverless environments
code = code.replace(
  /app\.listen\(PORT, "0\.0\.0\.0", \(\) => {[\s\S]*?}\);/g,
  `if (process.env.NODE_ENV !== "production" || process.env.VERCEL !== "1") {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(\`Server running on http://localhost:\${PORT}\`);
    });
  }`
);

// Add export default app at the end
if (!code.includes('export default app;')) {
  code += '\n\nexport default app;';
}

fs.writeFileSync('server/server.ts', code);
