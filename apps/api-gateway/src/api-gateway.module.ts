import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApiGatewayController } from './infrastructure/controllers/api-gateway.controller';
import { ApiGatewayService } from './application/api-gateway.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TICKETS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'tickets_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
