import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import fs from 'fs';

const rawConfig = fs.readFileSync('firebase-applet-config.json', 'utf8');
const config = JSON.parse(rawConfig);
const app = initializeApp(config);
const db = getFirestore(app);

async function clean() {
  const collections = ['metrics', 'requests', 'customers', 'blogPosts', 'abTests', 'admins', 'jobApplications', 'callLogs', 'settings'];
  for (const coll of collections) {
    const querySnapshot = await getDocs(collection(db, coll));
    console.log(`Collection ${coll} has ${querySnapshot.size} documents.`);
    for (const d of querySnapshot.docs) {
       // console.log(`Deleting ${d.id} from ${coll}`);
       await deleteDoc(doc(db, coll, d.id));
    }
    console.log(`Deleted all from ${coll}`);
  }
}

clean().then(() => {
  console.log("Done");
  process.exit(0);
}).catch(console.error);
