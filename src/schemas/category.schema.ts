import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug is required'),
  icon: z.string().optional(),
  image: z.string().url('Image must be a valid URL').optional(),
  description: z.string().optional(),
  displayOrder: z.number().int().optional().default(0),
  status: z.enum(['active', 'inactive']).optional().default('active'),
});

export const updateCategorySchema = createCategorySchema.partial();
