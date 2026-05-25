import { Worker } from 'bullmq';
import { redisConnection } from '../config/redis';
import { generateQuestionPaperPDF } from '../services/pdf.service';

export const pdfWorker = new Worker(
  'pdf-queue',
  async (job) => {
    const { assignmentId } = job.data;
    console.log(`Generating PDF for ${assignmentId}`);
    const pdfPath = await generateQuestionPaperPDF(assignmentId);
    return {
      pdfPath,
    };
  },
  {
    connection: redisConnection,
  },
);
