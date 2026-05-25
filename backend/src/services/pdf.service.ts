import fs from 'fs';
import path from 'path';

import PDFDocument from 'pdfkit';

import { Assignment } from '../models/Assignment.model';
import {
  QuestionPaper,
  type QuestionPaperDocument,
} from '../models/QuestionPaper.model';

import { User } from '../models/User.model';

const PAGE_W = 595.28;
const PAGE_H = 841.89;

const ML = 56;
const MR = 56;
const MT = 50;
const MB = 50;

const CW = PAGE_W - ML - MR;

const tempDir = path.join(process.cwd(), 'temp-pdfs');

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

/**
 * Question Type Labels
 */
const questionTypeLabelMap = {
  mcq: 'Multiple Choice Questions',

  short: 'Short Answer Questions',

  diagram: 'Diagram Based Questions',

  numerical: 'Numerical Problems',

  long: 'Long Answer Questions',
} as const;

/**
 * Difficulty Labels
 */
const difficultyLabelMap = {
  easy: 'Easy',

  moderate: 'Moderate',

  hard: 'Hard',
} as const;

/**
 * Generate PDF
 */
export const generateQuestionPaperPDF = async (assignmentId: string) => {
  /**
   * -----------------------------------
   * FETCH DATA
   * -----------------------------------
   */

  const assignment = await Assignment.findById(assignmentId);

  if (!assignment) {
    throw new Error('Assignment not found');
  }

  const user = await User.findById(assignment.userId);

  const questionPaper = await QuestionPaper.findOne({
    assignmentId,
  }).lean<QuestionPaperDocument>();

  if (!questionPaper) {
    throw new Error('Question paper not found');
  }

  /**
   * -----------------------------------
   * TEMP FILE
   * -----------------------------------
   */

  const pdfPath = path.join(tempDir, `${assignmentId}-${Date.now()}.pdf`);

  /**
   * -----------------------------------
   * PDF INIT
   * -----------------------------------
   */

  const doc = new PDFDocument({
    size: 'A4',

    margin: 0,

    autoFirstPage: true,
  });

  const stream = fs.createWriteStream(pdfPath);

  doc.pipe(stream);

  let y = MT;

  /**
   * -----------------------------------
   * SCHOOL NAME
   * -----------------------------------
   */

  doc
    .font('Helvetica-Bold')
    .fontSize(18)
    .text(user?.schoolName || 'School Name', ML, y, {
      width: CW,

      align: 'center',
    });

  y = doc.y + 4;

  /**
   * -----------------------------------
   * SUBJECT + CLASS
   * -----------------------------------
   */

  doc
    .font('Helvetica')
    .fontSize(11)
    .text(`Subject: ${questionPaper.subject}`, ML, y, {
      width: CW,

      align: 'center',
    });

  y = doc.y + 2;

  doc.text(`Class: ${questionPaper.class}`, ML, y, {
    width: CW,

    align: 'center',
  });

  y = doc.y + 16;

  /**
   * -----------------------------------
   * TIME + MARKS
   * -----------------------------------
   */

  doc
    .font('Helvetica-Bold')
    .fontSize(10)
    .text(`Time Allowed: ${questionPaper.timeAllotted}`, ML, y, {
      width: CW * 0.5,
    });

  doc.text(`Maximum Marks: ${questionPaper.maximumMarks}`, ML, y, {
    width: CW,

    align: 'right',
  });

  y = doc.y + 14;

  /**
   * -----------------------------------
   * STUDENT INFO
   * -----------------------------------
   */

  const studentFields = ['Name', 'Roll Number', 'Section'];

  studentFields.forEach((field) => {
    doc
      .font('Helvetica')
      .fontSize(10)
      .text(`${field}: ________________________`, ML, y, {
        width: CW,
      });

    y = doc.y + 4;
  });

  y += 12;

  /**
   * -----------------------------------
   * SECTIONS
   * -----------------------------------
   */

  questionPaper.sections.forEach((section) => {
    /**
     * PAGE BREAK
     */

    if (y > PAGE_H - MB - 120) {
      doc.addPage({
        size: 'A4',

        margin: 0,
      });

      y = MT;
    }

    /**
     * SECTION TITLE
     */

    doc.font('Helvetica-Bold').fontSize(12).text(section.title, ML, y, {
      width: CW,

      align: 'center',
    });

    y = doc.y + 8;

    /**
     * QUESTION TYPE
     */

    const firstQuestion = section.questions?.[0];

    if (firstQuestion?.questionType) {
      const label = questionTypeLabelMap[firstQuestion.questionType];

      doc.font('Helvetica-Bold').fontSize(11).text(label, ML, y, {
        width: CW,
      });

      y = doc.y + 4;
    }

    /**
     * SECTION INSTRUCTIONS
     */

    if (section.instructions) {
      doc
        .font('Helvetica-Oblique')
        .fontSize(10)
        .text(section.instructions, ML, y, {
          width: CW,
        });

      y = doc.y + 8;
    }

    /**
     * QUESTIONS
     */

    section.questions.forEach((question, index) => {
      /**
       * PAGE BREAK
       */

      if (y > PAGE_H - MB - 100) {
        doc.addPage({
          size: 'A4',

          margin: 0,
        });

        y = MT;
      }

      const difficulty = question.difficulty
        ? difficultyLabelMap[question.difficulty]
        : '';
      const marks = question.marks ? `[${question.marks} Marks]` : '';
      const diffLabel = difficulty ? ` [${difficulty}]` : '';
      const line = `${index + 1}. ${question.question} ${marks}${diffLabel}`;
      doc.font('Helvetica').fontSize(10).text(line, ML, y, {
        width: CW,
      });
      y = doc.y + 4;

      /**
       * OPTIONS
       */

      if (question.questionType === 'mcq' && question.options?.length) {
        question.options.forEach((option, optionIndex) => {
          doc
            .font('Helvetica')
            .fontSize(10)
            .text(
              `${String.fromCharCode(65 + optionIndex)}. ${option}`,
              ML + 20,
              y,
              {
                width: CW - 20,
              },
            );

          y = doc.y + 2;
        });
      }

      y += 8;
    });

    y += 12;
  });

  /**
   * -----------------------------------
   * END OF PAPER
   * -----------------------------------
   */

  doc.font('Helvetica-Bold').fontSize(10).text('End of Question Paper', ML, y, {
    width: CW,

    align: 'center',
  });

  /**
   * -----------------------------------
   * ANSWER KEY PAGE
   * -----------------------------------
   */

  doc.addPage({
    size: 'A4',

    margin: 0,
  });

  y = MT;

  doc.font('Helvetica-Bold').fontSize(14).text('Answer Key', ML, y, {
    width: CW,
  });

  y = doc.y + 12;

  let answerIndex = 1;

  questionPaper.sections.forEach((section) => {
    section.questions.forEach((question) => {
      if (y > PAGE_H - MB - 60) {
        doc.addPage({
          size: 'A4',

          margin: 0,
        });

        y = MT;
      }

      doc
        .font('Helvetica')
        .fontSize(10)
        .text(`${answerIndex}. ${question.answerKey}`, ML, y, {
          width: CW,
        });

      y = doc.y + 8;

      answerIndex++;
    });
  });

  /**
   * -----------------------------------
   * FINALIZE
   * -----------------------------------
   */

  doc.end();

  await new Promise<void>((resolve, reject) => {
    stream.on('finish', resolve);

    stream.on('error', reject);
  });

  return pdfPath;
};
