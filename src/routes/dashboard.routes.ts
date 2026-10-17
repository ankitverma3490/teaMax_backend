import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller';
import { authenticateToken, requireRoles } from '../middleware/auth.middleware';
import { Role } from '@prisma/client';

const router = Router();

// Protected CMS admin dashboard routes
router.use(authenticateToken);
router.use(requireRoles(Role.ADMIN, Role.SUPER_ADMIN, Role.MANAGER));

router.get('/stats', DashboardController.getStats);
router.get('/activity', DashboardController.getRecentActivity);

export default router;
