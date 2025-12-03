import { Module } from '@nestjs/common';
import { RabbitMQModule } from './infraestructure/messaging/rabbitmq.module';

@Module({
  imports: [RabbitMQModule],
  controllers: [],
  providers: [],
})
export class NotificationsServiceModule {}
