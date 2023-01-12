import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: number | null;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  price: number;

  @Column({
    type: 'int',
    enum: [1, 2],
    default: 1,
  })
  status: number;

  constructor(id: number | null, name: string, price: number, status: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.status = status;
  }
}
