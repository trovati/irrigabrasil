import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidosEntity } from './pedidos.entity';
import { Repository } from 'typeorm';
import { Products } from 'src/products/products.entity';
import { Usuario } from 'src/usuario/usuario.entity';
@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(PedidosEntity)
    private readonly pedidosRepository: Repository<PedidosEntity>,
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly productsRepository: Repository<Products>,
  ) {}

  async findAll() {
    return this.pedidosRepository.find();
  }

  async findOne(idPedido: number) {
    const pedido = await this.pedidosRepository.findOne({
      where: { id: idPedido },
    });

    return pedido;
  }

  async create(client: number, product: Products[]) {
    const cliente = await this.usuarioRepository.findOne({
      where: { id: client },
    });

    const productsOrder = [];

    product.forEach(async (element) => {
      const products = await this.productsRepository.findOne({
        where: { id: element.id },
      });
      productsOrder.push(products);
    });
  }
}
