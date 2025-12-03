import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Ticket } from './src/domain/entities/ticket.entity';

dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5434,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'ticketsdb',
  entities: [Ticket],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, 
  logging: true,
});

export default dataSource;
