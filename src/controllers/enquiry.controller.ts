import { Request, Response, NextFunction } from 'express';
import { EnquiryService } from '../services/enquiry.service';
import { sendSuccess } from '../utils/apiResponse';

export class EnquiryController {
  static async submit(req: Request, res: Response, next: NextFunction) {
    try {
      const enquiry = await EnquiryService.submit(req.body);
      return sendSuccess(
        res,
        enquiry,
        'Franchise application received successfully. Our team will contact you shortly.',
        201
      );
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, city } = req.query;
      const enquiries = await EnquiryService.getAll({
        status: status as string,
        city: city as string,
      });
      return sendSuccess(res, enquiries, 'Franchise enquiries retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const enquiry = await EnquiryService.getById(id);
      return sendSuccess(res, enquiry, 'Enquiry retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, notes } = req.body;
      const updated = await EnquiryService.updateStatus(id, status, notes);
      return sendSuccess(res, updated, 'Enquiry status updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await EnquiryService.delete(id);
      return sendSuccess(res, null, 'Enquiry deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
