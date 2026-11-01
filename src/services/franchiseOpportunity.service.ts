import prisma from '../utils/prisma';
import { AppError } from '../middleware/error.middleware';

export class FranchiseOpportunityService {
  static async getAll(filters: {
    city?: string;
    state?: string;
    country?: string;
    status?: string;
    search?: string;
  } = {}) {
    const where: any = {};

    if (filters.status && filters.status !== 'all') {
      where.status = filters.status;
    }
    if (filters.city && filters.city !== 'all') {
      where.city = { contains: filters.city, mode: 'insensitive' };
    }
    if (filters.state && filters.state !== 'all') {
      where.state = { contains: filters.state, mode: 'insensitive' };
    }
    if (filters.country && filters.country !== 'all') {
      where.country = { contains: filters.country, mode: 'insensitive' };
    }
    if (filters.search) {
      where.OR = [
        { franchiseName: { contains: filters.search, mode: 'insensitive' } },
        { city: { contains: filters.search, mode: 'insensitive' } },
        { state: { contains: filters.search, mode: 'insensitive' } },
        { shortDescription: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return prisma.franchiseOpportunity.findMany({
      where,
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  static async getById(idOrSlug: string) {
    let opportunity = await prisma.franchiseOpportunity.findUnique({
      where: { id: idOrSlug },
    });

    if (!opportunity) {
      opportunity = await prisma.franchiseOpportunity.findUnique({
        where: { slug: idOrSlug },
      });
    }

    if (!opportunity) {
      // Case-insensitive search by slug fallback
      opportunity = await prisma.franchiseOpportunity.findFirst({
        where: {
          slug: {
            equals: idOrSlug,
            mode: 'insensitive',
          },
        },
      });
    }

    if (!opportunity) {
      throw new AppError('Franchise opportunity not found', 404);
    }

    return opportunity;
  }

  static async getBySlug(slug: string) {
    return this.getById(slug);
  }

  static async create(rawData: any) {
    const data = { ...rawData };

    if (!data.slug && data.franchiseName) {
      data.slug = data.franchiseName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }

    const existing = await prisma.franchiseOpportunity.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      throw new AppError('A franchise opportunity with this slug already exists', 409);
    }

    // Default arrays
    if (!data.primeLocations) data.primeLocations = [];
    if (!data.faqs) data.faqs = [];
    if (!data.inquiries) data.inquiries = [];

    return prisma.franchiseOpportunity.create({
      data,
    });
  }

  static async update(id: string, rawData: any) {
    const existing = await this.getById(id);
    const { id: _id, createdAt: _created, updatedAt: _updated, ...data } = rawData;

    if (data.slug && data.slug !== existing.slug) {
      const slugExists = await prisma.franchiseOpportunity.findUnique({
        where: { slug: data.slug },
      });
      if (slugExists && slugExists.id !== existing.id) {
        throw new AppError('A franchise opportunity with this slug already exists', 409);
      }
    }

    return prisma.franchiseOpportunity.update({
      where: { id: existing.id },
      data,
    });
  }

  static async delete(id: string) {
    const existing = await this.getById(id);
    return prisma.franchiseOpportunity.delete({
      where: { id: existing.id },
    });
  }

  static async toggleStatus(id: string) {
    const existing = await this.getById(id);
    const nextStatus = existing.status === 'active' ? 'inactive' : 'active';
    return prisma.franchiseOpportunity.update({
      where: { id: existing.id },
      data: { status: nextStatus },
    });
  }

  static async addInquiry(idOrSlug: string, inquiryData: any) {
    const existing = await this.getById(idOrSlug);
    const currentInquiries: any[] = Array.isArray(existing.inquiries) ? existing.inquiries : [];

    const newInquiry = {
      id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: inquiryData.name || inquiryData.fullName,
      phone: inquiryData.phone || inquiryData.mobile,
      email: inquiryData.email,
      preferredLocality: inquiryData.preferredLocality || inquiryData.locality || '',
      budget: inquiryData.budget || '',
      experience: inquiryData.experience || inquiryData.haveShop || '',
      status: 'new',
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    };

    const updatedInquiries = [newInquiry, ...currentInquiries];

    const updated = await prisma.franchiseOpportunity.update({
      where: { id: existing.id },
      data: {
        inquiries: updatedInquiries,
        applicantCount: updatedInquiries.length,
      },
    });

    // Also mirror into central franchise_enquiries table so admin sees it there too
    try {
      await prisma.franchiseEnquiry.create({
        data: {
          fullName: newInquiry.name,
          mobile: newInquiry.phone,
          email: newInquiry.email,
          city: existing.city || inquiryData.city || 'Unknown',
          state: existing.state || inquiryData.state || 'Unknown',
          budget: newInquiry.budget || 'Standard Franchise',
          notes: `Franchise Opportunity: ${existing.franchiseName} (${existing.slug})`,
          status: 'new',
        },
      });
    } catch (e) {
      // Non-blocking
    }

    return { opportunity: updated, inquiry: newInquiry };
  }

  static async updateInquiryStatus(id: string, inquiryId: string, newStatus: string) {
    const existing = await this.getById(id);
    const currentInquiries: any[] = Array.isArray(existing.inquiries) ? existing.inquiries : [];

    const updatedInquiries = currentInquiries.map((inq) =>
      inq.id === inquiryId ? { ...inq, status: newStatus } : inq
    );

    return prisma.franchiseOpportunity.update({
      where: { id: existing.id },
      data: {
        inquiries: updatedInquiries,
      },
    });
  }
}

