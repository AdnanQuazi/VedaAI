import { successResponse } from "../utils/apiResponse";

import * as assignmentService from "../services/assignment.service";

export const createAssignment = async (req: any, res: any) => {
  const result = await assignmentService.createAssignment({
    userId: req.user.id,
    ...req.validated.body,
    file: req.file,
  });

  return successResponse(res, "Assignment created successfully", result, 201);
};
