import { z } from 'zod';

const QuestionSchema = z.object({
  question: z.string(),
  questionType: z.enum(['mcq', 'short', 'diagram', 'numerical', 'long']),
  marks: z.number(),
  difficulty: z.enum(['easy', 'moderate', 'hard']),
  answerKey: z.string(),
  options: z.array(z.string()).optional(),
});

const SectionSchema = z.object({
  title: z.string(),
  instructions: z.string(),
  type: z.enum([
    'Multiple Choice Questions',
    'Short Answer Questions',
    'Diagram',
    'Numericals',
    'Long Answer Questions',
  ]),
  questions: z.array(QuestionSchema),
});

export const QuestionPaperSchema = z.object({
  subject: z.string(),
  class: z.string(),
  timeAllotted: z.string(),
  maximumMarks: z.number(),
  sections: z.array(SectionSchema),
});
