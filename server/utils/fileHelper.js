import fs from "fs";
import sharp from "sharp";
import path from "path";

/**
 * 🧩 Ensure a directory exists, create it recursively if missing
 */
export function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export async function compressToWebp(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);

    setTimeout(() => {
      try {
        if (fs.existsSync(inputPath)) {
          fs.unlinkSync(inputPath);
          console.log("🧹 Temp file deleted:", inputPath);
        }
      } catch (err) {
        console.warn("⚠️ Failed to delete temp file:", inputPath, err.message);
      }
    }, 200);
  } catch (err) {
    console.error("❌ Image compression failed:", err.message);
    throw err;
  }
}
