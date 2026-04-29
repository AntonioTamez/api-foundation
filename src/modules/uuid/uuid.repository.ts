import { Injectable } from '@nestjs/common';

@Injectable()
export class UuidRepository {
  async create(_uuid: string): Promise<void> {
    return;
  }

  async findByUuid(uuid: string): Promise<string | null> {
    return uuid;
  }
}