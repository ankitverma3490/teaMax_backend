import prisma from '../utils/prisma';
import { AppError } from '../middleware/error.middleware';

export class MenuItemService {
  static async getAll(filters: {
    categoryId?: string;
    dietary?: string;
    availability?: string;
    isFeatured?: boolean;
    isPopular?: boolean;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const page = filters.page && filters.page > 0 ? filters.page : 1;
    const limit = filters.limit && filters.limit > 0 ? filters.limit : 50;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (filters.categoryId) {
      where.categoryId = filters.categoryId;
    }
    if (filters.dietary) {
      where.dietary = filters.dietary;
    }
    if (filters.availability) {
      where.availability = filters.availability;
    }
    if (filters.isFeatured !== undefined) {
      where.isFeatured = filters.isFeatured;
    }
    if (filters.isPopular !== undefined) {
      where.isPopular = filters.isPopular;
    }
    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.menuItem.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
        include: {
          category: {
            select: { id: true, name: true, slug: true },
          },
        },
      }),
      prisma.menuItem.count({ where }),
    ]);

    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getFeatured(limit = 6) {
    const maxItems = Math.min(6, Math.max(1, limit));
    const items = await prisma.menuItem.findMany({
      where: {
        isFeatured: true,
        availability: { not: 'out_of_stock' },
      },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
      take: maxItems,
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
    });
    return items;
  }

  static async toggleFeatured(id: string) {
    const item = await this.getById(id);
    return prisma.menuItem.update({
      where: { id },
      data: { isFeatured: !item.isFeatured },
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
    });
  }

  static async getById(id: string) {
    const item = await prisma.menuItem.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
    if (!item) {
      throw new AppError('Menu item not found', 404);
    }
    return item;
  }

  static async create(data: {
    name: string;
    categoryId: string;
    price: number;
    description?: string;
    image?: string;
    isFeatured?: boolean;
    isPopular?: boolean;
    availability?: string;
    dietary?: string;
    displayOrder?: number;
    rating?: number;
  }) {
    // Verify category exists by id or slug
    let category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });
    if (!category) {
      category = await prisma.category.findFirst({
        where: {
          OR: [
            { slug: data.categoryId },
            { name: data.categoryId },
          ],
        },
      });
      if (category) {
        data.categoryId = category.id;
      }
    }
    if (!category) {
      throw new AppError('Category specified does not exist', 400);
    }

    return prisma.menuItem.create({
      data,
      include: {
        category: true,
      },
    });
  }

  static async update(id: string, data: Partial<{
    name: string;
    categoryId: string;
    price: number;
    description?: string;
    image?: string;
    isFeatured?: boolean;
    isPopular?: boolean;
    availability?: string;
    dietary?: string;
    displayOrder?: number;
    rating?: number;
  }>) {
    await this.getById(id);

    if (data.categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: data.categoryId },
      });
      if (!category) {
        throw new AppError('Category specified does not exist', 400);
      }
    }

    return prisma.menuItem.update({
      where: { id },
      data,
      include: {
        category: true,
      },
    });
  }

  static async delete(id: string) {
    await this.getById(id);
    return prisma.menuItem.delete({
      where: { id },
    });
  }
}
