import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'productName' })
  productName: string;

  @Column({ name: 'isdeleted' })
  isDeleted: Boolean;
}
