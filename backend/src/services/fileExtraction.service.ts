import fs from 'fs';

import { AppError } from '../utils/AppError';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require('pdf-parse');

export const extractTextFromFile = async (
  filePath: string,
  mimeType: string,
) => {
  if (!fs.existsSync(filePath)) {
    throw new AppError('Uploaded file not found', 404, 'FILE_NOT_FOUND');
  }

  const fileBuffer = fs.readFileSync(filePath);

  // PDF
  if (mimeType === 'application/pdf') {
    const data = await pdfParse(fileBuffer);

    return data.text;
  }

  // TXT
  if (mimeType === 'text/plain') {
    return fileBuffer.toString('utf-8');
  }

  throw new AppError('Unsupported file type', 400, 'INVALID_FILE_TYPE');
};
