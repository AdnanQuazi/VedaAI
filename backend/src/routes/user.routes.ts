import { Router } from 'express';
import { getMe } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.get('/me', authMiddleware, asyncHandler(getMe));

export default router;
