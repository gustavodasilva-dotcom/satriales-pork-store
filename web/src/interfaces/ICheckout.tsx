import { INaturalPerson } from './INaturalPerson';
import { IProductCheckout } from './IProductCheckout';

export interface ICheckout {
  _id: string;
  useClient: boolean;
  client?: INaturalPerson | string;
  products: IProductCheckout[];
  __v: Number;
};