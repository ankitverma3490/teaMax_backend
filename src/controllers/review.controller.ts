import { Request, Response, NextFunction } from 'express';
import { ReviewService } from '../services/review.service';
import { sendSuccess } from '../utils/apiResponse';

export class ReviewController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { reviewType, relatedCentreId, isFeatured, status, displayOn } = req.query;

      const reviews = await ReviewService.getAll({
        reviewType: reviewType as string,
        relatedCentreId: relatedCentreId as string,
        isFeatured: isFeatured ? isFeatured === 'true' : undefined,
        status: status as string,
        displayOn: displayOn as string,
      });

      return sendSuccess(res, reviews, 'Reviews fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const review = await ReviewService.getById(id);
      return sendSuccess(res, review, 'Review fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const review = await ReviewService.create(req.body);
      return sendSuccess(res, review, 'Review created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updated = await ReviewService.update(id, req.body);
      return sendSuccess(res, updated, 'Review updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await ReviewService.delete(id);
      return sendSuccess(res, null, 'Review deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
