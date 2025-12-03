import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TicketEventsListener } from '../listeners/tickets-status.listener';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATIONS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'notifications_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [TicketEventsListener],
})
export class RabbitMQModule {}
