import { Module } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
