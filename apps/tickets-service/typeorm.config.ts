import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'ticketsdb',


  entities: ['src/domain/entities/*.ts'],

  migrations: ['dist/apps/tickets-service/src/migrations/*.js'],

  synchronize: false,
  logging: true,
});

export default dataSource;
