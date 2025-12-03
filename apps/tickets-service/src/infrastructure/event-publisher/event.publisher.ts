import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EventPublisher {
  constructor(
    @Inject('RABBITMQ_CONNECTION') private readonly client: ClientProxy,
  ) {}

  publish(event: string, data: any) {
    return this.client.emit(event, data);
  }
}
