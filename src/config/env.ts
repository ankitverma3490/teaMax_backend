import dotenv from 'dotenv';
import path from 'path';

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/teamax_db?schema=public',
  jwtSecret: process.env.JWT_SECRET || 'teamax_ultra_secure_jwt_secret_token_default_2026',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  corsOrigins: (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:3000,http://localhost:3001')
    .split(',')
    .map(origin => origin.trim()),
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'teamax',
    apiKey: process.env.CLOUDINARY_API_KEY || '116745355719353',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
    isConfigured: Boolean(
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET &&
      process.env.CLOUDINARY_API_SECRET !== 'your_regenerated_api_secret'
    ),
  },
};
