import { Test, TestingModule } from '@nestjs/testing';
import { UuidService } from './uuid.service';

describe('UuidService', () => {
  let service: UuidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UuidService],
    }).compile();

    service = module.get<UuidService>(UuidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a valid UUID v4', () => {
    const uuid = service.generate();
    expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  it('should generate unique UUIDs', () => {
    const uuid1 = service.generate();
    const uuid2 = service.generate();
    expect(uuid1).not.toBe(uuid2);
  });
});