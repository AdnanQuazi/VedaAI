import crypto from 'crypto';

export const generateSHA256 = (content: string) => {
  return crypto.createHash('sha256').update(content).digest('hex');
};
