import fs from 'fs';

import { Request, Response } from 'express';

import { pdfQueue } from '../queues/pdf.queue';
import { pdfQueueEvents } from '../queues/queueEvents';

export const downloadPDF = async (req: Request, res: Response) => {
  const { id } = req.params;

  const job = await pdfQueue.add('generate-pdf', {
    assignmentId: id,
  });

  const result = await job.waitUntilFinished(pdfQueueEvents);

  const pdfPath = result.pdfPath;

  res.download(pdfPath, `question-paper-${id}.pdf`, (err) => {

    fs.unlink(pdfPath, () => {});

    if (err) {
      console.error(err);
    }
  });
};
