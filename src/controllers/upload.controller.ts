import { Request, Response, NextFunction } from 'express';
import { CloudinaryService } from '../services/cloudinary.service';
import { AppError } from '../middleware/error.middleware';
import { config } from '../config/env';

export class UploadController {
  /**
   * Health / configuration check for Cloudinary (Safe: never reveals secret)
   */
  static getStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isConfigured = CloudinaryService.isConfigured();
      res.status(200).json({
        success: true,
        data: {
          service: 'Cloudinary',
          cloudName: config.cloudinary.cloudName,
          apiKey: config.cloudinary.apiKey,
          isConfigured,
          message: isConfigured
            ? 'Cloudinary is configured and ready for uploads.'
            : 'CLOUDINARY_API_SECRET is pending in backend .env.',
        },
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Upload a single image to Cloudinary
   */
  static uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        return next(new AppError('No image file provided for upload.', 400));
      }

      const folder = (req.body.folder || req.query.folder || 'general') as string;
      const cleanFolder = folder.replace(/[^a-zA-Z0-9_-]/g, '');

      const result = await CloudinaryService.uploadBuffer(req.file.buffer, {
        folder: cleanFolder,
      });

      res.status(200).json({
        success: true,
        message: 'Image uploaded successfully to Cloudinary',
        data: {
          url: result.secure_url,
          secure_url: result.secure_url,
          public_id: result.public_id,
          format: result.format,
          width: result.width,
          height: result.height,
          bytes: result.bytes,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Upload multiple images to Cloudinary (e.g. Centre photo gallery)
   */
  static uploadMultiple = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return next(new AppError('No image files provided for upload.', 400));
      }

      const folder = (req.body.folder || req.query.folder || 'general') as string;
      const cleanFolder = folder.replace(/[^a-zA-Z0-9_-]/g, '');

      const results = await CloudinaryService.uploadMultipleBuffers(
        files.map(f => ({ buffer: f.buffer, originalname: f.originalname })),
        { folder: cleanFolder }
      );

      res.status(200).json({
        success: true,
        message: `${results.length} image(s) uploaded successfully to Cloudinary`,
        data: results.map(r => ({
          url: r.secure_url,
          secure_url: r.secure_url,
          public_id: r.public_id,
          format: r.format,
          width: r.width,
          height: r.height,
          bytes: r.bytes,
        })),
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete an image from Cloudinary by public ID or URL
   */
  static deleteImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { public_id, url } = req.body;
      const target = public_id || (url ? CloudinaryService.extractPublicId(url) : null);

      if (!target) {
        return next(new AppError('Must provide a valid public_id or Cloudinary url to delete.', 400));
      }

      const result = await CloudinaryService.deleteByPublicId(target);

      res.status(200).json({
        success: true,
        message: 'Image deleted successfully from Cloudinary',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default UploadController;
