import { z } from 'zod';

export const createReviewSchema = z.object({
  reviewerName: z.string().min(2, 'Name is required'),
  reviewerAvatar: z.string().url().optional(),
  reviewText: z.string().min(10, 'Review text must be at least 10 characters'),
  starRating: z.number().int().min(1).max(5).default(5),
  reviewerRole: z.string().optional(),
  relatedCentreId: z.string().optional(),
  relatedCentreName: z.string().optional(),
  reviewType: z.enum(['customer', 'franchise']).default('customer'),
  displayOn: z.array(z.string()).optional().default(['homepage']),
  isFeatured: z.boolean().optional().default(false),
  displayOrder: z.number().int().optional().default(0),
  status: z.enum(['published', 'unpublished']).optional().default('published'),
});

export const updateReviewSchema = createReviewSchema.partial();
