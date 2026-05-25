interface PromptInput {
  extractedText: string;

  questionConfigs: {
    type: string;
    count: number;
    marks: number;
  }[];

  instructions?: string;
}

export const buildQuestionPrompt = (input: PromptInput) => {
  return `
QUESTION REQUIREMENTS:
${JSON.stringify(input.questionConfigs, null, 2)}

TEACHER INSTRUCTIONS:
${input.instructions || 'None'}

STUDY MATERIAL:
${input.extractedText}
`;
};
