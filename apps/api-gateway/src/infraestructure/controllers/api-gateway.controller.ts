import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiGatewayService } from '../../application/api-gateway.service';
import { CreateTicketDto } from '../../domain/dtos/create-ticket.dto';
import { UpdateTicketStatusDto } from '../../domain/dtos/update-ticket-status.dto';

@Controller('tickets')
export class ApiGatewayController {
  constructor(private readonly service: ApiGatewayService) {}

  @Post()
  create(@Body() dto: CreateTicketDto) {
    return this.service.createTicket(dto);
  }

  @Get()
  findAll() {
    return this.service.listTickets();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findTicket(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateTicketStatusDto,
  ) {
    return this.service.changeStatus(id, dto);
  }
}
