export = {
  host: process.env.PG_HOST || 'localhost',
  pgPort: Number(process.env.PG_PORT) || 5432,
  username: process.env.PG_USERNAME || 'postgres',
  password: process.env.PG_PASSWORD || 'secret',
  database: process.env.PG_DATABASE || 'database',
  serverPort: Number(process.env.PORT) || 3000,
};
