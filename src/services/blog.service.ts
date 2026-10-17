import prisma from '../utils/prisma';
import { AppError } from '../middleware/error.middleware';

export class BlogService {
  static async getAll(filters: {
    category?: string;
    status?: string;
    isFeatured?: boolean;
    search?: string;
  }) {
    const where: any = {};

    if (filters.category) {
      where.category = filters.category;
    }
    if (filters.status) {
      where.status = filters.status;
    }
    if (filters.isFeatured !== undefined) {
      where.isFeatured = filters.isFeatured;
    }
    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { excerpt: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return prisma.blog.findMany({
      where,
      orderBy: { publishDate: 'desc' },
    });
  }

  static async getById(idOrSlug: string) {
    let blog = await prisma.blog.findUnique({
      where: { id: idOrSlug },
    });
    if (!blog) {
      blog = await prisma.blog.findUnique({
        where: { slug: idOrSlug },
      });
    }
    if (!blog) {
      throw new AppError('Blog not found', 404);
    }
    return blog;
  }

  static async getBySlug(slug: string) {
    const blog = await prisma.blog.findUnique({
      where: { slug },
    });
    if (!blog) {
      throw new AppError('Blog not found', 404);
    }
    return blog;
  }

  static async create(data: any, authorId?: string) {
    const existing = await prisma.blog.findUnique({
      where: { slug: data.slug },
    });
    if (existing) {
      throw new AppError('A blog with this slug already exists', 409);
    }

    return prisma.blog.create({
      data: {
        ...data,
        authorId,
        publishDate: data.publishDate ? new Date(data.publishDate) : undefined,
      },
    });
  }

  static async update(id: string, data: any) {
    await this.getById(id);
    return prisma.blog.update({
      where: { id },
      data: {
        ...data,
        publishDate: data.publishDate ? new Date(data.publishDate) : undefined,
      },
    });
  }

  static async delete(id: string) {
    await this.getById(id);
    return prisma.blog.delete({
      where: { id },
    });
  }
}
