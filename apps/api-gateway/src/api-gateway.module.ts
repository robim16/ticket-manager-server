import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApiGatewayController } from './infrastructure/controllers/api-gateway.controller';
import { ApiGatewayService } from './application/api-gateway.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TICKETS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4001,
        },
      },
    ]),
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
