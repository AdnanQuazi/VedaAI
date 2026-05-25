"use client";

import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";

export default function AssignmentStepper() {
  const { currentStep } =
    useSelector(
      (state: RootState) =>
        state.createAssignment
    );

  return (
    <div className="mx-auto flex max-w-[520px] items-center gap-3">
      {/* Step 1 */}
      <div className="flex-1">
        <div
          className={`
            h-[6px]
            rounded-full
            transition-all
            duration-300
            ${
              currentStep >= 1
                ? "bg-primary"
                : "bg-border"
            }
          `}
        />
      </div>

      {/* Step 2 */}
      <div className="flex-1">
        <div
          className={`
            h-[6px]
            rounded-full
            transition-all
            duration-300
            ${
              currentStep >= 2
                ? "bg-primary"
                : "bg-border"
            }
          `}
        />
      </div>
    </div>
  );
}