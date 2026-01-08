import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateTicketDto } from '../domain/dtos/create-ticket.dto';
import { UpdateTicketStatusDto } from '../domain/dtos/update-ticket-status.dto';
import { RegisterDto } from '../domain/dtos/register.dto';
import { LoginDto } from '../domain/dtos/login.dto';

@Injectable()
export class ApiGatewayService {
  constructor(
    @Inject('TICKETS_SERVICE')
    private readonly ticketsClient: ClientProxy,
    private readonly authClient: ClientProxy
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

  async createUser(data: RegisterDto) {
    return firstValueFrom(this.authClient.send('auth.register', data));
  }

  async loginUser(data: LoginDto) {
    return firstValueFrom(this.authClient.send('auth.login', data));
  }
}
