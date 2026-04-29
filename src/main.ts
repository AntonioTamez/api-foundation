import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  let isShuttingDown = false;
    let shutdownInitiated = false;

  try {
    const app = await NestFactory.create(AppModule);
    const portEnv = process.env.PORT;
    const parsedPort = portEnv ? parseInt(portEnv.trim(), 10) : NaN;
    const port = isNaN(parsedPort) ? 3000 : parsedPort;

    if (port < 0 || port > 65535) {
      throw new Error(`Invalid PORT environment variable: ${portEnv}. Must be a number between 0 and 65535.`);
    }

    const server = await app.listen(port);
    const serverAddress = server.address();
    const actualPort = serverAddress && typeof serverAddress !== 'string' ? (serverAddress.port ?? port) : port;
    console.log(`Application is running on: http://localhost:${actualPort}`);

    const shutdown = async (signal: string) => {
      if (shutdownInitiated) return;
      shutdownInitiated = true;
      console.log(`Received ${signal}. Shutting down gracefully...`);
      try {
        const closePromise = app.close();
        const timeoutPromise = new Promise<void>((resolve) => setTimeout(resolve, 10000));
        await Promise.race([closePromise, timeoutPromise]);
        console.log('Application closed.');
        process.exit(0);
      } catch (closeError) {
        console.error('Error during shutdown:', closeError instanceof Error ? closeError.message : closeError);
        process.exit(1);
      }
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    console.error('Failed to start application:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
bootstrap();
