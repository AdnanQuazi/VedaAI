interface Props {
  question: any;

  index: number;
}

export default function QuestionItem({
  question,
  index,
}: Props) {
  return (
    <div className="text-[19px] leading-[190%] text-[#333333]">
      <p>
        <span className="font-medium">
          {index + 1}.
        </span>{" "}
        [
        {
          question.difficulty
        }
        ]{" "}
        {question.question} [
        {question.marks} Marks]
      </p>

      {/* Options */}
      {question.options &&
        question.options.length >
          0 && (
          <div className="ml-8 mt-4 flex flex-col gap-2">
            {question.options.map(
              (
                option: string,
                optionIndex: number
              ) => (
                <p
                  key={optionIndex}
                >
                  {String.fromCharCode(
                    65 +
                      optionIndex
                  )}
                  . {option}
                </p>
              )
            )}
          </div>
        )}
    </div>
  );
}