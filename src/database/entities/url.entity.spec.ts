import { Url } from './url.entity';
import { DataSource } from 'typeorm';

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

    const url1 = urlRepository.create({
      originalUrl: 'https://example.com/first',
      shortCode: 'unique1',
    });
    await urlRepository.save(url1);

    const url2 = urlRepository.create({
      originalUrl: 'https://example.com/second',
      shortCode: 'unique1',
    });

    await expect(urlRepository.save(url2)).rejects.toThrow();
  });
});
