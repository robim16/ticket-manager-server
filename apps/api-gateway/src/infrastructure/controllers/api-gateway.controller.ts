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
import { Public } from 'apps/auth-service/src/infrastructure/auth/public.decorator';
import { LoginDto } from '../../domain/dtos/login.dto';
import { RegisterDto } from '../../domain/dtos/register.dto';

@Controller('tickets')
export class ApiGatewayController {
  constructor(private readonly service: ApiGatewayService) { }

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

  @Post('login')
  @Public()
  login(@Body() dto: LoginDto) {
    return this.service.loginUser(dto);
  }

  @Post('register')
  @Public()
  register(@Body() dto: RegisterDto) {
    return this.service.createUser(dto);
  }

}
