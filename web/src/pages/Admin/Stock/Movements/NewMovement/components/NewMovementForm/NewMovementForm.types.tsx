import { IProduct } from 'interfaces/IProduct';

export interface INewMovementFormProps {
  showForm: boolean;
  product: IProduct | undefined;
};