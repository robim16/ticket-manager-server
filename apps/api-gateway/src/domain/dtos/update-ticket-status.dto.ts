import { IsEnum } from 'class-validator';

export enum TicketStatusDTO {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED',
}

export class UpdateTicketStatusDto {
  @IsEnum(TicketStatusDTO)
  estado: TicketStatusDTO;
}
