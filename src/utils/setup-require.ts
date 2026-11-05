import { createRequire } from 'module';

// Inject global require for ES Module compatibility with buggy third-party plugins
if (typeof globalThis.require === 'undefined') {
  globalThis.require = createRequire(import.meta.url);
}
