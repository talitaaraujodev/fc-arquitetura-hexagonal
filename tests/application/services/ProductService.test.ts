import { ProductService } from '../../../src/application/services/ProductService';
import { createMock } from 'ts-auto-mock';
import { ProductPersistence } from '../../../src/application/ports/output/ProductPersistenceOutputPort';
import { ValidationError } from '../../../src/util/errors/ValidationError';

describe('Product Service tests', () => {
  const mockProductPersistenceAdapter = createMock<ProductPersistence>();
  const productService = new ProductService(mockProductPersistenceAdapter);

  test('create_whenProductValid_returnSuccess', async () => {
    expect(async () => {
      await productService.create('Product test', 10);
    }).not.toThrow(ValidationError);
  });
  test('create_whenProductInalid_returnValidationError', async () => {
    await expect(productService.create('', 10)).rejects.toBeInstanceOf(
      ValidationError
    );
  });
  test('findOne_whenProductValid_returnSuccess', async () => {
    expect(async () => {
      await productService.findOne(123);
    }).not.toThrow(Error);
  });

  test('disabled_whenProductValid_returnSuccess', async () => {
    const product = await productService.create('Product Disable', 10);
    product.price = 0;

    expect(async () => {
      await productService.disable(product);
    }).not.toThrow(Error);
  });
  test('enabled_whenProductValid_returnSuccess', async () => {
    const product = await productService.create('Product Enabled', 10);

    expect(async () => {
      await productService.enable(product);
    }).not.toThrow(Error);
  });
});
