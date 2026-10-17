import prisma from '../utils/prisma';
import { AppError } from '../middleware/error.middleware';

export class EnquiryService {
  static async getAll(filters: { status?: string; city?: string }) {
    const where: any = {};
    if (filters.status) {
      where.status = filters.status;
    }
    if (filters.city) {
      where.city = { contains: filters.city, mode: 'insensitive' };
    }

    return prisma.franchiseEnquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  static async getById(id: string) {
    const enquiry = await prisma.franchiseEnquiry.findUnique({
      where: { id },
    });
    if (!enquiry) {
      throw new AppError('Enquiry not found', 404);
    }
    return enquiry;
  }

  static async submit(data: {
    fullName: string;
    mobile?: string;
    phone?: string;
    email: string;
    city: string;
    state: string;
    budget: string;
    space?: string;
    notes?: string;
    consent?: boolean;
  }) {
    const mobile = (data.mobile || data.phone || '').trim();
    let combinedNotes = data.notes || '';
    if (data.space) {
      combinedNotes = `Space: ${data.space}${combinedNotes ? ` | ${combinedNotes}` : ''}`;
    }

    const enquiry = await prisma.franchiseEnquiry.create({
      data: {
        fullName: data.fullName,
        mobile,
        email: data.email,
        city: data.city,
        state: data.state,
        budget: data.budget,
        notes: combinedNotes || null,
        status: 'new',
      },
    });

    // Create system notification for CMS admin
    await prisma.notification.create({
      data: {
        title: 'New Franchise Application',
        message: `${data.fullName} applied for a TeaMax franchise in ${data.city}, ${data.state} (Budget: ${data.budget}).`,
        type: 'franchise',
        link: `/admin/franchise/${enquiry.id}`,
      },
    }).catch(err => {
      console.warn('Failed to create notification for franchise inquiry:', err.message);
    });

    return enquiry;
  }

  static async updateStatus(id: string, status: string, notes?: string) {
    await this.getById(id);
    return prisma.franchiseEnquiry.update({
      where: { id },
      data: {
        status,
        ...(notes !== undefined ? { notes } : {}),
      },
    });
  }

  static async delete(id: string) {
    await this.getById(id);
    return prisma.franchiseEnquiry.delete({
      where: { id },
    });
  }
}
