import { QueueEvents } from 'bullmq';

import { redisConnection } from '../config/redis';

export const pdfQueueEvents = new QueueEvents('pdf-queue', {
  connection: redisConnection,
});
