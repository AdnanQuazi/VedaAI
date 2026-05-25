"use client";

import { useGetMeQuery } from "@/redux/services/authApi";

interface Props {
  questionPaper: any;
}

export default function QuestionPaperHeader({
  questionPaper,
}: Props) {
  const { data: user } =
    useGetMeQuery();

  return (
    <>
      {/* School */}
      <div className="text-center">
        <h1 className="font-display text-[42px] font-bold tracking-[-0.04em] text-[#222222]">
          {user?.schoolName}
        </h1>

        {user?.city && (
          <p className="mt-2 text-[20px] text-[#555555]">
            {user.city}
          </p>
        )}

        {/* Subject */}
        <p className="mt-6 text-[28px] font-semibold text-[#333333]">
          Subject:{" "}
          {
            questionPaper.subject
          }
        </p>

        {/* Class */}
        <p className="mt-2 text-[26px] font-semibold text-[#333333]">
          Class:{" "}
          {
            questionPaper.class
          }
        </p>
      </div>

      {/* Meta */}
      <div className="mt-14 flex items-center justify-between text-[18px] font-semibold text-[#333333]">
        <p>
          Time Allowed:{" "}
          {
            questionPaper.timeAllotted
          }
        </p>

        <p>
          Maximum Marks:{" "}
          {
            questionPaper.maximumMarks
          }
        </p>
      </div>

      {/* Instructions */}
      <p className="mt-10 text-[18px] font-medium text-[#333333]">
        All questions are
        compulsory unless stated
        otherwise.
      </p>

      {/* Student Fields */}
      <div className="mt-10 text-[18px] font-medium leading-[220%] text-[#333333]">
        <p>
          Name:
          __________________
        </p>

        <p>
          Roll Number:
          __________________
        </p>

        <p>
          Class:{" "}
          {
            questionPaper.class
          }{" "}
          Section: __________
        </p>
      </div>
    </>
  );
}