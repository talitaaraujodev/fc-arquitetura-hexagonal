import path from 'path';
import { DataSource } from 'typeorm';
import { ProductEntity } from './../adapter/output/persistense/entities/ProductEntity';
import env from './env';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.host,
  port: env.dbPort,
  username: env.username,
  password: env.password,
  database: env.database,
  synchronize: true,
  logging: true,
  entities: [ProductEntity],
  migrations: [path.join(__dirname, '/database/migrations/*.ts')],
});
