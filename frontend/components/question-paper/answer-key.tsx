interface Props {
  sections: any[];
}

export default function AnswerKey({
  sections,
}: Props) {
  const questions =
    sections.flatMap(
      (section) =>
        section.questions
    );

  return (
    <div className="mt-24">
      <h2 className="font-display text-[34px] font-bold tracking-[-0.04em] text-[#222222]">
        Answer Key
      </h2>

      <div className="mt-10 flex flex-col gap-8">
        {questions.map(
          (
            question: any,
            index: number
          ) => (
            <div
              key={index}
              className="text-[18px] leading-[190%] text-[#333333]"
            >
              <span className="font-semibold">
                {index + 1}.
              </span>{" "}
              {
                question.answerKey
              }
            </div>
          )
        )}
      </div>
    </div>
  );
}