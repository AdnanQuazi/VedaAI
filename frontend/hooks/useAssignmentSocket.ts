import { useEffect } from "react";

import { socket } from "@/redux/services/socket";

import { useDispatch } from "react-redux";

import {
  setGenerationStatus,
  setProgress,
} from "@/redux/features/createAssignment/createAssignmentSlice";

export const useAssignmentSocket = (
  assignmentId?: string | null
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!assignmentId) return;

    socket.emit(
      "join-assignment",
      assignmentId
    );

    const handleStatus = (data: {
      status: string;
      progress?: number;
    }) => {
      dispatch(
        setGenerationStatus(
          data.status
        )
      );

      if (
        typeof data.progress ===
        "number"
      ) {
        dispatch(
          setProgress(
            data.progress
          )
        );
      }
    };

    socket.on(
      "assignment-status",
      handleStatus
    );

    return () => {
      socket.off(
        "assignment-status",
        handleStatus
      );
    };
  }, [assignmentId, dispatch]);
};