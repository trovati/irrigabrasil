import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order')
export class requestEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ name: 'idproductgroup' })
  idProductGroup: number;

  @Column({ name: 'total' })
  total: number;

  @Column({ name: 'idclient' })
  idClient: number;

  @Column({ name: 'idpayment' })
  idpayment: number;

  @Column({ name: 'requestprotocol' })
  requestprotocol: string;

  @Column({ name: 'isdeleted' })
  isDeleted: Boolean;
}
