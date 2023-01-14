import { DataSource } from 'typeorm';
import { ProductEntity } from '../../../../src/adapter/output/persistense/entities/ProductEntity';

describe('ProductPersistenceAdapter tests', () => {
  const TestDataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [ProductEntity],
    synchronize: true,
    logging: false,
    migrations: [`${__dirname} /database/migrations/*.ts`],
  });

  beforeAll(async () => {
    await TestDataSource.initialize();
  });
  afterAll(async () => {
    await TestDataSource.destroy();
  });

  test('findBy_whenProductValid_returnSuccess', async () => {
    const repository = TestDataSource.getRepository(ProductEntity);
    await repository.save({
      id: 1,
      name: 'Product test',
      price: 10,
      status: 2,
    });
    const product: any = await repository.findBy({ id: 1 });

    expect(product[0].name).toBe('Product test');
    expect(product[0].price).toBe(10);
    expect(product[0]).toHaveProperty('name');
  });

  test('save_whenProductValid_returnSuccess', async () => {
    const repository = TestDataSource.getRepository(ProductEntity);

    const product: any = await repository.save({
      id: 1,
      name: 'Product test',
      price: 10,
      status: 2,
    });

    expect(product.name).toBe('Product test');
    expect(product.price).toBe(10);
    expect(product).toHaveProperty('name');
  });
  test('update_whenProductValid_returnSuccess', async () => {
    const repository = TestDataSource.getRepository(ProductEntity);
    await repository.save({
      id: 1,
      name: 'Product test',
      price: 10,
      status: 2,
    });
    const product: any = await repository.findBy({ id: 1 });

    const productEntityUpdate: any = await repository.save({
      id: 1,
      name: 'Product test update',
      price: 10,
      status: 2,
    });

    expect(product[0].name).not.toBe(productEntityUpdate.name);
    expect(productEntityUpdate).toHaveProperty('name');
  });
});
