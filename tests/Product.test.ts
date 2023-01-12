import { Product } from '../src/domain/models/Product';
describe('Product tests', () => {
  test('enable_whenPriceEqualZero_returnError', () => {
    const product = new Product(1, 'Product test', 0, 1);

    expect(() => product.enable()).toThrowError(
      'The price must be greater than zero to enable the product'
    );
  });
  test('enable_whenStatusIsGreaterThanZero_returnStatusEnabled', () => {
    const product = new Product(1, 'Product test', 10, 1);

    expect(() => product.enable()).not.toThrowError();
    product.enable();
    expect(product.status).toBe(2);
  });
  test('disable_whenPriceToEqualZero_returnStatusDisabled', () => {
    const product = new Product(1, 'Product test', 0, 2);

    expect(() => product.disable()).not.toThrowError();
    product.disable();
    expect(product.status).toBe(1);
  });
  test('disable_whenPriceIsDifferentZero_returnError', () => {
    const product = new Product(1, 'Product test', 10, 1);

    expect(() => product.disable()).toThrowError(
      'The price must be zero in order to have the product disabled'
    );
  });
  test('isValid_whenProductValid_returnTrue', async () => {
    const product = new Product(1, 'Product test', 10, 2);

    const isValid = await product.isValid();
    expect(isValid).toBeTruthy();
  });
  test('isValid_whenInvalidStatus_returnFalse', async () => {
    const product = new Product(1, 'Product test', 10, 0);

    const isValidStatus = await product.isValid();
    expect(isValidStatus).toBeFalsy();
  });
  test('isValid_whenNameIsEmpty_returnFalse', async () => {
    const product = new Product(1, '', 10, 2);

    const isValidName = await product.isValid();
    expect(isValidName).toBeFalsy();
  });
  test('isValid_whenPriceIsEmpty_returnFalse', async () => {
    const product = new Product(1, 'Product test', -10, 1);

    const isValidPrice = await product.isValid();
    expect(isValidPrice).toBeFalsy();
  });
});
