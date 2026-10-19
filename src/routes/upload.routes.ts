import { Router } from 'express';
import { UploadController } from '../controllers/upload.controller';
import { authenticateToken, requireRoles } from '../middleware/auth.middleware';
import { uploadSingleImage, uploadMultipleImages } from '../middleware/upload.middleware';
import { Role } from '@prisma/client';

const router = Router();

// Check status (authenticated)
router.get(
  '/status',
  authenticateToken,
  UploadController.getStatus
);

// Upload a single image
router.post(
  '/image',
  authenticateToken,
  requireRoles(Role.SUPER_ADMIN, Role.ADMIN, Role.MANAGER, Role.STAFF),
  uploadSingleImage,
  UploadController.uploadImage
);

// Upload multiple images
router.post(
  '/images',
  authenticateToken,
  requireRoles(Role.SUPER_ADMIN, Role.ADMIN, Role.MANAGER, Role.STAFF),
  uploadMultipleImages,
  UploadController.uploadMultiple
);

// Delete an image from Cloudinary
router.delete(
  '/',
  authenticateToken,
  requireRoles(Role.SUPER_ADMIN, Role.ADMIN),
  UploadController.deleteImage
);

export default router;
