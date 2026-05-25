"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/redux/store";

import {
  addQuestionConfig,
  removeQuestionConfig,
  setDueDate,
  setAssignmentId,
  setGenerationStatus,
  setProgress,
  setCurrentStep,
  resetAssignmentCreation,
  setInstructions,
  updateQuestionConfig,
} from "@/redux/features/createAssignment/createAssignmentSlice";

import { useCreateAssignmentMutation } from "@/redux/services/assignmentApi";

import AssignmentUpload from "./assignment-upload";

import QuestionConfigCard from "./question-config-card";

import AdditionalInfo from "./additional-info";

import AssignmentStepper from "./assignment-stepper";

import DueDatePicker from "./due-date-picker";

import { Plus } from "lucide-react";
import AssignmentProgress from "./assignment-progress";

export default function CreateAssignmentForm() {
  const router = useRouter();

  const dispatch = useDispatch();

  const {
    dueDate,
    instructions,
    questionConfigs,
    currentStep,
    assignmentId,
    generationStatus,
  } = useSelector((state: RootState) => state.createAssignment);

  const [file, setFile] = useState<File | null>(null);

  const [createAssignment, { isLoading }] = useCreateAssignmentMutation();

  useEffect(() => {
    if (currentStep === 2 && assignmentId && generationStatus === "completed") {
      const targetId = assignmentId;

      dispatch(resetAssignmentCreation());

      router.push(`/assignments/${targetId}`);
    }
  }, [assignmentId, currentStep, generationStatus, dispatch, router]);

  const handleSubmit = async () => {
    if (!dueDate) {
      alert("Please select due date");

      return;
    }

    if (questionConfigs.length === 0) {
      alert("Add at least one question type");

      return;
    }

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }

    formData.append("dueDate", dueDate);

    formData.append("instructions", instructions);

    formData.append("questionConfigs", JSON.stringify(questionConfigs));

    try {
      const response = await createAssignment(formData).unwrap();

      const assignmentId = response?._id;

      if (!assignmentId) {
        throw new Error("Assignment ID missing");
      }

      dispatch(setAssignmentId(assignmentId));

      dispatch(setGenerationStatus("queued"));

      dispatch(setProgress(0));

      dispatch(setCurrentStep(2));
    } catch (error) {
      console.error(error);
    }
  };

  if (currentStep === 2) {
    return (
      <section className="px-4 py-4 lg:px-8">
        <div className="mt-6">
          <AssignmentStepper />
        </div>

        {assignmentId ? (
          <AssignmentProgress assignmentId={assignmentId} />
        ) : (
          <div className="mt-10 text-center text-sm text-muted">
            Preparing your assignment...
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="px-4 py-4 lg:px-8">
      {/* Header */}
      <div className="hidden lg:block">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-success shadow-[0_0_12px_rgba(34,197,94,0.7)]" />

          <div>
            <h1 className="font-display text-[24px] font-bold tracking-[-0.04em] text-foreground">
              Create Assignment
            </h1>

            <p className="mt-1 text-sm text-muted">
              Set up a new assignment for your students
            </p>
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div className="mt-6">
        <AssignmentStepper />
      </div>

      {/* Form Card */}
      <div className="mx-auto mt-6 max-w-[920px] rounded-[32px] bg-[#FFFFFF80] p-6 lg:p-8">
        {/* Title */}
        <div>
          <h2 className="font-display text-[28px] font-bold tracking-[-0.04em] text-foreground">
            Assignment Details
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Basic information about your assignment
          </p>
        </div>

        {/* Upload */}
        <div className="mt-8">
          <AssignmentUpload file={file} onChange={setFile} />
        </div>

        {/* Due Date */}
        <div className="mt-8">
          <DueDatePicker
            value={dueDate}
            onChange={(value) => dispatch(setDueDate(value))}
          />
        </div>

        {/* Question Types */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-[18px] font-semibold text-foreground">
              Question Type
            </h3>

            <div className="hidden lg:flex items-center gap-16 pr-6 text-sm text-muted-foreground">
              <span>No. of Questions</span>

              <span>Marks</span>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            {questionConfigs.map((config, index) => (
              <QuestionConfigCard
                key={index}
                config={config}
                onChange={(data) =>
                  dispatch(
                    updateQuestionConfig({
                      index,
                      data,
                    }),
                  )
                }
                onRemove={() => dispatch(removeQuestionConfig(index))}
              />
            ))}
          </div>

          {/* Add Button */}
          <button
            onClick={() =>
              dispatch(
                addQuestionConfig({
                  type: "mcq",
                  count: 1,
                  marks: 1,
                }),
              )
            }
            className="mt-5 flex items-center gap-3 text-sm font-medium text-foreground transition-all hover:opacity-80"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
              <Plus className="h-5 w-5" />
            </div>
            Add Question Type
          </button>

          {/* Totals */}
          <div className="mt-6 flex flex-col items-end gap-1 text-sm">
            <p>
              Total Questions :{" "}
              <span className="font-semibold">
                {questionConfigs.reduce((acc, item) => acc + item.count, 0)}
              </span>
            </p>

            <p>
              Total Marks :{" "}
              <span className="font-semibold">
                {questionConfigs.reduce(
                  (acc, item) => acc + item.count * item.marks,
                  0,
                )}
              </span>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8">
          <AdditionalInfo
            value={instructions}
            onChange={(value) => dispatch(setInstructions(value))}
          />
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="mx-auto mt-6 flex max-w-[920px] items-center justify-between">
        <button
          className="
            flex
            h-[52px]
            items-center
            justify-center
            rounded-full
            bg-surface
            px-8
            text-sm
            font-medium
            text-foreground
            shadow-soft
          "
          onClick={() => router.push("/assignments")}
        >
          ← Previous
        </button>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="
            flex
            h-[52px]
            items-center
            justify-center
            rounded-full
            bg-primary
            px-8
            text-sm
            font-medium
            text-white
            transition-all
            hover:scale-[1.02]
          "
        >
          {isLoading ? "Generating..." : "Next →"}
        </button>
      </div>
    </section>
  );
}
