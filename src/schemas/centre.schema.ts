import { z } from 'zod';

export const createCentreSchema = z.object({
  name: z.string().min(2, 'Centre name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug is required'),
  coverImage: z.string().optional().nullable().or(z.literal('')),
  galleryImages: z.array(z.string()).optional().default([]),
  shortDescription: z.string().optional().nullable(),
  detailedDescription: z.string().optional().nullable(),
  status: z.enum(['active', 'inactive', 'coming_soon']).optional().default('active'),
  isFeatured: z.boolean().optional().default(false),
  country: z.string().optional().default('India'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  locality: z.string().optional().nullable(),
  address: z.string().min(3, 'Address is required'),
  postalCode: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  contactNumber: z.string().optional().nullable(),
  email: z.string().email().optional().or(z.literal('')).nullable(),
  whatsappNumber: z.string().optional().nullable(),
  websiteUrl: z.string().url().optional().or(z.literal('')).nullable(),
  timings: z.record(z.any()).optional().nullable(),
  holidayHours: z.string().optional().nullable(),
  facilities: z.array(z.string()).optional().default([]),
  faqs: z.array(z.record(z.any())).optional().nullable(),
});

export const updateCentreSchema = createCentreSchema.partial();
