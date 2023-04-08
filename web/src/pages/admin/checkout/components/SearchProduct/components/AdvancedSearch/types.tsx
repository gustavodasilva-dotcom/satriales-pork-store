import { IProduct } from "interfaces/IProduct";

export default interface IAdvancedSearchProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setProductFound: React.Dispatch<React.SetStateAction<IProduct | undefined>>;
};