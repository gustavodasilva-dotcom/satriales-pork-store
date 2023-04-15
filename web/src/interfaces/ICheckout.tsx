import { INaturalPerson } from './INaturalPerson';
import { IProductCheckout } from './IProductCheckout';

export interface ICheckout {
  _id: string;
  useClient: boolean;
  totalPrice: Number,
  client?: INaturalPerson | string;
  products: IProductCheckout[];
  __v: Number;
};