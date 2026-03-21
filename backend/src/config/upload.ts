import multer from "multer";
import path from "path";
import fs from "fs";
import { env } from "./env";

const uploadPath = path.resolve(process.cwd(), env.uploadDir);

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

export const upload = multer({
  storage: multer.diskStorage({
    destination: (_request, _file, callback) => {
      callback(null, uploadPath);
    },
    filename: (_request, file, callback) => {
      const safeName = file.originalname.replace(/\s+/g, "-");
      callback(null, `${Date.now()}-${safeName}`);
    },
  }),
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
});