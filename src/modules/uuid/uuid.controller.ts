import { Controller, Post, Get } from '@nestjs/common';
import { UuidService } from './uuid.service';

@Controller('api/v1/uuid')
export class UuidController {
  constructor(private readonly uuidService: UuidService) {}

  @Post('generate')
  generate(): { data: { uuid: string } } {
    const uuid = this.uuidService.generate();
    return { data: { uuid } };
  }

  @Get('health')
  health(): { data: { status: string } } {
    return { data: { status: 'ok' } };
  }
}