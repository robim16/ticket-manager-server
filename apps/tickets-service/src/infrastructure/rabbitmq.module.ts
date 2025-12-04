import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventPublisher } from './event-publisher/event.publisher';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_CONNECTION',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'tickets_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  providers: [EventPublisher],       
  exports: [ClientsModule, EventPublisher], 
})
export class RabbitMQModule {}
