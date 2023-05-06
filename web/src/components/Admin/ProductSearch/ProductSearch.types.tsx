import { IProduct } from 'interfaces/IProduct';

export default interface IProductSearchProps {
  setProductFound: React.Dispatch<React.SetStateAction<IProduct | undefined>>;
  productBarCode: string;
  setProductBarCode: React.Dispatch<React.SetStateAction<string>>;
  nextElement?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
};