export default interface IAdminModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  focusAfter?: React.RefObject<HTMLInputElement>;
  children: React.ReactNode;
};