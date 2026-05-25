import { Router } from 'express';
import { upload } from '../middleware/upload';
import * as assignmentController from '../controllers/assignments.controller';
import { authMiddleware } from '../middleware/auth';
import { parseAssignmentFormData } from '../middleware/parseAssignment';
import { validate } from '../middleware/validate';
import {
  assignmentSchema,
  assignmentIdSchema,
} from '../validators/assignment.validator';
import { asyncHandler } from '../utils/asyncHandler';
import { downloadPDF } from '../controllers/pdf.controller';

const router = Router();

router.post(
  '/',
  authMiddleware,
  upload.single('file'),
  parseAssignmentFormData,
  validate(assignmentSchema),
  asyncHandler(assignmentController.createAssignment),
);
export default router;

router.post(
  '/:id/download-pdf',
  authMiddleware,
  validate(assignmentIdSchema),
  asyncHandler(downloadPDF),
);

router.post(
  '/:id/regenerate',
  authMiddleware,
  validate(assignmentIdSchema),
  asyncHandler(assignmentController.regenerateAssignment),
);

router.get(
  "/",
  authMiddleware,
  asyncHandler(
    assignmentController.getAssignments
  )
);

router.get(
  '/:id',
  authMiddleware,
  validate(assignmentIdSchema),
  asyncHandler(assignmentController.getAssignment),
);
