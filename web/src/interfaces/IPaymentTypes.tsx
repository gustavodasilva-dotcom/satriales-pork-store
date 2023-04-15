export interface IPaymentTypes {
  _id: string;
  name: string;
  isCard: boolean;
  requiresBankInfo: boolean;
  checkoutAllowed: boolean;
  __v: Number;
};