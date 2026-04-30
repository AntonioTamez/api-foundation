import { Url } from './url.entity';
import { DataSource } from 'typeorm';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

describe('Url Entity', () => {
  let dataSource: DataSource;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      entities: [Url],
      synchronize: true,
    });
    await dataSource.initialize();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should create a URL entity with all required fields', () => {
    const url = new Url();
    url.originalUrl = 'https://example.com/very/long/url';
    url.shortCode = 'abc123';

    expect(url.originalUrl).toBe('https://example.com/very/long/url');
    expect(url.shortCode).toBe('abc123');
  });

  it('should have synchronize enabled and create the urls table', async () => {
    const urlRepository = dataSource.getRepository(Url);
    const metadata = dataSource.getMetadata(Url);

    expect(metadata.tableName).toBe('urls');

    const url = urlRepository.create({
      originalUrl: 'https://example.com/test',
      shortCode: 'test123',
    });
    const savedUrl = await urlRepository.save(url);

    expect(savedUrl.id).toBeDefined();
    expect(savedUrl.originalUrl).toBe('https://example.com/test');
    expect(savedUrl.shortCode).toBe('test123');
    expect(savedUrl.createdAt).toBeDefined();
    expect(savedUrl.updatedAt).toBeDefined();
  });

  it('should enforce unique constraint on shortCode', async () => {
    const urlRepository = dataSource.getRepository(Url);
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const url1 = urlRepository.create({
        originalUrl: 'https://example.com/first',
        shortCode: 'unique1',
      });
      await queryRunner.manager.save(url1);
      await queryRunner.commitTransaction();
    } catch {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    const url2 = urlRepository.create({
      originalUrl: 'https://example.com/second',
      shortCode: 'unique1',
    });

    await expect(urlRepository.save(url2)).rejects.toThrow();
  });

  it('should validate shortCode format - only alphanumeric with hyphens/underscores', async () => {
    const invalidUrl = plainToClass(Url, {
      originalUrl: 'https://example.com/test',
      shortCode: 'invalid code!',
    });

    const errors = await validate(invalidUrl);
    const shortCodeErrors = errors.filter(e => e.property === 'shortCode');

    expect(shortCodeErrors.length).toBeGreaterThan(0);
    expect(shortCodeErrors[0].constraints?.matches).toBeDefined();
  });

  it('should validate shortCode length - between 6 and 8 characters', async () => {
    const shortUrl = plainToClass(Url, {
      originalUrl: 'https://example.com/test',
      shortCode: 'abc',
    });

    const errors = await validate(shortUrl);
    const shortCodeErrors = errors.filter(e => e.property === 'shortCode');

    expect(shortCodeErrors.length).toBeGreaterThan(0);
    expect(shortCodeErrors[0].constraints?.minLength).toBeDefined();
  });

  it('should validate shortCode length - max 8 characters', async () => {
    const longCodeUrl = plainToClass(Url, {
      originalUrl: 'https://example.com/test',
      shortCode: 'abcdefghi',
    });

    const errors = await validate(longCodeUrl);
    const shortCodeErrors = errors.filter(e => e.property === 'shortCode');

    expect(shortCodeErrors.length).toBeGreaterThan(0);
    expect(shortCodeErrors[0].constraints?.maxLength).toBeDefined();
  });

  it('should validate originalUrl - must be a valid URL', async () => {
    const invalidUrl = plainToClass(Url, {
      originalUrl: 'not-a-valid-url',
      shortCode: 'valid123',
    });

    const errors = await validate(invalidUrl);
    const urlErrors = errors.filter(e => e.property === 'originalUrl');

    expect(urlErrors.length).toBeGreaterThan(0);
    expect(urlErrors[0].constraints?.isUrl).toBeDefined();
  });

  it('should validate originalUrl - max 2048 characters', async () => {
    const longUrl = plainToClass(Url, {
      originalUrl: 'https://example.com/' + 'a'.repeat(2040),
      shortCode: 'valid123',
    });

    const errors = await validate(longUrl);
    const urlErrors = errors.filter(e => e.property === 'originalUrl');

    expect(urlErrors.length).toBeGreaterThan(0);
    expect(urlErrors[0].constraints?.maxLength).toBeDefined();
  });

  it('should accept valid shortCode with hyphens and underscores', async () => {
    const validUrl = plainToClass(Url, {
      originalUrl: 'https://example.com/test',
      shortCode: 'valid_12',
    });

    const errors = await validate(validUrl);
    const shortCodeErrors = errors.filter(e => e.property === 'shortCode');

    expect(shortCodeErrors.length).toBe(0);
  });
});
