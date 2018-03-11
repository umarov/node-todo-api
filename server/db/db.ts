import { createConnection, Connection } from 'typeorm';

export async function connectDB() {
  const connection: Connection = await createConnection({
    type: 'postgres',
    host: process.env.PG_HOST,
    port: +process.env.PG_PORT,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
    entities: ['server/db/entity/*.ts'],
    synchronize: true,
    logging: process.env.NODE_ENV === 'development',
  });

  return connection;
}
