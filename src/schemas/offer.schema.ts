import { z } from 'zod';

export const createOfferSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  bannerImage: z.string().url().optional(),
  shortDescription: z.string().optional(),
  detailedDescription: z.string().optional(),
  applicableCategory: z.string().optional(),
  discountType: z.enum(['percentage', 'fixed']).default('percentage'),
  discountValue: z.number().positive('Discount value must be positive'),
  startDate: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}/)),
  endDate: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}/)),
  promoCode: z.string().optional(),
  applicableCentres: z.string().optional().default('all'),
  isFeatured: z.boolean().optional().default(false),
  displayOrder: z.number().int().optional().default(0),
  status: z.enum(['active', 'inactive', 'draft']).optional().default('active'),
});

export const updateOfferSchema = createOfferSchema.partial();
