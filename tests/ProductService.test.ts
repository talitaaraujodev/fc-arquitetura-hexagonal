import { container } from 'tsyringe';
import { ProductService } from '../src/application/services/ProductService';
import { ProductController } from '../src/adapter/input/controllers/ProductController';
import { ProductPersistenceAdapter } from '../src/adapter/output/persistense/ProductPersistenceAdapter';
import { InjectionTokens } from '../src/util/types/InjectionTokens';

describe('Product Service tests', () => {
  container.register(InjectionTokens.PRODUCT_PERSISTENCE_OUTPUT_PORT, {
    useClass: ProductPersistenceAdapter,
  });
  container.register(InjectionTokens.PRODUCT_SERVICE_INPUT_PORT, {
    useClass: ProductService,
  });

  test('create_whenProductValid_returnSuccess', async () => {
    const productService: ProductService = container.resolve(
      'ProductServiceInputPort'
    );
    const product = await productService.create('Product test', 10);
    console.log(product);
    expect(async () => {
      await productService.create('Product test', 10);
    }).not.toThrow(Error);
    expect(product.getPrice()).toBe(10);
    expect(product.getName()).toBe('Product test');
  });

  test('findOne_whenProductValid_returnSuccess', async () => {
    const productService: ProductService = container.resolve(
      'ProductServiceInputPort'
    );
    const product = await productService.create('Product test', 10);

    const getProduct = await productService.findOne(product.getId());

    expect(async () => {
      await productService.findOne(product.getId());
    }).not.toThrow(Error);
    expect(getProduct.getPrice()).toBe(10);
    expect(getProduct.getName()).toBe('Product test');
  });

  test('disabled_whenProductValid_returnSuccess', async () => {
    const productService: ProductService = container.resolve(
      'ProductServiceInputPort'
    );
    const product = await productService.create('Product Disable', 10);
    product.price = 0;

    expect(async () => {
      await productService.disable(product);
    }).not.toThrow(Error);
  });
  test('enabled_whenProductValid_returnSuccess', async () => {
    const productService: ProductService = container.resolve(
      'ProductServiceInputPort'
    );
    const product = await productService.create('Product Enabled', 10);

    expect(async () => {
      await productService.enable(product);
    }).not.toThrow(Error);
  });
});
