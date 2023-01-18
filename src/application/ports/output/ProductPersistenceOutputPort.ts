import { Product } from '../../../domain/models/Product';

export interface ProductPersistence {
  create(product: Product): Promise<Product>;
  update(product: Product): Promise<Product>;
  findOne(id: number): Promise<Product>;
  findAll(): Promise<Product[]>;
}
