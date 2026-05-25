import { ZodError } from 'zod';
import { geminiModel } from '../config/gemini';
import { SYSTEM_PROMPT } from '../prompts/systemPrompt';
import { buildQuestionPrompt } from '../prompts/buildQuestionPrompt';
import { QuestionPaperSchema } from '../validators/questionPaper.validator';

interface GenerateQuestionsInput {
  extractedText: string;
  questionConfigs: {
    type: string;
    count: number;
    marks: number;
  }[];
  instructions?: string;
}

const MAX_RETRIES = 3;

const buildValidationFeedback = (error: ZodError) => {
  return error.issues
    .map((issue) => {
      const path = issue.path.join('.');

      return `- ${path}: ${issue.message}`;
    })
    .join('\n');
};

export const generateQuestionPaper = async (input: GenerateQuestionsInput) => {
  let validationFeedback = '';

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const basePrompt = buildQuestionPrompt(input);

      const retryPrompt = validationFeedback
        ? `

        Your previous JSON output was invalid.

        Validation errors:
        ${validationFeedback}

        Fix all validation issues.

        Return ONLY valid JSON.
        `
        : '';

      const finalPrompt = `
        ${basePrompt}

        ${retryPrompt}
        `;

      const result = await geminiModel.generateContent({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: finalPrompt,
              },
            ],
          },
        ],
        systemInstruction: SYSTEM_PROMPT,
        generationConfig: {
          temperature: attempt > 1 ? 0.2 : 0.7,
        },
      });


      const responseText = result.response.text();

      console.log(`Generation attempt ${attempt}`);

      console.log(
        'Cached tokens:',
        result.response.usageMetadata?.cachedContentTokenCount || 0,
      );

      const cleaned = responseText
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      const parsed = JSON.parse(cleaned);

      const validated = QuestionPaperSchema.parse(parsed);

      console.log(`Question paper validated successfully on attempt ${attempt}`);

      return validated;
    } catch (error) {
  
      if (error instanceof SyntaxError) {
        console.error(`Invalid JSON on attempt ${attempt}`);

        validationFeedback = `
        The response was not valid JSON.

        Return ONLY valid JSON.

        Do not include markdown code blocks.
        `;

        if (attempt === MAX_RETRIES) {
          throw new Error('Failed to generate valid JSON response');
        }

        continue;
      }

      if (error instanceof ZodError) {
        console.error(`Validation failed on attempt ${attempt}`);

        validationFeedback = buildValidationFeedback(error);

        console.log(validationFeedback);

        if (attempt === MAX_RETRIES) {
          throw new Error(
            'Failed to generate valid question paper after retries',
          );
        }

        continue;
      }

      throw error;
    }
  }

  throw new Error('Question paper generation failed');
};
