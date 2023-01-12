import 'reflect-metadata';
import { container } from 'tsyringe';
import { InjectionTokens } from './util/types/InjectionTokens';
import app from './App';
import { Request, Response, Router } from 'express';
import { ProductController } from './adapter/input/controllers/ProductController';
import { ProductService } from './application/services/ProductService';
import { ProductPersistenceAdapter } from './adapter/output/persistense/ProductPersistenceAdapter';

container.register(InjectionTokens.PRODUCT_PERSISTENCE_OUTPUT_PORT, {
  useClass: ProductPersistenceAdapter,
});
container.register(InjectionTokens.PRODUCT_SERVICE_INPUT_PORT, {
  useClass: ProductService,
});
container.register(InjectionTokens.PRODUCT_CONTROLLER, {
  useClass: ProductController,
});

const productController: ProductController =
  container.resolve('ProductController');

const productsRoutes = Router();
productsRoutes.post(
  '/products',
  async (request: Request, response: Response) => {
    return await productController.create(request, response);
  }
);

app.listen(3000, productsRoutes);
