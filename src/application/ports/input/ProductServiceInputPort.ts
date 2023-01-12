import { Product } from '../../../domain/models/Product';

export interface ProductServiceInputPort {
  findOne(id: number): Promise<Product>;
  create(name: string, price: number): Promise<Product>;
  enable(product: Product): Promise<Product>;
  disable(product: Product): Promise<Product>;
}
