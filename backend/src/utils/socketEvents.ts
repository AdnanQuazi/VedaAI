import { getIO } from '../socket';

interface AssignmentStatusPayload {
  assignmentId: string;
  status: string;
  progress?: number;
  message?: string;
}

export const emitAssignmentStatus = ({
  assignmentId,
  status,
  progress,
  message,
}: AssignmentStatusPayload) => {
  getIO().to(assignmentId).emit('assignment-status', {
    assignmentId,
    status,
    progress,
    message,
  });
};
