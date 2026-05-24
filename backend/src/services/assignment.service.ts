import { Assignment } from "../models/Assignment.model";

import { assignmentQueue } from "../queues/assignment.queue";

export const createAssignment = async (input: any) => {
  const assignment = await Assignment.create({
    userId: input.userId,
    dueDate: input.dueDate,
    questionConfigs: input.questionConfigs,
    instructions: input.instructions,
    status: "pending",
    fileName: input.file?.originalname,
    fileType: input.file?.mimetype,
    fileSize: input.file?.size,
  });

  await assignmentQueue.add("generate-question-paper", {
    assignmentId: assignment._id,
  });

  return assignment;
};
