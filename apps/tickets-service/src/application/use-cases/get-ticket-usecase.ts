import { Injectable } from '@nestjs/common';
import { TicketRepository } from '../../domain/repositories/ticket.repository';

@Injectable()
export class GetTicketUseCase {
  constructor(private readonly repo: TicketRepository) {}

  execute(id: string) {
    return this.repo.findOne(id);
  }
}
