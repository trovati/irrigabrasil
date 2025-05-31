import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order')
export class requestEntity {
  @PrimaryGeneratedColumn({ name: 'idrequestprotocol' })
  idRequestProtocol: number;

  @Column({ name: 'requestProtocol' })
  requestProtocol: string;
}
