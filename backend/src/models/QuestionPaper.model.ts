import { Schema, model, type InferSchemaType } from 'mongoose';

const QuestionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    questionType: {
      type: String,
      required: true,
      enum: ['mcq', 'short', 'diagram', 'numerical', 'long'],
    },
    marks: {
      type: Number,
      required: true,
      min: 1,
    },

    difficulty: {
      type: String,
      enum: ['easy', 'moderate', 'hard'],
      required: true,
    },
    answerKey: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      default: undefined, // important to differentiate between no options and empty options
    },
  },
  { _id: false },
);

const SectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    instructions: {
      type: String,
      default: '',
    },

    type: {
      type: String,
      required: true,
      enum: [
        'Multiple Choice Questions',
        'Short Answer Questions',
        'Diagram',
        'Numericals',
        'Long Answer Questions',
      ],
    },

    questions: {
      type: [QuestionSchema],
      default: [],
    },
  },
  { _id: false },
);

const QuestionPaperSchema = new Schema(
  {
    assignmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Assignment',
      required: true,
      index: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    class: {
      type: String,
      required: true,
      trim: true,
    },
    timeAllotted: {
      type: String,
      required: true,
    },
    maximumMarks: {
      type: Number,
      required: true,
      min: 1,
    },
    sections: {
      type: [SectionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export type QuestionPaperDocument = InferSchemaType<typeof QuestionPaperSchema>;

export const QuestionPaper = model('QuestionPaper', QuestionPaperSchema);
