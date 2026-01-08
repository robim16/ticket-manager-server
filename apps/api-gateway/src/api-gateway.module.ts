import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApiGatewayController } from './infrastructure/controllers/api-gateway.controller';
import { ApiGatewayService } from './application/api-gateway.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'apps/auth-service/src/infrastructure/auth/jwt-auth.guard';

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
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4002,
        },
      },
    ]),
  ],
  controllers: [ApiGatewayController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    ApiGatewayService],
})
export class ApiGatewayModule {}
