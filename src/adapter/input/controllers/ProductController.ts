import { InjectionTokens } from '../../../util/types/InjectionTokens';
import { ProductServiceInputPort } from '../../../application/ports/input/ProductServiceInputPort';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { ValidationError } from '../../../util/errors/ValidationError';

@injectable()
export class ProductController {
  constructor(
    @inject(InjectionTokens.PRODUCT_SERVICE_INPUT_PORT)
    private productServiceInputPort: ProductServiceInputPort
  ) {}

  async create(request: Request, response: Response): Promise<Response> {
    try {
      const product = await this.productServiceInputPort.create(
        request.body.name,
        request.body.price
      );
      return response.json(product).status(201);
    } catch (e) {
      if (e instanceof ValidationError) {
        return response.status(e.httpCode).json({ message: e.message });
      }
      return response.json(e).status(500);
    }
  }

  async findOne(request: Request, response: Response): Promise<Response> {
    try {
      const id = parseInt(request.params.id);
      const product = await this.productServiceInputPort.findOne(id);
      return response.json(product).status(200);
    } catch (e) {
      return response.json(e).status(500);
    }
  }
}
