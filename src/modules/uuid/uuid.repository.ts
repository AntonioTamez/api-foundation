import { Injectable } from '@nestjs/common';

@Injectable()
export class UuidRepository {
  async create(uuid: string): Promise<void> {
    return;
  }

  async findByUuid(uuid: string): Promise<string | null> {
    return uuid;
  }
}