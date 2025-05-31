// src/pedidos/pedidos.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';
import { requestEntity } from '../entities/pedidos.entity';
import { Usuario } from '../entities/usuario.entity';
import { ProductGroup } from '../entities/productGroup.entity';
import { Products } from '../entities/products.entity';
import { ProductGroupMembers } from '../entities/productGroupMembers.entity';
import { paymentEntity } from 'src/entities/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      requestEntity,
      Usuario,
      ProductGroup,
      Products,
      ProductGroupMembers,
      paymentEntity,
    ]),
  ],
  providers: [PedidosService],
  controllers: [PedidosController],
})
export class PedidosModule {}
