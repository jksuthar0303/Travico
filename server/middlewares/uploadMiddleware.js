import multer from "multer";
import path from "path";
import fs from "fs";

const tempDir = path.join(process.cwd(), "uploads", "temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir); 
  },
  filename: (req, file, cb) => {
    const uniqueName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) cb(null, true);
  else cb("Images only!");
}

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => checkFileType(file, cb),
});

export const uploadPlaceImages = upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "photos", maxCount: 10 },
]);

export const uploadUserProfile = upload.single("profilePic");

export default upload;
