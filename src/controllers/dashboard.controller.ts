import { Response, NextFunction } from 'express';
import { DashboardService } from '../services/dashboard.service';
import { sendSuccess } from '../utils/apiResponse';
import { AuthenticatedRequest } from '../types';

export class DashboardController {
  static async getStats(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const stats = await DashboardService.getStats();
      return sendSuccess(res, stats, 'Dashboard statistics fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getRecentActivity(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const activity = await DashboardService.getRecentActivity();
      return sendSuccess(res, activity, 'Recent activity fetched successfully');
    } catch (error) {
      next(error);
    }
  }
}
