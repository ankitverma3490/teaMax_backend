import { Router } from 'express';
import { FranchiseInquiryController } from '../controllers/franchiseInquiry.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { franchiseInquirySchema } from '../schemas/franchiseInquiry.schema';

const router = Router();

// POST /api/franchise/inquiry or POST /api/v1/franchise/inquiry
router.post(
  '/inquiry',
  validateRequest({ body: franchiseInquirySchema }),
  FranchiseInquiryController.submit
);

export default router;

