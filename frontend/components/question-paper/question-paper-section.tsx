import QuestionItem from "./question-item";

interface Props {
  section: any;
}

export default function QuestionPaperSection({
  section,
}: Props) {
  return (
    <div className="mb-20">
      <h2 className="text-center font-display text-[36px] font-bold tracking-[-0.04em] text-[#222222]">
        {section.title}
      </h2>

      <div className="mt-12">
        <h3 className="text-[24px] font-bold text-[#222222]">
          {section.type}
        </h3>

        <p className="mt-2 text-[18px] italic text-[#555555]">
          {
            section.instructions
          }
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-8">
        {section.questions.map(
          (
            question: any,
            index: number
          ) => (
            <QuestionItem
              key={index}
              index={index}
              question={question}
            />
          )
        )}
      </div>
    </div>
  );
}