// Vercel Serverless Function entry point
const serverModule = require('../dist/server.cjs');

// Handle ES module default export compiled to CJS
const app = serverModule.default || serverModule;

module.exports = app;
