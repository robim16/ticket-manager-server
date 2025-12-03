import { IsEnum, IsString } from 'class-validator';
import { TicketStatus } from '../../domain/entities/ticket.entity';

export class ChangeTicketStatusDto {
  @IsString()
  id: string;

  @IsEnum(TicketStatus)
  estado: TicketStatus;
}
