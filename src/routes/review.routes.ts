import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { createReviewSchema, updateReviewSchema } from '../schemas/review.schema';
import { authenticateToken, requireRoles } from '../middleware/auth.middleware';
import { Role } from '@prisma/client';

const router = Router();

// Public routes
router.get('/', ReviewController.getAll);
router.get('/:id', ReviewController.getById);

// Public submission of review or authenticated creation
router.post(
  '/',
  validateRequest({ body: createReviewSchema }),
  ReviewController.create
);

// Protected routes (Admin / Super Admin)
router.put(
  '/:id',
  authenticateToken,
  requireRoles(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest({ body: updateReviewSchema }),
  ReviewController.update
);

router.delete(
  '/:id',
  authenticateToken,
  requireRoles(Role.ADMIN, Role.SUPER_ADMIN),
  ReviewController.delete
);

export default router;
