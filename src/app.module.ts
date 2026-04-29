import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { UuidModule } from './modules/uuid/uuid.module';
import { Url } from './database/entities/url.entity';
import { existsSync, mkdirSync } from 'fs';

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
    mkdirSync(dbDir, { recursive: true });
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

function dirname(filePath: string): string {
  const lastSep = filePath.lastIndexOf('/');
  return lastSep > 0 ? filePath.substring(0, lastSep) : '.';
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
