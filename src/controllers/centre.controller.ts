import { Request, Response, NextFunction } from 'express';
import { CentreService } from '../services/centre.service';
import { sendSuccess } from '../utils/apiResponse';

export class CentreController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { city, state, status, isFeatured, search } = req.query;

      const centres = await CentreService.getAll({
        city: city as string,
        state: state as string,
        status: status as string,
        isFeatured: isFeatured ? isFeatured === 'true' : undefined,
        search: search as string,
      });

      return sendSuccess(res, centres, 'Centres fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const centre = id.startsWith('centre-') || id.length > 15
        ? await CentreService.getById(id)
        : await CentreService.getBySlug(id);

      return sendSuccess(res, centre, 'Centre details fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const centre = await CentreService.create(req.body);
      return sendSuccess(res, centre, 'Centre created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updated = await CentreService.update(id, req.body);
      return sendSuccess(res, updated, 'Centre updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await CentreService.delete(id);
      return sendSuccess(res, null, 'Centre deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
