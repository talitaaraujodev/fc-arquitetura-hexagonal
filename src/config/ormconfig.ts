import 'reflect-metadata';
import { ProductEntity } from './../adapter/output/persistense/entities/ProductEntity';
import { DataSource, DataSourceOptions } from 'typeorm';
import env from './env';

function getConfig() {
  return {
    type: env.type,
    host: env.host,
    port: env.dbPort,
    username: env.username,
    password: env.password,
    database: env.database,
    synchronize: false,
    logging: true,
    entities: [ProductEntity],
    migrations: [__dirname + '/database/migrations/*.ts'],
  } as DataSourceOptions;
}
const AppDataSource = new DataSource(getConfig());
AppDataSource.initialize();

export default AppDataSource;
