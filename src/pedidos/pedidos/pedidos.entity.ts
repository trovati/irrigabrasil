import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Pedidos')
export class PedidosEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ name: 'idProduct' })
  idProduct: number;

  @Column({ name: 'totalPrice' })
  totalPrice: number;

  @Column({ name: 'quantity' })
  quantity: number;
}
