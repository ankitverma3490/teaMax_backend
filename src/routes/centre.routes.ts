import { Router } from 'express';
import { CentreController } from '../controllers/centre.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { createCentreSchema, updateCentreSchema } from '../schemas/centre.schema';
import { authenticateToken, requireRoles } from '../middleware/auth.middleware';
import { Role } from '@prisma/client';

const router = Router();

// Public routes
router.get('/', CentreController.getAll);
router.get('/:id', CentreController.getById);

// Protected routes (Admin / Super Admin)
router.post(
  '/',
  authenticateToken,
  requireRoles(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest({ body: createCentreSchema }),
  CentreController.create
);

router.put(
  '/:id',
  authenticateToken,
  requireRoles(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest({ body: updateCentreSchema }),
  CentreController.update
);

router.delete(
  '/:id',
  authenticateToken,
  requireRoles(Role.ADMIN, Role.SUPER_ADMIN),
  CentreController.delete
);

export default router;
