import { IProductCheckout } from 'interfaces/IProductCheckout';

export interface IProductListProps {
  productsToCheckout: IProductCheckout[];
  purchaseTotalPrice: string;
  setPurchaseTotalPrice: React.Dispatch<React.SetStateAction<string>>;
  goToPayments: () => void;
};