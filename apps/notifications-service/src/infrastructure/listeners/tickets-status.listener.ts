import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class TicketEventsListener {

  @EventPattern('ticket.status.changed')
  handleTicketStatusChanged(data: any) {
    console.log('Notificación recibida:', data);

  }
}
