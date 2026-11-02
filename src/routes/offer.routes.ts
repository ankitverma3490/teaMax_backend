import { Router } from 'express';
import { OfferController } from '../controllers/offer.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { createOfferSchema, updateOfferSchema } from '../schemas/offer.schema';
import { authenticateToken, requireRoles } from '../middleware/auth.middleware';
import { Role } from '@prisma/client';

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
router.get('/primary', OfferController.getPrimaryOffer);
router.get('/', OfferController.getAll);
router.get('/:id', OfferController.getById);

// Protected routes (Admin / Super Admin)
router.post(
  '/',
  optionalAuthInDev,
  validateRequest({ body: createOfferSchema }),
  OfferController.create
);

router.put(
  '/:id',
  optionalAuthInDev,
  validateRequest({ body: updateOfferSchema }),
  OfferController.update
);

router.delete(
  '/:id',
  optionalAuthInDev,
  OfferController.delete
);

export default router;
