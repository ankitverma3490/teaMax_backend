import { z } from 'zod';

export const createFranchiseOpportunitySchema = z.object({
  franchiseName: z.string().min(2, 'Franchise name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug is required'),
  country: z.string().optional().default('India'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  status: z.enum(['active', 'inactive']).optional().default('active'),
  isFeatured: z.boolean().optional().default(true),
  minBudget: z.string().optional().nullable().default('₹3.69 Lakhs*'),
  spaceRequired: z.string().optional().nullable().default('100 – 200 sq.ft'),
  timelineDays: z.string().optional().nullable().default('25 – 30 Days'),
  royalty: z.string().optional().nullable().default('Zero Royalty (100% Profits to You)'),
  margins: z.string().optional().nullable().default('55% – 65% Gross Margins'),
  primaryImage: z.string().optional().nullable(),
  shortDescription: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  editorialLead: z.string().optional().nullable(),
  editorialBody: z.string().optional().nullable(),
  primeLocations: z.any().optional().nullable(),
  faqs: z.any().optional().nullable(),
  seoTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  seoKeywords: z.string().optional().nullable(),
  displayOrder: z.coerce.number().optional().default(0),
});

export const updateFranchiseOpportunitySchema = createFranchiseOpportunitySchema.partial();

export const addFranchiseInquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid 10-digit phone number is required'),
  email: z.string().email('Valid email is required'),
  preferredLocality: z.string().optional(),
  budget: z.string().optional(),
  experience: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  notes: z.string().optional(),
});

