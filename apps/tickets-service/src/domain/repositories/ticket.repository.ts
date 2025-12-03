import { Ticket, TicketStatus } from '../entities/ticket.entity';

export abstract class TicketRepository {
  abstract create(data: { descripcion: string; fecha: Date }): Promise<Ticket>;

  abstract changeStatus(id: string, estado: TicketStatus): Promise<Ticket>;

  abstract findAll(): Promise<Ticket[]>;

  abstract findOne(id: string): Promise<Ticket>;
}
