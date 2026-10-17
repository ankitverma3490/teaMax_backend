import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validate.middleware';
import {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  changePasswordSchema,
} from '../schemas/auth.schema';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', validateRequest({ body: registerSchema }), AuthController.register);
router.post('/login', validateRequest({ body: loginSchema }), AuthController.login);

// Protected routes
router.get('/me', authenticateToken, AuthController.getMe);
router.put('/profile', authenticateToken, validateRequest({ body: updateProfileSchema }), AuthController.updateProfile);
router.put('/change-password', authenticateToken, validateRequest({ body: changePasswordSchema }), AuthController.changePassword);

export default router;
