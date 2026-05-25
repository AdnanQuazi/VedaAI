"use client";

import { useEffect } from "react";

import AssignmentHeader from "./assignment-header";

import AssignmentFilters from "./assignment-filter";

import AssignmentCard from "./assignment-card";

import MobileCreateButton from "./mobile-create-button";
import AssignmentsEmptyState from "./empty-state";

import { useGetAssignmentsQuery } from "@/redux/services/assignmentApi";

import { Assignment } from "@/types/assignment";

export default function AssignmentList() {
  const {
    data: assignments,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetAssignmentsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  useEffect(() => {
    const handlePageShow = () => {
      refetch();
    };

    window.addEventListener(
      "pageshow",
      handlePageShow
    );

    return () => {
      window.removeEventListener(
        "pageshow",
        handlePageShow
      );
    };
  }, [refetch]);

  const hasAssignments =
    (assignments?.length || 0) > 0;

  if (!hasAssignments && isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (isError) {
    const message =
      typeof error === "object" &&
      error !== null &&
      "data" in error
        ? (error as any).data?.error
            ?.message ||
          "Failed to load assignments."
        : "Failed to load assignments.";

    return (
      <div className="p-6">
        <p className="text-sm text-error">
          {message}
        </p>
        <button
          onClick={() => refetch()}
          className="mt-3 rounded-full bg-surface px-4 py-2 text-sm font-medium text-foreground shadow-soft"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!hasAssignments) {
    return <AssignmentsEmptyState />;
  }

  return (
    <section className="px-4 pb-32 pt-4 lg:px-6 lg:pb-10">
      <AssignmentHeader />

      {isFetching && (
        <p className="mt-3 text-xs text-muted">
          Refreshing assignments...
        </p>
      )}

      <AssignmentFilters />

      {/* Grid */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {assignments?.map((assignment: Assignment) => (
          <AssignmentCard key={assignment._id} assignment={assignment} />
        ))}
      </div>

      <MobileCreateButton />
    </section>
  );
}
