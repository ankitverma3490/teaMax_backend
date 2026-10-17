import { Router } from 'express';
import { MenuItemController } from '../controllers/menuItem.controller';
import { validateRequest } from '../middleware/validate.middleware';
import {
  createMenuItemSchema,
  updateMenuItemSchema,
  queryMenuItemSchema,
} from '../schemas/menuItem.schema';
import { authenticateToken, requireRoles } from '../middleware/auth.middleware';
import { Role } from '@prisma/client';

const router = Router();

// Public routes
router.get('/featured', MenuItemController.getFeatured);
router.get('/', validateRequest({ query: queryMenuItemSchema }), MenuItemController.getAll);
router.get('/:id', MenuItemController.getById);

// Protected routes (Admin / Super Admin / Manager)
router.patch(
  '/:id/featured',
  authenticateToken,
  requireRoles(Role.ADMIN, Role.SUPER_ADMIN, Role.MANAGER),
  MenuItemController.toggleFeatured
);
router.post(
  '/',
  authenticateToken,
  requireRoles(Role.ADMIN, Role.SUPER_ADMIN, Role.MANAGER),
  validateRequest({ body: createMenuItemSchema }),
  MenuItemController.create
);

router.put(
  '/:id',
  authenticateToken,
  requireRoles(Role.ADMIN, Role.SUPER_ADMIN, Role.MANAGER),
  validateRequest({ body: updateMenuItemSchema }),
  MenuItemController.update
);

router.delete(
  '/:id',
  authenticateToken,
  requireRoles(Role.ADMIN, Role.SUPER_ADMIN),
  MenuItemController.delete
);

export default router;
