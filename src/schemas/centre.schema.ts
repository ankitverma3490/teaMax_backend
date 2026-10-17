import { z } from 'zod';

export const createCentreSchema = z.object({
  name: z.string().min(2, 'Centre name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug is required'),
  coverImage: z.string().url().optional(),
  galleryImages: z.array(z.string().url()).optional().default([]),
  shortDescription: z.string().optional(),
  detailedDescription: z.string().optional(),
  status: z.enum(['active', 'inactive', 'coming_soon']).optional().default('active'),
  isFeatured: z.boolean().optional().default(false),
  country: z.string().optional().default('India'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  locality: z.string().optional(),
  address: z.string().min(3, 'Address is required'),
  postalCode: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  contactNumber: z.string().optional(),
  email: z.string().email().optional(),
  whatsappNumber: z.string().optional(),
  websiteUrl: z.string().url().optional(),
  timings: z.record(z.any()).optional(),
  holidayHours: z.string().optional(),
  facilities: z.array(z.string()).optional().default([]),
  faqs: z.array(z.record(z.any())).optional(),
});

export const updateCentreSchema = createCentreSchema.partial();
