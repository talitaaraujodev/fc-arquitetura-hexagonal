export = {
  type: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  dbPort: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_DATABASE || 'database',
  serverPort: Number(process.env.PORT) || 3000,
};
