import { Controller } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosEntity } from './pedidos.entity';

@Controller('pedidos')
export class PedidosController {
  constructor(private service: PedidosService) {}
}
