"use client";

import PaperToolbar from "./paper-toolbar";

import QuestionPaperHeader from "./question-paper-header";

import QuestionPaperSection from "./question-paper-section";

import AnswerKey from "./answer-key";

interface Props {
  assignment: any;

  questionPaper: any;
}

export default function QuestionPaperView({
  assignment,
  questionPaper,
}: Props) {
  return (
    <section className="px-4 py-6 lg:px-8">
      <PaperToolbar
        assignmentId={
          assignment._id
        }
      />

      <div className="mx-auto mt-6 max-w-[1100px] rounded-[32px] bg-white p-8 shadow-soft lg:p-14">
        <QuestionPaperHeader
          questionPaper={
            questionPaper
          }
        />

        {/* Sections */}
        <div className="mt-20">
          {questionPaper.sections.map(
            (
              section: any,
              index: number
            ) => (
              <QuestionPaperSection
                key={index}
                section={section}
              />
            )
          )}
        </div>

        {/* Answer Key */}
        <AnswerKey
          sections={
            questionPaper.sections
          }
        />
      </div>
    </section>
  );
}