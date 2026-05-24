import { Queue } from "bullmq";

import { redisConnection } from "../config/redis";

export const assignmentQueue = new Queue("assignment-queue", {
  connection: redisConnection,
});
