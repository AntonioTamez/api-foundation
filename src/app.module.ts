import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { UuidModule } from './modules/uuid/uuid.module';
import { Url } from './database/entities/url.entity';
import { existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';

function getDatabasePath(): string {
  const dbPath = process.env.DATABASE_PATH;
  if (!dbPath || dbPath.trim() === '') {
    return 'db/api-foundation.sqlite';
  }
  return dbPath;
}

function ensureDbDirectory(): void {
  const dbPath = getDatabasePath();
  const dbDir = dirname(dbPath);
  if (dbDir && !existsSync(dbDir)) {
    try {
      mkdirSync(dbDir, { recursive: true });
    } catch (error) {
      console.error(`Failed to create database directory: ${dbDir}`, error);
    }
  }
}

function getTypeOrmConfig() {
  ensureDbDirectory();
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    type: 'sqlite' as const,
    database: getDatabasePath(),
    entities: [Url],
    synchronize: !isProduction,
    connectTimeout: 10000,
    retryAttempts: 3,
    retryDelay: 1000,
  };
}

@Module({
  imports: [
    TypeOrmModule.forRoot(getTypeOrmConfig()),
    UuidModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
