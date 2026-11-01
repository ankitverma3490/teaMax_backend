import { Router } from 'express';
import { FranchiseOpportunityController } from '../controllers/franchiseOpportunity.controller';
import { validateRequest } from '../middleware/validate.middleware';
import {
  createFranchiseOpportunitySchema,
  updateFranchiseOpportunitySchema,
  addFranchiseInquirySchema,
} from '../schemas/franchiseOpportunity.schema';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

const optionalAuthInDev = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authenticateToken(req, res, next);
  }
  if (process.env.NODE_ENV !== 'production') {
    return next();
  }
  return authenticateToken(req, res, next);
};

// Public routes
router.get('/', FranchiseOpportunityController.getAll);
router.get('/:id', FranchiseOpportunityController.getById);
router.post(
  '/:id/inquiries',
  validateRequest({ body: addFranchiseInquirySchema }),
  FranchiseOpportunityController.addInquiry
);

// Admin routes
router.post(
  '/',
  optionalAuthInDev,
  validateRequest({ body: createFranchiseOpportunitySchema }),
  FranchiseOpportunityController.create
);

router.put(
  '/:id',
  optionalAuthInDev,
  validateRequest({ body: updateFranchiseOpportunitySchema }),
  FranchiseOpportunityController.update
);

router.delete('/:id', optionalAuthInDev, FranchiseOpportunityController.delete);

router.patch('/:id/status', optionalAuthInDev, FranchiseOpportunityController.toggleStatus);

router.patch(
  '/:id/inquiries/:inquiryId/status',
  optionalAuthInDev,
  FranchiseOpportunityController.updateInquiryStatus
);

export default router;

