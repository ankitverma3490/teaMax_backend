import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';
import { AppError } from './error.middleware';

// Allowed MIME types for images
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/avif',
];

// Max file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Memory storage keeps file as Buffer in req.file.buffer / req.files
const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const extMatch = file.originalname.match(/\.(jpg|jpeg|png|webp|gif|svg|avif)$/i);
  if (ALLOWED_MIME_TYPES.includes(file.mimetype) || (file.mimetype === 'application/octet-stream' && extMatch)) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        `Invalid file format (${file.mimetype}). Supported formats: PNG, JPG, JPEG, WEBP, GIF, SVG, AVIF.`,
        400
      )
    );
  }
};

export const uploadSingleImage = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
}).single('file');

export const uploadMultipleImages = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
}).array('files', 12); // up to 12 images at once
