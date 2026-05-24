import multer from "multer";
import { AppError } from "../utils/AppError";

export const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (_req, file, cb) => {
    const allowed = ["application/pdf", "text/plain"];

    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new AppError("Only PDF and TXT files allowed", 400, "INVALID_FILE_TYPE")
      );
    }
  },
});
