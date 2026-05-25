import fs from 'fs/promises';
import { Worker } from 'bullmq';
import { redisConnection } from '../config/redis';
import { Assignment } from '../models/Assignment.model';
import { QuestionPaper } from '../models/QuestionPaper.model';
import { extractTextFromFile } from '../services/fileExtraction.service';
import { generateQuestionPaper } from '../services/questionGeneration.service';
import { AppError } from '../utils/AppError';
import { generateSHA256 } from '../utils/hash';
import { updateJobProgress } from '../utils/updateJobProgress';
import { emitAssignmentStatus } from '../utils/socketEvents';

export const assignmentWorker = new Worker(
  'assignment-queue',
  async (job) => {
    const { assignmentId } = job.data;

    console.log(`Processing assignment: ${assignmentId}`);

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      throw new AppError('Assignment not found', 404, 'NOT_FOUND');
    }

    try {
      assignment.status = 'processing';

      await assignment.save();

      await updateJobProgress({
        job,
        assignmentId,
        status: 'processing',
        progress: 10,
      });

      if (assignment.filePath && assignment.fileType) {
        await updateJobProgress({
          job,
          assignmentId,
          status: 'reading_file',
          progress: 25,
        });

        const extractedText = await extractTextFromFile(
          assignment.filePath,
          assignment.fileType,
        );

        assignment.extractedText = extractedText;

        assignment.fileHash = generateSHA256(extractedText);

        await assignment.save();

        try {
          await fs.unlink(assignment.filePath);
        } catch (cleanupError) {
          console.error('Failed to delete temp file:', cleanupError);
        }
      }

      if (assignment.filePath && assignment.fileType && !assignment.extractedText) {
        throw new AppError('No extracted text found', 400, 'NO_TEXT_FOUND');
      }

      await updateJobProgress({
        job,
        assignmentId,
        status: 'generating_questions',
        progress: 55,
      });

      const generatedPaper = await generateQuestionPaper({
        extractedText: assignment.extractedText,
        questionConfigs: assignment.questionConfigs,
        instructions: assignment.instructions,
      });

      await updateJobProgress({
        job,
        assignmentId,
        status: 'saving_question_paper',
        progress: 80,
      });

      await QuestionPaper.deleteOne({
        assignmentId,
      });

      await QuestionPaper.create({
        assignmentId,
        class: generatedPaper.class,
        subject: generatedPaper.subject,
        timeAllotted: generatedPaper.timeAllotted,
        maximumMarks: generatedPaper.maximumMarks,
        sections: generatedPaper.sections,
      });

      assignment.status = 'completed';

      await assignment.save();

      await updateJobProgress({
        job,
        assignmentId,
        status: 'completed',
        progress: 100,
      });

      console.log(`Assignment ${assignmentId} completed`);

      return {
        success: true,
        assignmentId,
      };
    } catch (error) {
      assignment.status = 'failed';

      await assignment.save();

      emitAssignmentStatus({
        assignmentId,
        status: 'failed',
        progress: 0,
        message: error instanceof Error ? error.message : 'Unknown error',
      });

      console.error(`Assignment ${assignmentId} failed`);
      console.error(error);
      throw error;
    }
  },

  {
    connection: redisConnection,
    concurrency: 5,
  },
);

assignmentWorker.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

assignmentWorker.on('failed', async (job, error) => {
  console.error(`Job ${job?.id} failed`);
  console.error(error);

  if (!job) return;

  const assignmentId = job.data.assignmentId;

  const maxAttempts = job.opts.attempts || 1;

  const isFinalFailure = job.attemptsMade >= maxAttempts;

  emitAssignmentStatus({
    assignmentId,
    status: 'retrying',
    progress: 0,
    message: `Retrying generation (${job.attemptsMade}/${maxAttempts})`,
  });
});
