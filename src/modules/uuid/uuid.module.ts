import { Module } from '@nestjs/common';
import { UuidController } from './uuid.controller';
import { UuidService } from './uuid.service';
import { UuidRepository } from './uuid.repository';

@Module({
  controllers: [UuidController],
  providers: [UuidService, UuidRepository],
  exports: [UuidService],
})
export class UuidModule {}