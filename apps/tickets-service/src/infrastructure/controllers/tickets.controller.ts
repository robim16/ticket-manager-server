import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTicketDto } from '../../application/dtos/create-ticket.dto';
import { ChangeTicketStatusDto } from '../../application/dtos/change-ticket-status.dto';
import { CreateTicketUseCase } from '../../application/use-cases/create-ticket.usecase';
import { ChangeTicketStatusUseCase } from '../../application/use-cases/change-ticket-status.usecase';
import { GetTicketsUseCase } from '../../application/use-cases/get-tickets.usecase';
import { GetTicketUseCase } from '../../application/use-cases/get-ticket-usecase';

@Controller()
export class TicketsController {
  constructor(
    private readonly createTicket: CreateTicketUseCase,
    private readonly changeStatus: ChangeTicketStatusUseCase,
    private readonly listTickets: GetTicketsUseCase,
    private readonly getTicket: GetTicketUseCase,
  ) { }

  @MessagePattern('ticket.create')
  create(@Payload() dto: CreateTicketDto) {
    return this.createTicket.execute(dto);
  }

  @MessagePattern('ticket.list')
  list() {
    return this.listTickets.execute();
  }

  @MessagePattern('ticket.findOne')
  findOne(@Payload() payload: { id: string }) {
    return this.getTicket.execute(payload.id);
  }

  @MessagePattern('ticket.changeStatus')
  changeStatusHandler(@Payload() dto: ChangeTicketStatusDto) {
    return this.changeStatus.execute(dto);
  }
}
