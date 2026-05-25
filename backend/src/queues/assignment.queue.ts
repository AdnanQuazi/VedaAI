import { Queue } from 'bullmq';

import { redisConnection } from '../config/redis';

export const assignmentQueue = new Queue('assignment-queue', {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: 50,
    removeOnFail: 20,
  },
});
