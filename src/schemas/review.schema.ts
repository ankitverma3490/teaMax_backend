import { z } from 'zod';

export const createReviewSchema = z.object({
  reviewerName: z.string().min(1, 'Reviewer name is required'),
  reviewerAvatar: z.string().optional().nullable().or(z.literal('')),
  reviewText: z.string().min(1, 'Review text is required'),
  starRating: z.number().int().min(1).max(5).default(5),
  reviewerRole: z.string().optional().nullable().or(z.literal('')),
  relatedCentreId: z.string().optional().nullable().or(z.literal('')),
  relatedCentreName: z.string().optional().nullable().or(z.literal('')),
  reviewType: z.string().optional().default('customer'),
  categoryId: z.string().optional().default('customer'),
  viewMoreLink: z.string().optional().nullable().or(z.literal('')),
  viewMoreLinkName: z.string().optional().nullable().or(z.literal('')),
  displayOn: z.array(z.string()).optional().default(['homepage', 'reviews_page']),
  isFeatured: z.boolean().optional().default(false),
  displayOrder: z.number().int().optional().default(0),
  status: z.enum(['published', 'unpublished']).optional().default('published'),
});

export const updateReviewSchema = createReviewSchema.partial();
