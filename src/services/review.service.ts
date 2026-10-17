import prisma from '../utils/prisma';
import { AppError } from '../middleware/error.middleware';

export class ReviewService {
  static async getAll(filters: {
    reviewType?: string;
    relatedCentreId?: string;
    isFeatured?: boolean;
    status?: string;
  }) {
    const where: any = {};

    if (filters.reviewType) {
      where.reviewType = filters.reviewType;
    }
    if (filters.relatedCentreId) {
      where.relatedCentreId = filters.relatedCentreId;
    }
    if (filters.isFeatured !== undefined) {
      where.isFeatured = filters.isFeatured;
    }
    if (filters.status) {
      where.status = filters.status;
    }

    return prisma.review.findMany({
      where,
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
      include: {
        relatedCentre: {
          select: { id: true, name: true, city: true, slug: true },
        },
      },
    });
  }

  static async getById(id: string) {
    const review = await prisma.review.findUnique({
      where: { id },
      include: {
        relatedCentre: true,
      },
    });
    if (!review) {
      throw new AppError('Review not found', 404);
    }
    return review;
  }

  static async create(data: any) {
    if (data.relatedCentreId && !data.relatedCentreName) {
      const centre = await prisma.centre.findUnique({
        where: { id: data.relatedCentreId },
      });
      if (centre) {
        data.relatedCentreName = centre.name;
      }
    }

    return prisma.review.create({
      data,
      include: {
        relatedCentre: true,
      },
    });
  }

  static async update(id: string, data: any) {
    await this.getById(id);
    return prisma.review.update({
      where: { id },
      data,
      include: {
        relatedCentre: true,
      },
    });
  }

  static async delete(id: string) {
    await this.getById(id);
    return prisma.review.delete({
      where: { id },
    });
  }
}
