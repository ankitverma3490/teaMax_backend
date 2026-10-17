import { z } from 'zod';

export const createMenuItemSchema = z.object({
  name: z.string().min(2, 'Item name must be at least 2 characters'),
  categoryId: z.string().min(1, 'Category ID is required'),
  price: z.number().positive('Price must be greater than 0'),
  description: z.string().optional(),
  image: z.string().url().optional(),
  isFeatured: z.boolean().optional().default(false),
  isPopular: z.boolean().optional().default(false),
  availability: z.enum(['in_stock', 'low_stock', 'out_of_stock']).optional().default('in_stock'),
  dietary: z.enum(['veg', 'non_veg', 'vegan']).optional().default('veg'),
  displayOrder: z.number().int().optional().default(0),
  rating: z.number().min(0).max(5).optional().default(4.8),
});

export const updateMenuItemSchema = createMenuItemSchema.partial();

export const queryMenuItemSchema = z.object({
  categoryId: z.string().optional(),
  dietary: z.string().optional(),
  availability: z.string().optional(),
  isFeatured: z.string().optional(),
  isPopular: z.string().optional(),
  search: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});
