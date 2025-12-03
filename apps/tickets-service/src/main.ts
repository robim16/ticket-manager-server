import { NestFactory } from '@nestjs/core';
import { TicketsServiceModule } from './tickets-service.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(TicketsServiceModule);
  await app.listen(process.env.port ?? 4001);
}
bootstrap();
