export interface IProduct {
  description: string;
  name: string;
  price: IPrice;
  _id: string;
};

export interface IPrice {
  $numberDecimal: string;
}