import { Module } from '@nestjs/common';
import { RabbitMQModule } from './infrastructure/messaging/rabbitmq.module';

@Module({
  imports: [RabbitMQModule],
  controllers: [],
  providers: [],
})
export class NotificationsServiceModule {}
