import 'reflect-metadata';
import AppDataSource from './config/ormconfig';
import { container } from 'tsyringe';
import app from './App';
import env from './config/env';
import { InjectionTokens } from './util/types/InjectionTokens';
import { Request, Response, Router } from 'express';
import { ProductController } from './adapter/input/controllers/ProductController';
import { ProductService } from './application/services/ProductService';
import { ProductPersistenceAdapter } from './adapter/output/persistense/ProductPersistenceAdapter';

AppDataSource.initialize();

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

app.listen(env.serverPort, productsRoutes);
