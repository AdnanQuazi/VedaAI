import { emitAssignmentStatus } from './socketEvents';

export const updateJobProgress = async ({
  job,
  assignmentId,
  status,
  progress,
}: {
  job: any;
  assignmentId: string;
  status: string;
  progress: number;
}) => {
  await job.updateProgress(progress);
  emitAssignmentStatus({
    assignmentId,
    status,
    progress,
  });
};
