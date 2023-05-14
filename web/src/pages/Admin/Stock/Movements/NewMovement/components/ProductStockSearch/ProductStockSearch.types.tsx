import { IProduct } from 'interfaces/IProduct';

export interface IProductStockSearchProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  productFound: IProduct | undefined;
  setProductFound: React.Dispatch<React.SetStateAction<IProduct | undefined>>;
};