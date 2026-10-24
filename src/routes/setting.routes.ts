import { Router } from 'express';
import { SettingController } from '../controllers/setting.controller';
import { authenticateToken, requireRoles } from '../middleware/auth.middleware';
import { Role } from '@prisma/client';

const router = Router();

// Public: read any allowed setting
router.get('/:key', SettingController.get);

// Protected: write any allowed setting
router.put(
  '/:key',
  authenticateToken,
  requireRoles(Role.ADMIN, Role.SUPER_ADMIN),
  SettingController.set
);

export default router;
