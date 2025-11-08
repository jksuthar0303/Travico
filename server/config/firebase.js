import admin from "firebase-admin";
import path from "path";
import { fileURLToPath } from "url";

// resolve current directory path (for ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// initialize firebase using service account file
const serviceAccountPath = path.join(__dirname, "firebase-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

console.log("✅ Firebase Admin initialized successfully!");

export default admin;
