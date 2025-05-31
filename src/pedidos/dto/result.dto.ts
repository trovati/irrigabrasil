export interface payloadRequest {
  products: Product[];
  payment: number;
  client: number;
}

export interface Product {
  idProduct: number;
  valuePerProduct: number;
  quantity: number;
}
