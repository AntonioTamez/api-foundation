import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const portEnv = process.env.PORT;
    const port = portEnv ? parseInt(portEnv, 10) : 3000;

    if (isNaN(port) || port < 0 || port > 65535) {
      throw new Error(`Invalid PORT environment variable: "${portEnv}". Must be a number between 0 and 65535.`);
    }

    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);

    const shutdown = async (signal: string) => {
      console.log(`Received ${signal}. Shutting down gracefully...`);
      await app.close();
      console.log('Application closed.');
      process.exit(0);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    console.error('Failed to start application:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
bootstrap();
