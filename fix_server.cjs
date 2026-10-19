const fs = require('fs');

let code = fs.readFileSync('server/server.ts', 'utf8');

const oldHelmetCors = `// Security measures
app.use(helmet({
  contentSecurityPolicy: false, // Disabling CSP for Vite HMR and iframes in dev/studio mode
  crossOriginEmbedderPolicy: false,
}));
app.use(cors());`;

const newHelmetCors = `// Security measures
app.use(helmet({
  contentSecurityPolicy: false, // Disabling CSP for Vite HMR and iframes in dev/studio mode
  crossOriginEmbedderPolicy: false,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  frameguard: { action: "sameorigin" }
}));

// Permissions-Policy middleware
app.use((req, res, next) => {
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

// Strict CORS Configuration
const allowedOrigins = [
  "https://ayaelektrik.com",
  "https://www.ayaelektrik.com",
  "http://localhost:3000",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.run.app') || origin.endsWith('.netlify.app') || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation: Origin not allowed.'));
    }
  },
  credentials: true,
}));`;

code = code.replace(oldHelmetCors, newHelmetCors);

fs.writeFileSync('server/server.ts', code);
