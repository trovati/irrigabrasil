import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('productgroupmembers')
export class ProductGroupMembers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'idproduct' })
  idProduct: number;

  @Column({ name: 'idproductgroup' })
  idProductGroup: number;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'valueperproduct', type: 'decimal', precision: 10, scale: 2 })
  valuePerProduct: number;

  @Column({ name: 'totalperproduct', type: 'decimal', precision: 10, scale: 2 })
  totalPerProduct: number;

  @Column({ name: 'isdeleted' })
  isDeleted: Boolean;
}
