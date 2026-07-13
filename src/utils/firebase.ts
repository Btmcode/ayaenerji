import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  projectId: "gen-lang-client-0062360053",
  appId: "1:1004691769732:web:d5cf605f91505e7386b5d1",
  apiKey: "AIzaSyBLU55_hAavxPHFGP1JDpQ2fPvz2cTcfuU",
  authDomain: "gen-lang-client-0062360053.firebaseapp.com",
  storageBucket: "gen-lang-client-0062360053.firebasestorage.app",
  messagingSenderId: "1004691769732",
};

export const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
}, "ai-studio-b9ed5426-9b4a-4332-ab4c-44d590908c48");

export const auth = getAuth(app);
