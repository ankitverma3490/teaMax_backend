import prisma from '../utils/prisma';
import { AppError } from '../middleware/error.middleware';

export class ReviewService {
  static async getAll(filters: {
    reviewType?: string;
    categoryId?: string;
    relatedCentreId?: string;
    isFeatured?: boolean;
    status?: string;
    displayOn?: string;
    search?: string;
  }) {
    const where: any = {};

    if (filters.categoryId && filters.categoryId !== 'all') {
      where.OR = [
        { categoryId: filters.categoryId },
        { reviewType: filters.categoryId },
      ];
    } else if (filters.reviewType && filters.reviewType !== 'all') {
      where.OR = [
        { reviewType: filters.reviewType },
        { categoryId: filters.reviewType },
      ];
    }

    if (filters.relatedCentreId) {
      where.relatedCentreId = filters.relatedCentreId;
    }
    if (filters.isFeatured !== undefined) {
      where.isFeatured = filters.isFeatured;
    }
    if (filters.status && filters.status !== 'all') {
      where.status = filters.status;
    }
    if (filters.displayOn) {
      where.displayOn = { has: filters.displayOn };
    }
    if (filters.search) {
      where.OR = [
        { reviewerName: { contains: filters.search, mode: 'insensitive' } },
        { reviewText: { contains: filters.search, mode: 'insensitive' } },
        { reviewerRole: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return prisma.review.findMany({
      where,
      orderBy: [{ isFeatured: 'desc' }, { displayOrder: 'asc' }, { createdAt: 'desc' }],
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

  static async create(rawData: any) {
    const data = { ...rawData };

    if (!data.categoryId && data.reviewType) {
      data.categoryId = data.reviewType;
    }
    if (!data.reviewType && data.categoryId) {
      data.reviewType = data.categoryId;
    }

    // Clean relatedCentreId if empty or invalid
    if (!data.relatedCentreId) {
      delete data.relatedCentreId;
    } else {
      const centre = await prisma.centre.findUnique({
        where: { id: data.relatedCentreId },
      });
      if (centre) {
        data.relatedCentreName = centre.name;
      } else {
        delete data.relatedCentreId;
      }
    }

    return prisma.review.create({
      data,
      include: {
        relatedCentre: true,
      },
    });
  }

  static async update(id: string, rawData: any) {
    await this.getById(id);
    const { id: _id, createdAt: _created, updatedAt: _updated, relatedCentre: _centre, ...data } = rawData;

    if (data.categoryId && !data.reviewType) {
      data.reviewType = data.categoryId;
    }

    if (data.relatedCentreId === '' || data.relatedCentreId === null) {
      data.relatedCentreId = null;
    } else if (data.relatedCentreId) {
      const centre = await prisma.centre.findUnique({
        where: { id: data.relatedCentreId },
      });
      if (centre) {
        data.relatedCentreName = centre.name;
      } else {
        data.relatedCentreId = null;
      }
    }

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
