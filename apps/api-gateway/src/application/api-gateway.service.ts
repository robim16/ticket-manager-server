import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateTicketDto } from '../domain/dtos/create-ticket.dto';
import { UpdateTicketStatusDto } from '../domain/dtos/update-ticket-status.dto';

@Injectable()
export class ApiGatewayService {
  constructor(
    @Inject('TICKETS_SERVICE')
    private readonly ticketsClient: ClientProxy,
  ) {}

  async createTicket(data: CreateTicketDto) {
    return firstValueFrom(this.ticketsClient.send('ticket.create', data));
  }

  async listTickets() {
    return firstValueFrom(this.ticketsClient.send('ticket.list', {}));
  }

  async findTicket(id: string) {
    return firstValueFrom(this.ticketsClient.send('ticket.findOne', {id}));
  }

  async changeStatus(id: string, data: UpdateTicketStatusDto) {
    return firstValueFrom(
      this.ticketsClient.send('ticket.changeStatus', { id, estado: data.estado }),
    );
  }
}
