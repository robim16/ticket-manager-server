import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Ticket } from '../src/domain/entities/ticket.entity';
import { TicketsController } from '../src/infraestructure/controllers/tickets.controller';

import { TicketRepository } from '../src/domain/repositories/ticket.repository';
import { TicketRepositoryImpl } from '../src/infraestructure/repositories/ticket.repository.impl';

import { CreateTicketUseCase } from '../src/application/use-cases/create-ticket.usecase';
import { GetTicketsUseCase } from '../src/application/use-cases/get-tickets.usecase';
import { ChangeTicketStatusUseCase } from '../src/application/use-cases/change-ticket-status.usecase';
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
