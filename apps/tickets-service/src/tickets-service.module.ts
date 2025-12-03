import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Ticket } from './domain/entities/ticket.entity';
import { TicketsController } from './infrastructure/controllers/tickets.controller';

import { TicketRepository } from './domain/repositories/ticket.repository';
import { TicketRepositoryImpl } from './infrastructure/repositories/ticket.repository.impl';

import { CreateTicketUseCase } from './application/use-cases/create-ticket.usecase';
import { GetTicketsUseCase } from './application/use-cases/get-tickets.usecase';
import { ChangeTicketStatusUseCase } from './application/use-cases/change-ticket-status.usecase';
import { GetTicketUseCase } from './application/use-cases/get-ticket-usecase';
import dataSource from '../typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSource.options),
    TypeOrmModule.forFeature([Ticket]),
  ],
  controllers: [TicketsController],
  providers: [
    { provide: TicketRepository, useClass: TicketRepositoryImpl },
    CreateTicketUseCase,
    GetTicketsUseCase,
    ChangeTicketStatusUseCase,
    GetTicketUseCase
  ],
})
export class TicketsServiceModule { }
