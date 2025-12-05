import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { TicketsServiceModule } from './tickets-service.module';
import { GlobalRpcExceptionFilter } from './infrastructure/filters/GlobalRpcExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TicketsServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'tickets_queue',
        queueOptions: { durable: true },
      },
    },
  );

  app.useGlobalFilters(new GlobalRpcExceptionFilter());

  await app.listen();

  console.log('Tickets-service microservice is running...');
}
bootstrap();
