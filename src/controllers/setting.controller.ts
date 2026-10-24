import { Request, Response, NextFunction } from 'express';
import { SettingService } from '../services/setting.service';
import { sendSuccess } from '../utils/apiResponse';
import { AppError } from '../middleware/error.middleware';

// Allowed setting keys (whitelist)
const ALLOWED_KEYS = ['moments'];

export class SettingController {
  /** GET /settings/:key  — public */
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { key } = req.params;
      if (!ALLOWED_KEYS.includes(key)) {
        return next(new AppError(`Unknown setting key: ${key}`, 400));
      }
      const value = await SettingService.get(key);
      return sendSuccess(res, value ?? null, `Setting "${key}" fetched`);
    } catch (error) {
      next(error);
    }
  }

  /** PUT /settings/:key  — protected */
  static async set(req: Request, res: Response, next: NextFunction) {
    try {
      const { key } = req.params;
      if (!ALLOWED_KEYS.includes(key)) {
        return next(new AppError(`Unknown setting key: ${key}`, 400));
      }
      const value = await SettingService.set(key, req.body);
      return sendSuccess(res, value, `Setting "${key}" saved`);
    } catch (error) {
      next(error);
    }
  }
}
