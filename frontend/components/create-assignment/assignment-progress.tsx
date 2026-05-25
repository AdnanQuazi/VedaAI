"use client";

import { useAssignmentSocket } from "@/hooks/useAssignmentSocket";

import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";

export default function AssignmentProgress({
  assignmentId,
}: {
  assignmentId: string;
}) {
  useAssignmentSocket(
    assignmentId
  );

  const {
    generationStatus,
    progress,
  } = useSelector(
    (state: RootState) =>
      state.createAssignment
  );

  const statusLabel =
    generationStatus === "idle"
      ? "Preparing your assignment"
      : generationStatus
          .replace(/_/g, " ")
          .replace(/\b\w/g, (c) =>
            c.toUpperCase()
          );

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center">
      <div className="w-full max-w-[520px] rounded-[32px] bg-surface p-8 shadow-soft">
        <h2 className="font-display text-[32px] font-bold text-center text-foreground">
          Generating Question Paper
        </h2>

        <p className="mt-3 text-center text-muted-foreground">
          {statusLabel}
        </p>

        <div className="mt-6 flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-muted border-t-primary" />
        </div>
s
        {/* Progress Bar */}
        <div className="mt-8 h-4 overflow-hidden rounded-full bg-surface-secondary">
          <div
            className="
              h-full
              rounded-full
              bg-primary
              transition-all
              duration-500
            "
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <p className="mt-4 text-center text-sm font-medium text-foreground">
          {progress}%
        </p>
      </div>
    </div>
  );
}