import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('productgroup')
export class ProductGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'productGroupName' })
  productName: string;

  @Column({ name: 'isdeleted' })
  isDeleted: Boolean;
}
