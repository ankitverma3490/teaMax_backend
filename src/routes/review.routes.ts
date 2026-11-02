import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { createReviewSchema, updateReviewSchema } from '../schemas/review.schema';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

const optionalAuthInDev = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authenticateToken(req, res, next);
  }
  if (process.env.NODE_ENV !== 'production') {
    return next();
  }
  return authenticateToken(req, res, next);
};

// Public routes
router.get('/', ReviewController.getAll);
router.get('/:id', ReviewController.getById);

// Review creation
router.post(
  '/',
  optionalAuthInDev,
  validateRequest({ body: createReviewSchema }),
  ReviewController.create
);

// Review update & delete
router.put(
  '/:id',
  optionalAuthInDev,
  validateRequest({ body: updateReviewSchema }),
  ReviewController.update
);

router.delete('/:id', optionalAuthInDev, ReviewController.delete);

export default router;
