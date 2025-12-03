import { Injectable } from '@nestjs/common';
import { TicketRepository } from '../../domain/repositories/ticket.repository';
import { CreateTicketDto } from '../dtos/create-ticket.dto';

@Injectable()
export class CreateTicketUseCase {
  constructor(private readonly repo: TicketRepository) {}

  async execute(dto: CreateTicketDto) {
    return this.repo.create({
      descripcion: dto.descripcion,
      fecha: new Date(),
    });
  }
}
