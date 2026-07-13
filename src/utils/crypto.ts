import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

if (!SECRET_KEY) {
  console.warn("VITE_ENCRYPTION_KEY is missing! Using an insecure fallback for local storage. Please set this in your environment variables.");
}

const ACTIVE_KEY = SECRET_KEY || "INSECURE_DEV_FALLBACK_KEY";

export function encryptData(text: string): string {
  try {
    return CryptoJS.AES.encrypt(text, ACTIVE_KEY).toString();
  } catch (error) {
    return "";
  }
}

export function decryptData(ciphertext: string): string {
  if (!ciphertext) return "";
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, ACTIVE_KEY);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    
    if (!decryptedText) {
      return ciphertext;
    }
    return decryptedText;
  } catch (error) {
    return ciphertext;
  }
}
