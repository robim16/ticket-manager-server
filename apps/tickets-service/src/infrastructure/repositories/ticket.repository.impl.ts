import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket, TicketStatus } from '../../domain/entities/ticket.entity';
import { TicketRepository } from '../../domain/repositories/ticket.repository';

@Injectable()
export class TicketRepositoryImpl implements TicketRepository {
  constructor(
    @InjectRepository(Ticket)
    private readonly repo: Repository<Ticket>,
  ) { }

  async create(data: { descripcion: string; fecha: Date }): Promise<Ticket> {
    const ticket = this.repo.create(data);
    return this.repo.save(ticket);
  }

  async changeStatus(id: string, estado: TicketStatus): Promise<Ticket> {
    await this.repo.update(id, { estado });

    const ticket = await this.repo.findOneBy({ id });

    if (!ticket) {
      throw new NotFoundException(`Ticket con id ${id} no existe`);
    }

    return ticket;
  }


  async findAll(): Promise<Ticket[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.repo.findOneBy({ id });

    if (!ticket) {
      throw new NotFoundException(`Ticket con id ${id} no existe`);
    }

    return ticket;
  }
}
