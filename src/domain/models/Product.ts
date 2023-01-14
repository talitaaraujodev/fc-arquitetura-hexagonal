export enum ProductStatus {
  DISABLED = 1,
  ENABLED = 2,
}

export class Product {
  id: number;
  name: string;
  price: number;

  status: ProductStatus | any;

  constructor(id: number, name: string, price: number, status: ProductStatus) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.status = status;
  }

  static createToSaved(name: string, price: number): Product {
    return new Product(null, name, price, ProductStatus.DISABLED);
  }

  static updateToSaved(id: number, name: string, price: number): Product {
    return new Product(id, name, price, ProductStatus.DISABLED);
  }

  async isValid(): Promise<Boolean> {
    if (
      this.status !== ProductStatus.ENABLED &&
      this.status !== ProductStatus.DISABLED
    ) {
      return false;
    }
    if (this.name.length === 0) {
      return false;
    }
    if (this.price < 0) {
      return false;
    }

    return true;
  }

  enable(): void {
    if (this.price > 0) {
      this.status = ProductStatus.ENABLED;
      return;
    }
    throw new Error(
      'The price must be greater than zero to enable the product'
    );
  }

  disable(): void {
    if (this.price === 0) {
      this.status = ProductStatus.DISABLED;
      return;
    }
    throw new Error(
      'The price must be zero in order to have the product disabled'
    );
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getStatus(): string {
    return this.status;
  }

  getPrice(): number {
    return this.price;
  }
}
