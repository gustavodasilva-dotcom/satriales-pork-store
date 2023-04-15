import { ICheckout } from 'interfaces/ICheckout';

export interface IPaymentTypeProps {
  checkout: ICheckout | undefined;
  selectedPaymentType: string;
  setSelectedPaymentType: React.Dispatch<React.SetStateAction<string>>;
};