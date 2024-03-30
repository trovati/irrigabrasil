import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductGroupMembers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idProductGroup: number;

  @Column()
  totalPrice: number;

  @Column()
  quantity: number;

  @Column()
  idUsuario: number;
}
