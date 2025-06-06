import { Body, Controller, Get, Post } from '@nestjs/common';
import { PedidosService } from './pedidos.service';

@Controller('pedidos')
export class PedidosController {
  constructor(private requestService: PedidosService) {}

  @Get('findAll')
  async findAll(): Promise<any> {
    return this.requestService.findAll();
  }

  @Post('createOrder')
  async create(@Body() payload: any): Promise<any> {
    return this.requestService.create(payload);
  }
}
