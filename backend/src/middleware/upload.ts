import multer from 'multer';

import path from 'path';

import fs from 'fs';

import { AppError } from '../utils/AppError';

const uploadPath = path.join(process.cwd(), '/tmp');

// create uploads folder if missing
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadPath);
  },

  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;

    cb(null, uniqueName);
  },
});

export const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (_req, file, cb) => {
    const allowed = ['application/pdf', 'text/plain'];

    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new AppError(
          'Only PDF and TXT files allowed',
          400,
          'INVALID_FILE_TYPE',
        ),
      );
    }
  },
});
