import { IProduct } from './IProduct';

export interface IProductCheckout {
  quantity: Number;
  product: IProduct | undefined;
};