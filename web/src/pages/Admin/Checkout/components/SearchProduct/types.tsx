import { IProductCheckout } from 'interfaces/IProductCheckout';

export interface ISearchProductProps {
  productsToList: IProductCheckout[];
  setProductsToList: React.Dispatch<React.SetStateAction<IProductCheckout[]>>;
};