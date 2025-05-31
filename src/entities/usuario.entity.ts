import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('client')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  email: string;

  @Column({ name: 'telefone' })
  telefone: string;

  @Column({ length: 500 })
  endereco: string;

  @Column({ length: 500 })
  cep: string;

  @Column({ length: 500 })
  cidade: string;

  @Column({ length: 500 })
  cnpj: string;

  @Column({ length: 500 })
  bairro: string;

  @Column({ length: 100 })
  ie: string;

  @Column({ name: 'isdeleted' })
  isDeleted: Boolean;
}
