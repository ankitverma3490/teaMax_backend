import { Router } from 'express';
import { OfferController } from '../controllers/offer.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { createOfferSchema, updateOfferSchema } from '../schemas/offer.schema';
import { authenticateToken, requireRoles } from '../middleware/auth.middleware';
import { Role } from '@prisma/client';

const router = Router();

// Public routes
router.get('/primary', OfferController.getPrimaryOffer);
router.get('/', OfferController.getAll);
router.get('/:id', OfferController.getById);

// Protected routes (Admin / Super Admin)
router.post(
  '/',
  authenticateToken,
  requireRoles(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest({ body: createOfferSchema }),
  OfferController.create
);

router.put(
  '/:id',
  authenticateToken,
  requireRoles(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest({ body: updateOfferSchema }),
  OfferController.update
);

router.delete(
  '/:id',
  authenticateToken,
  requireRoles(Role.ADMIN, Role.SUPER_ADMIN),
  OfferController.delete
);

export default router;
