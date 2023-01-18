import { InjectionTokens } from '../../util/types/InjectionTokens';
import { ProductServiceInputPort } from '../ports/input/ProductServiceInputPort';
import { Product } from '../../domain/models/Product';
import { inject, injectable } from 'tsyringe';
import { ValidationError } from '../../util/errors/ValidationError';
import { ProductPersistence } from '../ports/output/ProductPersistenceOutputPort';

@injectable()
export class ProductService implements ProductServiceInputPort {
  constructor(
    @inject(InjectionTokens.PRODUCT_PERSISTENCE_OUTPUT_PORT)
    private readonly productRepository: ProductPersistence
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async findOne(id: number): Promise<Product> {
    return await this.productRepository.findOne(id);
  }

  async create(name: string, price: number): Promise<Product> {
    const product = Product.createToSaved(name, price);

    const isValid = await product.isValid();

    if (!isValid) {
      throw new ValidationError('Produto inválido');
    }
    return this.productRepository.create(product);
  }

  async update(id: number, name: string, price: number): Promise<Product> {
    const product = Product.updateToSaved(id, name, price);

    const isValid = await product.isValid();
    if (!isValid) {
      throw new ValidationError('Produto inválido');
    }
    return this.productRepository.update(product);
  }

  enable(product: Product): Promise<Product> {
    product.enable();
    return this.productRepository.update(product);
  }

  disable(product: Product): Promise<Product> {
    product.disable();
    return this.productRepository.update(product);
  }
}
