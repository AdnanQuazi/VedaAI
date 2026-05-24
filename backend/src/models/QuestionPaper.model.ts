import { Schema, model, type InferSchemaType } from "mongoose";

const QuestionSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },

    marks: {
      type: Number,
      required: true,
      min: 1,
    },

    difficulty: {
      type: String,
      enum: ["easy", "moderate", "hard"],
      required: true,
    },
  },
  { _id: false }
);

const SectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    instructions: {
      type: String,
      default: "",
    },

    questions: {
      type: [QuestionSchema],
      default: [],
    },
  },
  { _id: false }
);

const QuestionPaperSchema = new Schema(
  {
    assignmentId: {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
      index: true,
    },

    sections: {
      type: [SectionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export type QuestionPaperDocument = InferSchemaType<typeof QuestionPaperSchema>;

export const QuestionPaper = model("QuestionPaper", QuestionPaperSchema);
