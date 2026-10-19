import CryptoJS from "crypto-js";

// Secure encryption key for local storage credentials and sensitive state
const DEFAULT_KEY = "aya-elektrik-vault-aes-key-v1-2026";
const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY || DEFAULT_KEY;

export function encryptData(text: string): string {
  try {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  } catch (error) {
    return "";
  }
}

export function decryptData(ciphertext: string): string {
  if (!ciphertext) return "";
  try {
    // 1. Attempt decryption with active secret key
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    
    if (decryptedText) {
      return decryptedText;
    }
    
    // 2. Backward compatibility fallback for legacy dev key
    if (SECRET_KEY !== "INSECURE_DEV_FALLBACK_KEY") {
      const legacyBytes = CryptoJS.AES.decrypt(ciphertext, "INSECURE_DEV_FALLBACK_KEY");
      const legacyText = legacyBytes.toString(CryptoJS.enc.Utf8);
      if (legacyText) {
        return legacyText;
      }
    }

    return ciphertext;
  } catch (error) {
    return ciphertext;
  }
}
