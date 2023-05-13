import { IStock } from './IStock';
import { IProduct } from './IProduct';
import { IStockMovementTypes } from './IStockMovementTypes';

export interface IStockMovement {
  id: string;
  stock: IStock;
  product: IProduct;
  stockMovementType: IStockMovementTypes;
  date: Date;
  __v: number;
};