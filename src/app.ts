import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { config } from './config/env';
import apiV1Routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import prisma from './utils/prisma';

export const createApp = (): Application => {
  const app = express();

  // Security HTTP headers
  app.use(helmet());

  // Enable CORS
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
        if (!origin) return callback(null, true);
        if (config.corsOrigins.includes('*') || config.corsOrigins.includes(origin)) {
          return callback(null, true);
        }
        // In local development, allow any localhost origin
        if (!config.isProduction && origin.includes('localhost')) {
          return callback(null, true);
        }
        return callback(null, true);
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    })
  );

  // Compress responses
  app.use(compression());

  // Body parsers
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Request logger
  app.use(morgan(config.isProduction ? 'combined' : 'dev'));

  // Health check endpoint
  app.get(['/health', '/api/health'], async (req: Request, res: Response) => {
    let dbStatus = 'unknown';
    try {
      await prisma.$queryRaw`SELECT 1`;
      dbStatus = 'connected';
    } catch (err: any) {
      dbStatus = `disconnected (${err.message})`;
    }

    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: config.nodeEnv,
      database: dbStatus,
      version: '1.0.0',
    });
  });

  // Root welcome & API index
  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
      message: '☕ Welcome to the TeaMax Café REST API',
      version: '1.0.0',
      documentation: '/api/v1',
      endpoints: {
        health: '/api/health',
        auth: '/api/v1/auth',
        categories: '/api/v1/categories',
        menuItems: '/api/v1/menu-items',
        centres: '/api/v1/centres',
        reviews: '/api/v1/reviews',
        blogs: '/api/v1/blogs',
        offers: '/api/v1/offers',
        enquiries: '/api/v1/enquiries',
        dashboard: '/api/v1/dashboard',
        upload: '/api/v1/upload',
      },
    });
  });

  // Mount API v1 router
  app.use('/api/v1', apiV1Routes);

  // 404 Handler
  app.use(notFoundHandler);

  // Global Error Handler
  app.use(errorHandler);

  return app;
};

export default createApp;
