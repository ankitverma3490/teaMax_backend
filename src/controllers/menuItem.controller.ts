import { Request, Response, NextFunction } from 'express';
import { MenuItemService } from '../services/menuItem.service';
import { sendSuccess } from '../utils/apiResponse';

export class MenuItemController {
  static async getFeatured(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 6;
      const items = await MenuItemService.getFeatured(limit);
      return sendSuccess(res, items, 'Featured menu items fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async toggleFeatured(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updated = await MenuItemService.toggleFeatured(id);
      return sendSuccess(res, updated, 'Featured status toggled successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId, dietary, availability, isFeatured, isPopular, search, page, limit } = req.query;

      const result = await MenuItemService.getAll({
        categoryId: categoryId as string,
        dietary: dietary as string,
        availability: availability as string,
        isFeatured: isFeatured ? isFeatured === 'true' : undefined,
        isPopular: isPopular ? isPopular === 'true' : undefined,
        search: search as string,
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
      });

      return sendSuccess(res, result.items, 'Menu items fetched successfully', 200, result.meta);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const item = await MenuItemService.getById(id);
      return sendSuccess(res, item, 'Menu item fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await MenuItemService.create(req.body);
      return sendSuccess(res, item, 'Menu item created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updated = await MenuItemService.update(id, req.body);
      return sendSuccess(res, updated, 'Menu item updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await MenuItemService.delete(id);
      return sendSuccess(res, null, 'Menu item deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
