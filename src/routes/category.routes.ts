import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { createCategorySchema, updateCategorySchema } from '../schemas/category.schema';
import { authenticateToken, requireRoles } from '../middleware/auth.middleware';
import { Role } from '@prisma/client';

const router = Router();

// Public routes
router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getById);

// Protected CMS admin routes
router.post(
  '/',
  authenticateToken,
  requireRoles(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest({ body: createCategorySchema }),
  CategoryController.create
);

router.put(
  '/:id',
  authenticateToken,
  requireRoles(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest({ body: updateCategorySchema }),
  CategoryController.update
);

router.delete(
  '/:id',
  authenticateToken,
  requireRoles(Role.ADMIN, Role.SUPER_ADMIN),
  CategoryController.delete
);

export default router;
