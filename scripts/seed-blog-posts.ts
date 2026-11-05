import { initializeApp } from "firebase/app";
import { initializeFirestore, doc, setDoc } from "firebase/firestore";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
  projectId: "gen-lang-client-0062360053",
  appId: "1:1004691769732:web:d5cf605f91505e7386b5d1",
  apiKey: "AIzaSyBLU55_hAavxPHFGP1JDpQ2fPvz2cTcfuU",
  authDomain: "gen-lang-client-0062360053.firebaseapp.com",
  storageBucket: "gen-lang-client-0062360053.firebasestorage.app",
  messagingSenderId: "1004691769732",
};

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {}, "ai-studio-b9ed5426-9b4a-4332-ab4c-44d590908c48");

// Parse src/data/blogPosts.ts cleanly without node ESM jpg loader issue
const blogSource = fs.readFileSync(path.resolve(process.cwd(), "src/data/blogPosts.ts"), "utf-8");

// Extract posts via regex or evaluate safely
const match = blogSource.match(/export const blogPosts: BlogPost\[\] = (\[[\s\S]*\]);/);
if (!match) {
  console.error("Could not find blogPosts array in src/data/blogPosts.ts");
  process.exit(1);
}

// Replace image variables with strings
let rawArrayCode = match[1]
  .replace(/imageUrl:\s*burnedSocketImg/g, 'imageUrl: "/images/blog/burned_electrical_socket.jpg"')
  .replace(/imageUrl:\s*rcdBreakerImg/g, 'imageUrl: "/images/blog/aya_rcd_breaker.jpg"')
  .replace(/imageUrl:\s*nightImg/g, 'imageUrl: "/images/blog/aya_night_electrician.jpg"')
  .replace(/imageUrl:\s*panelRenovateImg/g, 'imageUrl: "/images/blog/aya_panel_renovate.jpg"')
  .replace(/imageUrl:\s*waterHeaterImg/g, 'imageUrl: "/images/blog/aya_water_heater.jpg"')
  .replace(/imageUrl:\s*commercialTrifazeImg/g, 'imageUrl: "/images/blog/aya_commercial_trifaze.jpg"')
  .replace(/imageUrl:\s*evImg/g, 'imageUrl: "/images/blog/aya_ev_charging.jpg"')
  .replace(/imageUrl:\s*lightingImg/g, 'imageUrl: "/images/blog/aya_lighting_lux.jpg"')
  .replace(/imageUrl:\s*groundingTestImg/g, 'imageUrl: "/images/blog/aya_grounding_test.jpg"')
  .replace(/imageUrl:\s*compensationPanelImg/g, 'imageUrl: "/images/blog/aya_compensation_panel.jpg"')
  .replace(/imageUrl:\s*acWiringImg/g, 'imageUrl: "/images/blog/aya_ac_wiring.jpg"')
  .replace(/imageUrl:\s*kitchenRenovationImg/g, 'imageUrl: "/images/blog/aya_kitchen_renovation.jpg"');

const posts = eval(rawArrayCode);

async function seed() {
  console.log("=== SEEDING BLOG POSTS TO FIRESTORE ===");
  console.log(`Target database: ai-studio-b9ed5426-9b4a-4332-ab4c-44d590908c48`);
  console.log(`Total posts to sync: ${posts.length}`);

  let successCount = 0;
  for (const post of posts) {
    try {
      const docRef = doc(db, "blogPosts", post.slug);
      await setDoc(docRef, {
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        date: post.date,
        readTime: post.readTime,
        image: post.imageUrl,
        imageUrl: post.imageUrl,
        views: post.views || 500,
        tags: post.tags || ["Aya Elektrik", "Elektrikçi"],
        status: "Yayında",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }, { merge: true });
      console.log(`[OK] Saved to Firestore: ${post.title.substring(0, 50)}...`);
      successCount++;
    } catch (err: any) {
      console.error(`[FAIL] Error saving ${post.slug}:`, err.message);
    }
  }

  console.log(`=== COMPLETED: ${successCount} / ${posts.length} posts saved to Firestore. ===`);
  process.exit(0);
}

seed().catch((e) => {
  console.error("Fatal seed error:", e);
  process.exit(1);
});
