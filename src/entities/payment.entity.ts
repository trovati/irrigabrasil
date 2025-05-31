import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment')
export class paymentEntity {
  @PrimaryGeneratedColumn({ name: 'idpayment' }) idPayment: number;

  @Column({ name: 'method' })
  method: string;
}
