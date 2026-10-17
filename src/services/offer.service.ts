import prisma from '../utils/prisma';
import { AppError } from '../middleware/error.middleware';

export class OfferService {
  static async getAll(filters: {
    status?: string;
    isFeatured?: boolean;
    activeOnly?: boolean;
  }) {
    const where: any = {};

    if (filters.status) {
      where.status = filters.status;
    }
    if (filters.isFeatured !== undefined) {
      where.isFeatured = filters.isFeatured;
    }
    if (filters.activeOnly) {
      const now = new Date();
      where.status = 'active';
      where.startDate = { lte: now };
      where.endDate = { gte: now };
    }

    return prisma.offer.findMany({
      where,
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  static async getPrimaryOffer() {
    const now = new Date();
    let offer = await prisma.offer.findFirst({
      where: {
        status: 'active',
        isFeatured: true,
        startDate: { lte: now },
        endDate: { gte: now },
      },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });

    if (!offer) {
      offer = await prisma.offer.findFirst({
        where: {
          status: 'active',
          startDate: { lte: now },
          endDate: { gte: now },
        },
        orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
      });
    }

    if (!offer) {
      offer = await prisma.offer.findFirst({
        where: { status: 'active' },
        orderBy: [{ isFeatured: 'desc' }, { displayOrder: 'asc' }, { createdAt: 'desc' }],
      });
    }

    return offer;
  }

  static async getById(id: string) {
    const offer = await prisma.offer.findUnique({
      where: { id },
    });
    if (!offer) {
      throw new AppError('Offer not found', 404);
    }
    return offer;
  }

  static async create(data: any) {
    return prisma.offer.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      },
    });
  }

  static async update(id: string, data: any) {
    await this.getById(id);
    return prisma.offer.update({
      where: { id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      },
    });
  }

  static async delete(id: string) {
    await this.getById(id);
    return prisma.offer.delete({
      where: { id },
    });
  }
}
