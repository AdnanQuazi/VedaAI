import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuestionConfig {
  type: string;
  count: number;
  marks: number;
}

interface CreateAssignmentState {
  dueDate: string;

  instructions: string;

  questionConfigs: QuestionConfig[];

  currentStep: number;

  assignmentId: string | null;

  generationStatus: string;

  progress: number;
}

const initialState: CreateAssignmentState = {
  dueDate: "",

  instructions: "",

  questionConfigs: [],

  currentStep: 1,

  assignmentId: null,

  generationStatus: "idle",

  progress: 0,
};

const createAssignmentSlice = createSlice({
  name: "createAssignment",
  initialState,

  reducers: {
    setDueDate: (state, action) => {
      state.dueDate = action.payload;
    },

    setInstructions: (state, action) => {
      state.instructions = action.payload;
    },

    addQuestionConfig: (state, action) => {
      state.questionConfigs.push(action.payload);
    },

    updateQuestionConfig: (
      state,
      action: PayloadAction<{
        index: number;
        data: QuestionConfig;
      }>
    ) => {
      state.questionConfigs[action.payload.index] =
        action.payload.data;
    },

    removeQuestionConfig: (state, action) => {
      state.questionConfigs.splice(action.payload, 1);
    },

    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },

    setAssignmentId: (state, action) => {
      state.assignmentId = action.payload;
    },

    setGenerationStatus: (state, action) => {
      state.generationStatus = action.payload;
    },

    setProgress: (state, action) => {
      state.progress = action.payload;
    },

    resetAssignmentCreation: () => initialState,
  },
});

export const {
  setDueDate,
  setInstructions,
  addQuestionConfig,
  updateQuestionConfig,
  removeQuestionConfig,
  setCurrentStep,
  setAssignmentId,
  setGenerationStatus,
  setProgress,
  resetAssignmentCreation,
} = createAssignmentSlice.actions;

export default createAssignmentSlice.reducer;