import { Router } from "express";
import { upload } from "../middleware/upload";
import * as assignmentController from "../controllers/assignments.controller";
import { authMiddleware } from "../middleware/auth";
import { parseAssignmentFormData } from "../middleware/parseAssignment";
import { validate } from "../middleware/validate";
import { assignmentSchema } from "../validators/assignment.validator";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post(
  "/",
  authMiddleware,
  upload.single("file"),
  parseAssignmentFormData,
  validate(assignmentSchema),
  asyncHandler(assignmentController.createAssignment)
);
export default router;
