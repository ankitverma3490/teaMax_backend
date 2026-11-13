import { z } from 'zod';

export function normalizeDateToYYYYMMDD(val?: string): string {
  if (!val) return new Date().toISOString().split('T')[0];

  const trimmed = val.trim();
  // If already in YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }
  // If YYYY-MM (e.g. from type="month")
  if (/^\d{4}-\d{2}$/.test(trimmed)) {
    return `${trimmed}-01`;
  }

  const lower = trimmed.toLowerCase();
  const now = new Date();
  if (lower === 'immediately') {
    return now.toISOString().split('T')[0];
  }
  if (lower.includes('90')) {
    const d = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
    return d.toISOString().split('T')[0];
  }
  if (lower.includes('180')) {
    const d = new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000);
    return d.toISOString().split('T')[0];
  }
  if (lower.includes('not decided')) {
    const d = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
    return d.toISOString().split('T')[0];
  }

  const parsed = new Date(trimmed);
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString().split('T')[0];
  }

  return now.toISOString().split('T')[0];
}

export function formatIndianPhoneNumber(phone?: string): string {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `+91${digits}`;
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+${digits}`;
  }
  if (digits.length > 10) {
    return `+${digits}`;
  }
  return `+91${digits}`;
}

export const franchiseInquirySchema = z
  .object({
    name: z.string().optional(),
    fullName: z.string().optional(),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().optional(),
    whatsapp_number: z.string().optional(),
    mobile: z.string().optional(),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    start_date: z.string().optional(),
    startDate: z.string().optional(),
    whenToStart: z.string().optional(),
    has_space: z.string().optional(),
    hasSpace: z.string().optional(),
    haveShop: z.string().optional(),
    space: z.string().optional(),
    source: z.string().optional(),
  })
  .transform((data) => {
    const name = (data.name || data.fullName || '').trim();
    const rawPhone = (data.whatsapp_number || data.phone || data.mobile || '').trim();
    const rawDate = data.start_date || data.startDate || data.whenToStart || '';
    const rawSpace = data.has_space || data.hasSpace || data.haveShop || data.space || '';

    return {
      name,
      email: data.email.trim().toLowerCase(),
      whatsapp_number: formatIndianPhoneNumber(rawPhone),
      city: data.city.trim(),
      state: data.state.trim(),
      start_date: normalizeDateToYYYYMMDD(rawDate),
      has_space: rawSpace.trim(),
      source: data.source || 'teamex_franchise_website',
    };
  })
  .refine((data) => data.name.length >= 2, {
    message: 'Full name is required (at least 2 characters)',
    path: ['name'],
  })
  .refine(
    (data) => /^\+91[6-9]\d{9}$/.test(data.whatsapp_number) || data.whatsapp_number.length >= 11,
    {
      message: 'Please enter a valid 10-digit Indian WhatsApp mobile number',
      path: ['whatsapp_number'],
    }
  )
  .refine((data) => data.has_space.length > 0, {
    message: 'Please select whether you have a commercial space',
    path: ['has_space'],
  });

export type ValidatedFranchiseInquiry = z.infer<typeof franchiseInquirySchema>;

