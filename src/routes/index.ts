import { Router } from 'express';
import authRoutes from './auth.routes';
import categoryRoutes from './category.routes';
import menuItemRoutes from './menuItem.routes';
import centreRoutes from './centre.routes';
import reviewRoutes from './review.routes';
import blogRoutes from './blog.routes';
import offerRoutes from './offer.routes';
import enquiryRoutes from './enquiry.routes';
import dashboardRoutes from './dashboard.routes';
import uploadRoutes from './upload.routes';
import settingRoutes from './setting.routes';

const router = Router();

// Mount API v1 route modules
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/menu-items', menuItemRoutes);
router.use('/centres', centreRoutes);
router.use('/reviews', reviewRoutes);
router.use('/blogs', blogRoutes);
router.use('/offers', offerRoutes);
router.use('/enquiries', enquiryRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/upload', uploadRoutes);
router.use('/settings', settingRoutes);

export default router;
