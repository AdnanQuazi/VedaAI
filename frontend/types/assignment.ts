export interface QuestionConfig {
  type:
    | "mcq"
    | "short"
    | "diagram"
    | "numerical"
    | "long";

  count: number;

  marks: number;
}

export interface Assignment {
  _id: string;

  userId: string;

  dueDate: string;

  questionConfigs: QuestionConfig[];

  instructions: string;

  status:
    | "pending"
    | "processing"
    | "completed"
    | "failed";

  fileName?: string;

  fileType?: string;

  fileSize?: number;

  createdAt: string;

  updatedAt: string;
}

export type QuestionType =
  | "mcq"
  | "short"
  | "diagram"
  | "numerical"
  | "long";

export type Difficulty =
  | "easy"
  | "moderate"
  | "hard";

export interface Question {
  question: string;
  questionType: QuestionType;
  marks: number;
  difficulty: Difficulty;
  answerKey: string;
  options?: string[];
}

export interface Section {
  title: string;
  instructions?: string;
  type: string;
  questions: Question[];
}

export interface QuestionPaper {
  assignmentId: string;
  subject: string;
  class: string;
  timeAllotted: string;
  maximumMarks: number;
  sections: Section[];
}

export interface AssignmentDetailResponse {
  assignment: Assignment;
  questionPaper?: QuestionPaper | null;
}