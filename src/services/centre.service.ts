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
      include: {
        reviews: {
          where: { status: 'published' },
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    if (!centre) {
      centre = await prisma.centre.findUnique({
        where: { slug: id },
        include: {
          reviews: {
            where: { status: 'published' },
            take: 10,
            orderBy: { createdAt: 'desc' },
          },
        },
      });
    }
    if (!centre) {
      centre = await prisma.centre.findFirst({
        where: { status: 'active' },
        include: {
          reviews: {
            where: { status: 'published' },
            take: 10,
            orderBy: { createdAt: 'desc' },
          },
        },
      });
    }
    if (!centre) {
      throw new AppError('Centre not found', 404);
    }
    return centre;
  }

  static async getBySlug(slug: string) {
    return this.getById(slug);
  }

  static async create(data: any) {
    const existing = await prisma.centre.findUnique({
      where: { slug: data.slug },
    });
    if (existing) {
      throw new AppError('A centre with this slug already exists', 409);
    }

    return prisma.centre.create({ data });
  }

  static async update(id: string, data: any) {
    await this.getById(id);
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
