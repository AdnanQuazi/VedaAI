"use client";

import { useMemo } from "react";

import { useParams } from "next/navigation";

import AssignmentProgress from "@/components/create-assignment/assignment-progress";

import QuestionPaperView from "@/components/question-paper/question-paper-view";

import { useGetAssignmentQuery } from "@/redux/services/assignmentApi";

export default function AssignmentDetailPage() {
  const params = useParams();

  /**
   * ASSIGNMENT ID
   */

  const assignmentId = useMemo(() => {
    if (!params?.id) return "";

    return Array.isArray(params.id)
      ? params.id[0]
      : params.id;
  }, [params]);

  /**
   * FETCH ASSIGNMENT
   */

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAssignmentQuery(
    assignmentId,
    {
      skip: !assignmentId,

      pollingInterval: 3000,
    }
  );

  /**
   * ERROR MESSAGE
   */

  const errorMessage = useMemo(() => {
    if (!error)
      return "Unable to load assignment.";

    if (typeof error === "string") {
      return error;
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "data" in error
    ) {
      const payload = (
        error as {
          data?: any;
        }
      ).data;

      return (
        payload?.error?.message ||
        payload?.message ||
        "Unable to load assignment."
      );
    }

    return "Unable to load assignment.";
  }, [error]);

  /**
   * LOADING
   */

  if (!assignmentId || isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-muted">
          Loading assignment...
        </p>
      </div>
    );
  }

  /**
   * ERROR
   */

  if (
    isError ||
    !data?.assignment
  ) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="rounded-[24px] bg-surface p-8 shadow-soft">
          <p className="text-error">
            {errorMessage}
          </p>
        </div>
      </div>
    );
  }

  /**
   * PROCESSING STATE
   */

  if (
    data.assignment.status ===
      "pending" ||
    data.assignment.status ===
      "processing"
  ) {
    return (
      <AssignmentProgress
        assignmentId={
          assignmentId
        }
      />
    );
  }

  /**
   * FAILED STATE
   */

  if (
    data.assignment.status ===
    "failed"
  ) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="max-w-[520px] rounded-[32px] bg-surface p-10 text-center shadow-soft">
          <h2 className="font-display text-[32px] font-bold tracking-[-0.04em] text-foreground">
            Generation Failed
          </h2>

          <p className="mt-4 text-muted">
            Something went wrong
            while generating your
            question paper.
          </p>

          <button
            onClick={() =>
              refetch()
            }
            className="
              mt-8
              rounded-full
              bg-primary
              px-6
              py-3
              text-sm
              font-medium
              text-white
              transition-all
              hover:scale-[1.02]
            "
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  /**
   * QUESTION PAPER NOT READY
   */

  if (!data.questionPaper) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-muted">
          Question paper not
          available.
        </p>
      </div>
    );
  }

  /**
   * SUCCESS
   */

  return (
    <QuestionPaperView
      assignment={
        data.assignment
      }
      questionPaper={
        data.questionPaper
      }
    />
  );
}