import { Injectable } from '@nestjs/common';
import { TicketRepository } from '../../domain/repositories/ticket.repository';

@Injectable()
export class GetTicketsUseCase {
  constructor(private readonly repo: TicketRepository) {}

  execute() {
    return this.repo.findAll();
  }
}
