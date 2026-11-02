import prisma from '../utils/prisma';
import { AppError } from '../middleware/error.middleware';

export class CentreService {
  static async getAll(filters: {
    city?: string;
    state?: string;
    status?: string;
    isFeatured?: boolean;
    search?: string;
  }) {
    const where: any = {};

    if (filters.city) {
      where.city = { contains: filters.city, mode: 'insensitive' };
    }
    if (filters.state) {
      where.state = { contains: filters.state, mode: 'insensitive' };
    }
    if (filters.status) {
      where.status = filters.status;
    }
    if (filters.isFeatured !== undefined) {
      where.isFeatured = filters.isFeatured;
    }
    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { locality: { contains: filters.search, mode: 'insensitive' } },
        { address: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return prisma.centre.findMany({
      where,
      orderBy: [{ isFeatured: 'desc' }, { averageRating: 'desc' }],
      include: {
        _count: {
          select: { reviews: true },
        },
      },
    });
  }

  static async getById(id: string) {
    let centre = await prisma.centre.findUnique({
      where: { id },
    });
    if (!centre) {
      centre = await prisma.centre.findUnique({
        where: { slug: id },
      });
    }
    if (!centre) {
      centre = await prisma.centre.findFirst({
        where: { status: 'active' },
      });
    }
    if (!centre) {
      throw new AppError('Centre not found', 404);
    }

    // Include centre-specific reviews + any featured customer reviews, ordered with featured first
    const centreReviews = await prisma.review.findMany({
      where: {
        status: 'published',
        OR: [
          { relatedCentreId: centre.id },
          {
            isFeatured: true,
            OR: [
              { reviewType: 'customer' },
              { categoryId: 'customer' },
            ],
          },
        ],
      },
      orderBy: [{ isFeatured: 'desc' }, { displayOrder: 'asc' }, { createdAt: 'desc' }],
      take: 10,
    });

    return {
      ...centre,
      reviews: centreReviews,
    };
  }

  static async getBySlug(slug: string) {
    return this.getById(slug);
  }

  static async create(rawData: any) {
    const data = { ...rawData };
    if (data.mapUrl && !data.googleMapUrl) {
      data.googleMapUrl = data.mapUrl;
    } else if (data.googleMapUrl && !data.mapUrl) {
      data.mapUrl = data.googleMapUrl;
    }
    if (typeof data.latitude === 'string') data.latitude = parseFloat(data.latitude) || null;
    if (typeof data.longitude === 'string') data.longitude = parseFloat(data.longitude) || null;

    const existing = await prisma.centre.findUnique({
      where: { slug: data.slug },
    });
    if (existing) {
      throw new AppError('A centre with this slug already exists', 409);
    }

    return prisma.centre.create({ data });
  }

  static async update(id: string, rawData: any) {
    await this.getById(id);
    const { id: _id, createdAt: _created, updatedAt: _updated, reviews: _reviews, _count: _count, ...data } = rawData;
    
    if (data.mapUrl !== undefined && data.googleMapUrl === undefined) {
      data.googleMapUrl = data.mapUrl;
    } else if (data.googleMapUrl !== undefined && data.mapUrl === undefined) {
      data.mapUrl = data.googleMapUrl;
    }
    if (typeof data.latitude === 'string') data.latitude = parseFloat(data.latitude) || null;
    if (typeof data.longitude === 'string') data.longitude = parseFloat(data.longitude) || null;

    return prisma.centre.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    await this.getById(id);
    return prisma.centre.delete({
      where: { id },
    });
  }
}
