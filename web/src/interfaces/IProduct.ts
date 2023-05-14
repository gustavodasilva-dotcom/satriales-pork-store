import { IImage } from './IImage';
import { IProductCategory } from './IProductCategory';

export interface IProduct {
  description: string;
  name: string;
  price: IPrice;
  category: IProductCategory;
  barCode: Number;
  _id: string;
  images: IImage[];
  stock: Number;
};

export interface IPrice {
  $numberDecimal: string;
}