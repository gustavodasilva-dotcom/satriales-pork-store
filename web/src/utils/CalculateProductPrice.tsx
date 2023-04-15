import { IProduct } from 'interfaces/IProduct';

const CalculateProductPrice = (product: IProduct | undefined, quantity: Number): Number => {
  const productPrice = product?.price.$numberDecimal!;
  const price = Number(productPrice).valueOf() * quantity.valueOf();

  return price;
};

export default CalculateProductPrice;