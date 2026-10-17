import { Router } from 'express';
import { EnquiryController } from '../controllers/enquiry.controller';
import { validateRequest } from '../middleware/validate.middleware';
import {
  submitEnquirySchema,
  updateEnquiryStatusSchema,
} from '../schemas/enquiry.schema';
import { authenticateToken, requireRoles } from '../middleware/auth.middleware';
import { Role } from '@prisma/client';

const router = Router();

// Public route for franchise lead application (from popup / franchise page)
router.post(
  '/franchise',
  validateRequest({ body: submitEnquirySchema }),
  EnquiryController.submit
);

// Protected routes (Admin / Super Admin / Manager)
router.get(
  '/',
  authenticateToken,
  requireRoles(Role.ADMIN, Role.SUPER_ADMIN, Role.MANAGER),
  EnquiryController.getAll
);

router.get(
  '/:id',
  authenticateToken,
  requireRoles(Role.ADMIN, Role.SUPER_ADMIN, Role.MANAGER),
  EnquiryController.getById
);

router.patch(
  '/:id/status',
  authenticateToken,
  requireRoles(Role.ADMIN, Role.SUPER_ADMIN, Role.MANAGER),
  validateRequest({ body: updateEnquiryStatusSchema }),
  EnquiryController.updateStatus
);

router.delete(
  '/:id',
  authenticateToken,
  requireRoles(Role.ADMIN, Role.SUPER_ADMIN),
  EnquiryController.delete
);

export default router;
