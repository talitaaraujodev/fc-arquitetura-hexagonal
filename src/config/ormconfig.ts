import 'reflect-metadata';
import { ProductEntity } from './../adapter/output/persistense/entities/ProductEntity';
import { DataSource, DataSourceOptions } from 'typeorm';

function getConfig() {
  return {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'test',
    synchronize: false,
    logging: true,
    entities: [ProductEntity],
    migrations: [__dirname + '/database/migrations/*.ts'],
  } as DataSourceOptions;
}
const AppDataSource = new DataSource(getConfig());
AppDataSource.initialize();

export default AppDataSource;
