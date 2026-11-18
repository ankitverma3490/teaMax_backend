import { Router } from 'express';
import { TeamController } from '../controllers/team.controller';
import { authenticateToken, requireSuperAdmin } from '../middleware/auth.middleware';

const router = Router();

// All staff/employee management endpoints require valid authentication and Super Admin privileges
router.use(authenticateToken);
router.use(requireSuperAdmin);

router.get('/', TeamController.getAll);
router.post('/', TeamController.create);
router.get('/:id', TeamController.getById);
router.put('/:id', TeamController.update);
router.patch('/:id/status', TeamController.toggleStatus);
router.delete('/:id', TeamController.delete);

export default router;
