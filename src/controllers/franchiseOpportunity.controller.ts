import { Request, Response, NextFunction } from 'express';
import { FranchiseOpportunityService } from '../services/franchiseOpportunity.service';
import { sendSuccess } from '../utils/apiResponse';

export class FranchiseOpportunityController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { city, state, country, status, search } = req.query;

      const items = await FranchiseOpportunityService.getAll({
        city: city as string,
        state: state as string,
        country: country as string,
        status: status as string,
        search: search as string,
      });

      return sendSuccess(res, items, 'Franchise opportunities fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const item = await FranchiseOpportunityService.getById(id);
      return sendSuccess(res, item, 'Franchise opportunity fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await FranchiseOpportunityService.create(req.body);
      return sendSuccess(res, item, 'Franchise opportunity created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updated = await FranchiseOpportunityService.update(id, req.body);
      return sendSuccess(res, updated, 'Franchise opportunity updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await FranchiseOpportunityService.delete(id);
      return sendSuccess(res, null, 'Franchise opportunity deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  static async toggleStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updated = await FranchiseOpportunityService.toggleStatus(id);
      return sendSuccess(res, updated, `Franchise opportunity status updated to ${updated.status}`);
    } catch (error) {
      next(error);
    }
  }

  static async addInquiry(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await FranchiseOpportunityService.addInquiry(id, req.body);
      return sendSuccess(res, result, 'Inquiry submitted successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  static async updateInquiryStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, inquiryId } = req.params;
      const { status } = req.body;
      const updated = await FranchiseOpportunityService.updateInquiryStatus(id, inquiryId, status);
      return sendSuccess(res, updated, 'Inquiry status updated successfully');
    } catch (error) {
      next(error);
    }
  }
}

