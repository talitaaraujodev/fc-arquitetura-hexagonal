import { ProductEntity } from './entities/ProductEntity';
import { ProductPersistence } from '../../../application/ports/output/ProductPersistenceOutputPort';
import { Product } from '../../../domain/models/Product';
import AppDataSource from '../../../config/ormconfig';

export class ProductPersistenceAdapter implements ProductPersistence {
  private repository = AppDataSource.getRepository(ProductEntity);

  async findOne(id: number): Promise<Product | null> {
    const product = await this.repository.findOneBy({ id });
    return new Product(product.id, product.name, product.price, product.status);
  }

  async create(product: Product): Promise<Product | null> {
    const productEntitySaved = await this.repository.save(
      new ProductEntity(null, product.name, product.price, product.status)
    );
    return new Product(
      productEntitySaved.id,
      product.name,
      product.price,
      product.status
    );
  }

  async update(product: Product): Promise<Product | null> {
    await this.findOne(product.id);

    const productEntityUpdate = await this.repository.save(
      new ProductEntity(null, product.name, product.price, product.status)
    );
    return new Product(
      productEntityUpdate.id,
      product.name,
      product.price,
      product.status
    );
  }
}
