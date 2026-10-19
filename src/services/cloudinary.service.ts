import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { Readable } from 'stream';
import { config } from '../config/env';

// Configure Cloudinary SDK with environment variables
cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
  secure: true,
});

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  resource_type: string;
}

export interface UploadOptions {
  folder?: string;
  publicId?: string;
  tags?: string[];
  transformation?: any[];
}

export class CloudinaryService {
  /**
   * Check if Cloudinary credentials are fully provided
   */
  static isConfigured(): boolean {
    return Boolean(
      config.cloudinary.cloudName &&
      config.cloudinary.apiKey &&
      config.cloudinary.apiSecret &&
      config.cloudinary.apiSecret !== 'your_regenerated_api_secret'
    );
  }

  /**
   * Ensure credentials are present before attempting Cloudinary API operations
   */
  private static ensureConfigured(): void {
    if (!this.isConfigured()) {
      throw new Error(
        'Cloudinary is not fully configured. Please set a valid CLOUDINARY_API_SECRET in the backend .env file.'
      );
    }
  }

  /**
   * Upload an in-memory file buffer directly to Cloudinary
   */
  static async uploadBuffer(
    buffer: Buffer,
    options: UploadOptions = {}
  ): Promise<CloudinaryUploadResult> {
    this.ensureConfigured();

    const folder = options.folder ? `teamax/${options.folder}` : 'teamax/general';

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          public_id: options.publicId,
          tags: ['teamax', ...(options.tags || [])],
          resource_type: 'image',
          // Deliver optimal quality & modern format (WebP/AVIF) without changing dimensions
          transformation: options.transformation || [
            { quality: 'auto', fetch_format: 'auto' }
          ],
        },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error) {
            console.error('[Cloudinary Upload Error]:', error);
            return reject(new Error(error.message || 'Failed to upload image to Cloudinary'));
          }
          if (!result) {
            return reject(new Error('Cloudinary returned an empty response'));
          }

          resolve({
            public_id: result.public_id,
            secure_url: result.secure_url,
            url: result.url,
            format: result.format,
            width: result.width,
            height: result.height,
            bytes: result.bytes,
            resource_type: result.resource_type,
          });
        }
      );

      const readableStream = new Readable();
      readableStream.push(buffer);
      readableStream.push(null);
      readableStream.pipe(uploadStream);
    });
  }

  /**
   * Upload multiple image buffers sequentially or in parallel
   */
  static async uploadMultipleBuffers(
    files: Array<{ buffer: Buffer; originalname?: string }>,
    options: UploadOptions = {}
  ): Promise<CloudinaryUploadResult[]> {
    this.ensureConfigured();
    const results: CloudinaryUploadResult[] = [];
    for (const file of files) {
      const res = await this.uploadBuffer(file.buffer, options);
      results.push(res);
    }
    return results;
  }

  /**
   * Upload an image from a remote URL directly to Cloudinary (useful for migration)
   */
  static async uploadFromRemoteUrl(
    remoteUrl: string,
    options: UploadOptions = {}
  ): Promise<CloudinaryUploadResult> {
    this.ensureConfigured();
    const folder = options.folder ? `teamax/${options.folder}` : 'teamax/general';

    try {
      const result = await cloudinary.uploader.upload(remoteUrl, {
        folder,
        public_id: options.publicId,
        tags: ['teamax', 'migration', ...(options.tags || [])],
        resource_type: 'image',
        transformation: options.transformation || [
          { quality: 'auto', fetch_format: 'auto' }
        ],
      });

      return {
        public_id: result.public_id,
        secure_url: result.secure_url,
        url: result.url,
        format: result.format,
        width: result.width,
        height: result.height,
        bytes: result.bytes,
        resource_type: result.resource_type,
      };
    } catch (err: any) {
      console.error(`[Cloudinary Remote Upload Error] ${remoteUrl}:`, err);
      throw new Error(err.message || 'Failed to upload remote image to Cloudinary');
    }
  }

  /**
   * Delete an image from Cloudinary by public ID
   */
  static async deleteByPublicId(publicId: string): Promise<{ result: string }> {
    this.ensureConfigured();
    try {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: 'image',
        invalidate: true,
      });
      return result;
    } catch (err: any) {
      console.error(`[Cloudinary Delete Error] ${publicId}:`, err);
      throw new Error(err.message || 'Failed to delete image from Cloudinary');
    }
  }

  /**
   * Extract public ID from a Cloudinary URL (e.g. https://res.cloudinary.com/teamax/image/upload/v1234/teamax/menu/item.jpg)
   */
  static extractPublicId(urlOrPublicId: string): string | null {
    if (!urlOrPublicId) return null;
    if (!urlOrPublicId.startsWith('http://') && !urlOrPublicId.startsWith('https://')) {
      return urlOrPublicId; // Already a public_id
    }
    if (!urlOrPublicId.includes('cloudinary.com')) {
      return null; // Not a Cloudinary URL
    }

    try {
      const matches = urlOrPublicId.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-zA-Z0-9]+)?$/);
      if (matches && matches[1]) {
        return matches[1];
      }
    } catch {
      return null;
    }
    return null;
  }

  /**
   * Delete image using its URL if it is a Cloudinary URL
   */
  static async deleteByUrl(url: string): Promise<boolean> {
    const publicId = this.extractPublicId(url);
    if (!publicId) return false;
    try {
      await this.deleteByPublicId(publicId);
      return true;
    } catch (err) {
      console.warn(`[Cloudinary deleteByUrl warning] Failed to delete ${publicId}:`, err);
      return false;
    }
  }
}

export default CloudinaryService;
