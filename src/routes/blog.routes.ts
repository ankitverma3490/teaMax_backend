import { Router } from 'express';
import { BlogController } from '../controllers/blog.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { createBlogSchema, updateBlogSchema } from '../schemas/blog.schema';
import { authenticateToken, requireRoles } from '../middleware/auth.middleware';
import { Role } from '@prisma/client';

const router = Router();

// Public routes
router.get('/', BlogController.getAll);
router.get('/:id', BlogController.getById);

// Protected routes (Admin / Super Admin / Manager)
router.post(
  '/',
  authenticateToken,
  requireRoles(Role.ADMIN, Role.SUPER_ADMIN, Role.MANAGER),
  validateRequest({ body: createBlogSchema }),
  BlogController.create
);

router.put(
  '/:id',
  authenticateToken,
  requireRoles(Role.ADMIN, Role.SUPER_ADMIN, Role.MANAGER),
  validateRequest({ body: updateBlogSchema }),
  BlogController.update
);

router.delete(
  '/:id',
  authenticateToken,
  requireRoles(Role.ADMIN, Role.SUPER_ADMIN),
  BlogController.delete
);

export default router;
