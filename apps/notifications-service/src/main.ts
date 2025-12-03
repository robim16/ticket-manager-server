import { NestFactory } from '@nestjs/core';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NotificationsServiceModule } from './notifications-service.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsServiceModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'notifications_queue',
      queueOptions: { durable: false },
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
