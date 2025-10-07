export interface payloadRequest {
  products: Product[];
  payment: number;
  client: number;
  obs: string;

}

export interface Product {
  idProduct: number;
  valuePerProduct: number;
  quantity: number;
}
