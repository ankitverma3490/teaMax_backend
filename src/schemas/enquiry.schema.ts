import { z } from 'zod';

export const submitEnquirySchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  mobile: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Valid email address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  budget: z.string().min(1, 'Budget selection is required'),
  space: z.string().optional(),
  notes: z.string().optional(),
  consent: z.boolean().optional(),
}).refine(data => data.mobile || data.phone, {
  message: 'Mobile or phone number is required',
  path: ['mobile'],
});

export const updateEnquiryStatusSchema = z.object({
  status: z.enum(['new', 'contacted', 'in_discussion', 'approved', 'rejected']),
  notes: z.string().optional(),
});
