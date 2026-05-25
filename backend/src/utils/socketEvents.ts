import { publisher } from "../config/redisPubSub";

interface AssignmentStatusPayload {
  assignmentId: string;
  status: string;
  progress?: number;
  message?: string;
}

export const emitAssignmentStatus =
  async (
    payload: AssignmentStatusPayload
  ) => {
    await publisher.publish(
      "assignment-status",

      JSON.stringify(payload)
    );
  };