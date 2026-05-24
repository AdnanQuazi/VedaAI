import { Worker } from "bullmq";

import { redisConnection } from "../config/redis";

import { Assignment } from "../models/Assignment.model";

export const assignmentWorker = new Worker(
  "assignment-queue",

  async (job) => {
    try {
      console.log("Processing Job:", job.id);

      const { assignmentId } = job.data;

      // fetch assignment
      const assignment = await Assignment.findById(assignmentId);

      if (!assignment) {
        throw new Error("Assignment not found");
      }

      assignment.status = "processing";

      await assignment.save();

      console.log(`Assignment ${assignmentId} processing`);

      // simulate AI
      await new Promise((resolve) => setTimeout(resolve, 5000));


      assignment.status = "completed";

      await assignment.save();

      console.log(`Assignment ${assignmentId} completed`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  {
    connection: redisConnection,
  }
);

assignmentWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

assignmentWorker.on("failed", async (job, err) => {
  console.log(`Job ${job?.id} failed`);

  console.error(err);

  if (!job) return;

  const assignmentId = job.data.assignmentId;

  await Assignment.findByIdAndUpdate(assignmentId, {
    status: "failed",
  });
});
