import { Assignment } from '../models/Assignment.model';
import { QuestionPaper } from '../models/QuestionPaper.model';
import { assignmentQueue } from '../queues/assignment.queue';
import { AppError } from '../utils/AppError';

export const regenerateAssignment = async (assignmentId: string) => {

  const assignment = await Assignment.findById(assignmentId);

  if (!assignment) {
    throw new AppError('Assignment not found', 404, 'NOT_FOUND');
  }

  assignment.status = 'processing';

  await assignment.save();

  await QuestionPaper.deleteOne({
    assignmentId,
  });

  await assignmentQueue.add('generate-question-paper', {
    assignmentId,
  });

  return assignment;
};
