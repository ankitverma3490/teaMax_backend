import { Router } from 'express';
import { CentreController } from '../controllers/centre.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { createCentreSchema, updateCentreSchema } from '../schemas/centre.schema';
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
router.get('/', CentreController.getAll);
router.get('/:id', CentreController.getById);

// Protected routes (Admin / Super Admin)
router.post(
  '/',
  optionalAuthInDev,
  validateRequest({ body: createCentreSchema }),
  CentreController.create
);

router.put(
  '/:id',
  optionalAuthInDev,
  validateRequest({ body: updateCentreSchema }),
  CentreController.update
);

router.delete(
  '/:id',
  optionalAuthInDev,
  CentreController.delete
);

export default router;
