import { successResponse } from '../utils/apiResponse';

import * as assignmentService from '../services/assignment.service';

export const createAssignment = async (req: any, res: any) => {
  const result = await assignmentService.createAssignment({
    userId: req.user.id,
    ...req.validated.body,
    file: req.file,
  });

  return successResponse(res, 'Assignment created successfully', result, 201);
};

export const regenerateAssignment = async (req: any, res: any) => {
  const assignmentId =
    req.validated?.params?.id ||
    req.params?.id;

  const result = await assignmentService.regenerateAssignment({
    assignmentId,
    userId: req.user.id,
  });

  return successResponse(res, 'Assignment regeneration started', result);
};

export const getAssignment = async (req: any, res: any) => {
  const assignmentId =
    req.validated?.params?.id ||
    req.params?.id;

  const result = await assignmentService.getAssignment({
    assignmentId,
    userId: req.user.id,
  });

  return successResponse(res, 'Assignment fetched successfully', result);
};

export const getAssignments = async (req: any, res: any) => {
  const result = await assignmentService.getAssignments({
    userId: req.user.id,
  });

  return successResponse(res, 'Assignments fetched successfully', result);
};
