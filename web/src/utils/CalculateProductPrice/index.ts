import { IProduct } from 'interfaces/IProduct';

export default function calculateProductPrice(product: IProduct | undefined, quantity: Number): Number {
  const productPrice = product?.price.$numberDecimal!;
  const price = Number(productPrice).valueOf() * quantity.valueOf();

  return price;
};