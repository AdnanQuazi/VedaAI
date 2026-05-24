import { Schema, model, type InferSchemaType } from "mongoose";

const QuestionConfigSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["mcq", "short", "diagram", "numerical", "long"],
    },

    count: {
      type: Number,
      required: true,
      min: 1,
    },

    marks: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false },
);

const AssignmentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    questionConfigs: {
      type: [QuestionConfigSchema],
      required: true,
      validate: [
        (v: unknown[]) => v.length > 0,
        "At least one question type required",
      ],
    },

    instructions: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
      index: true,
    },

    // upload metadata
    fileName: {
      type: String,
      trim: true,
    },

    fileType: {
      type: String,
      trim: true,
    },

    fileSize: {
      type: Number,
      min: 0,
    },

    // SHA-256 hash for Redis caching
    fileHash: {
      type: String,
      index: true,
    },

    // cached extracted PDF/text content
    extractedText: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export type AssignmentDocument = InferSchemaType<typeof AssignmentSchema>;

export const Assignment = model("Assignment", AssignmentSchema);
