import { Request, Response, NextFunction } from 'express';
import { FranchiseInquiryService } from '../services/franchiseInquiry.service';
import { ValidatedFranchiseInquiry } from '../schemas/franchiseInquiry.schema';

export class FranchiseInquiryController {
  static async submit(req: Request, res: Response, next: NextFunction) {
    try {
      // The body has already been validated and transformed by validateRequest
      const validatedData = req.body as ValidatedFranchiseInquiry;
      const result = await FranchiseInquiryService.forwardToPabbly(validatedData);

      return res.status(200).json({
        success: true,
        message: 'Your franchise enquiry has been submitted successfully. Our team will contact you soon.',
        data: {
          submittedAt: result.payload.submitted_at,
          event: result.payload.event,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

