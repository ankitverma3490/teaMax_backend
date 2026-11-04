import { z } from 'zod';

export const createBlogSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  slug: z.string().min(3, 'Slug is required'),
  coverImage: z.string().optional().nullable().or(z.literal('')),
  category: z.string().optional().default('Chai Culture'),
  excerpt: z.string().optional(),
  author: z.string().optional(),
  authorDesignation: z.string().optional(),
  authorAvatar: z.string().optional().nullable().or(z.literal('')),
  readingTime: z.string().optional().default('4 min read'),
  content: z.string().min(10, 'Content is required'),
  seoTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
  status: z.enum(['published', 'draft']).optional().default('published'),
  isFeatured: z.boolean().optional().default(false),
  publishDate: z.string().optional(),
});

export const updateBlogSchema = createBlogSchema.partial();
