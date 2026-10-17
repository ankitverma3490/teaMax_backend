import prisma from '../utils/prisma';
import { AppError } from '../middleware/error.middleware';

export class CategoryService {
  static async getAll(status?: string) {
    const where: any = {};
    if (status) {
      where.status = status;
    }
    return prisma.category.findMany({
      where,
      orderBy: { displayOrder: 'asc' },
      include: {
        _count: {
          select: { menuItems: true },
        },
      },
    });
  }

  static async getById(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        menuItems: {
          orderBy: { displayOrder: 'asc' },
        },
      },
    });
    if (!category) {
      throw new AppError('Category not found', 404);
    }
    return category;
  }

  static async getBySlug(slug: string) {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        menuItems: {
          orderBy: { displayOrder: 'asc' },
        },
      },
    });
    if (!category) {
      throw new AppError('Category not found', 404);
    }
    return category;
  }

  static async create(data: {
    name: string;
    slug: string;
    icon?: string;
    image?: string;
    description?: string;
    displayOrder?: number;
    status?: string;
  }) {
    const existing = await prisma.category.findUnique({
      where: { slug: data.slug },
    });
    if (existing) {
      throw new AppError('Category slug already exists', 409);
    }

    return prisma.category.create({ data });
  }

  static async update(id: string, data: Partial<{
    name: string;
    slug: string;
    icon?: string;
    image?: string;
    description?: string;
    displayOrder?: number;
    status?: string;
  }>) {
    await this.getById(id);
    return prisma.category.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    await this.getById(id);
    return prisma.category.delete({
      where: { id },
    });
  }
}
