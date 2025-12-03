import { Injectable } from '@nestjs/common';
import { TicketRepository } from '../../domain/repositories/ticket.repository';
import { ChangeTicketStatusDto } from '../dtos/change-ticket-status.dto';
import { EventPublisher } from '../../infraestructure/event-publisher/event.publisher';
import { TicketStatusChangedEvent } from '../../domain/events/ticket-status-changed.event';

@Injectable()
export class ChangeTicketStatusUseCase {
  constructor(
    private readonly repo: TicketRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(dto: ChangeTicketStatusDto) {
    const updated = await this.repo.changeStatus(dto.id, dto.estado);

    await this.publisher.publish(
      'ticket.status.changed',
      new TicketStatusChangedEvent(dto.id, dto.estado),
    );

    return updated;
  }
}
