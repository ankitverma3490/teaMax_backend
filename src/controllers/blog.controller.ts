import { Request, Response, NextFunction } from 'express';
import { BlogService } from '../services/blog.service';
import { sendSuccess } from '../utils/apiResponse';
import { AuthenticatedRequest } from '../types';

export class BlogController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { category, status, isFeatured, search } = req.query;

      const blogs = await BlogService.getAll({
        category: category as string,
        status: status as string,
        isFeatured: isFeatured ? isFeatured === 'true' : undefined,
        search: search as string,
      });

      return sendSuccess(res, blogs, 'Blogs fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const blog = await BlogService.getById(id);
      return sendSuccess(res, blog, 'Blog retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const authorId = req.user?.userId;
      const blog = await BlogService.create(req.body, authorId);
      return sendSuccess(res, blog, 'Blog created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updated = await BlogService.update(id, req.body);
      return sendSuccess(res, updated, 'Blog updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await BlogService.delete(id);
      return sendSuccess(res, null, 'Blog deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
