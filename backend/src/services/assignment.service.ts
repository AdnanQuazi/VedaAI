import { Assignment } from '../models/Assignment.model';
import { QuestionPaper } from '../models/QuestionPaper.model';

import { assignmentQueue } from '../queues/assignment.queue';
import { getIO } from '../socket';
import { AppError } from '../utils/AppError';

interface RegenerateAssignmentInput {
  assignmentId: string;
  userId: string;
}

interface GetAssignmentInput {
  assignmentId: string;
  userId: string;
}

export const createAssignment = async (input: any) => {
  const assignment = await Assignment.create({
    userId: input.userId,
    dueDate: input.dueDate,
    questionConfigs: input.questionConfigs,
    instructions: input.instructions,
    status: 'pending',
    fileName: input.file?.originalname,
    fileType: input.file?.mimetype,
    fileSize: input.file?.size,
    filePath: input.file?.path,
  });

  await assignmentQueue.add('generate-question-paper', {
    assignmentId: assignment._id,
  });

  return assignment;
};


export const regenerateAssignment = async (
  input: RegenerateAssignmentInput,
) => {
  const assignment = await Assignment.findById(input.assignmentId);

  if (!assignment) {
    throw new AppError('Assignment not found', 404, 'NOT_FOUND');
  }

  if (assignment.userId.toString() !== input.userId) {
    throw new AppError('Unauthorized', 403, 'FORBIDDEN');
  }

  assignment.status = 'processing';

  await assignment.save();

  await QuestionPaper.deleteOne({
    assignmentId: assignment._id,
  });

  getIO().to(assignment._id.toString()).emit('assignment-status', {
    assignmentId: assignment._id,
    status: 'processing',
  });

  await assignmentQueue.add('generate-question-paper', {
    assignmentId: assignment._id,
  });

  return {
    assignmentId: assignment._id,
    status: 'processing',
  };
};


export const getAssignment = async (input: GetAssignmentInput) => {
  const assignment = await Assignment.findById(input.assignmentId).lean();

  if (!assignment) {
    throw new AppError('Assignment not found', 404, 'NOT_FOUND');
  }

  if (assignment.userId.toString() !== input.userId) {
    throw new AppError('Unauthorized', 403, 'FORBIDDEN');
  }

  const questionPaper = await QuestionPaper.findOne({
    assignmentId: assignment._id,
  }).lean();

  return {
    assignment,

    questionPaper,
  };
};
