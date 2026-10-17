import { createApp } from './app';
import { config } from './config/env';
import prisma from './utils/prisma';

const app = createApp();

const server = app.listen(config.port, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   ☕  TeaMax Backend Server Started Successfully!          ║
║                                                            ║
║   Environment:  ${config.nodeEnv.padEnd(41)}  ║
║   Port:         ${String(config.port).padEnd(41)}  ║
║   Local URL:    http://localhost:${String(config.port).padEnd(25)}  ║
║   Health Check: http://localhost:${config.port}/api/health${' '.repeat(17)}║
║   API Base:     http://localhost:${config.port}/api/v1${' '.repeat(21)}║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown handling
const handleGracefulShutdown = async (signal: string) => {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  server.close(async () => {
    console.log('HTTP server closed.');
    try {
      await prisma.$disconnect();
      console.log('Prisma database client disconnected.');
    } catch (e) {
      console.error('Error during database disconnect:', e);
    }
    process.exit(0);
  });

  // Force shutdown after 10s if graceful fails
  setTimeout(() => {
    console.error('Forced shutdown after timeout.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));
process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));

process.on('unhandledRejection', (reason: any) => {
  console.error('💥 Unhandled Rejection:', reason);
});

process.on('uncaughtException', (err: Error) => {
  console.error('💥 Uncaught Exception:', err);
  process.exit(1);
});
