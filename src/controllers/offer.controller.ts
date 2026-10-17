import { Request, Response, NextFunction } from 'express';
import { OfferService } from '../services/offer.service';
import { sendSuccess } from '../utils/apiResponse';

export class OfferController {
  static async getPrimaryOffer(req: Request, res: Response, next: NextFunction) {
    try {
      const offer = await OfferService.getPrimaryOffer();
      return sendSuccess(res, offer, 'Primary active offer fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, isFeatured, activeOnly } = req.query;

      const offers = await OfferService.getAll({
        status: status as string,
        isFeatured: isFeatured ? isFeatured === 'true' : undefined,
        activeOnly: activeOnly === 'true',
      });

      return sendSuccess(res, offers, 'Offers retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const offer = await OfferService.getById(id);
      return sendSuccess(res, offer, 'Offer retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const offer = await OfferService.create(req.body);
      return sendSuccess(res, offer, 'Offer created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updated = await OfferService.update(id, req.body);
      return sendSuccess(res, updated, 'Offer updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await OfferService.delete(id);
      return sendSuccess(res, null, 'Offer deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
