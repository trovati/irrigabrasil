import { Usuario } from 'src/entities/usuario.entity';

export interface TemplateData {
  client: Usuario;
  produtos: Produto[];
  requestProtocol: string;
  totalRequest: string;
  dateRequest: string;
  payment: string;
}

export interface Produto {
  id: number;
  description: string;
  quantity: number;
  valuePerProduct: number;
  totalPerProduct: number;
}
