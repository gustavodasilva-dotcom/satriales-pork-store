export interface IAddressProps {
  streetId: string;
  setStreetId: React.Dispatch<React.SetStateAction<string>>;
  zipCode: string;
  setZipCode: React.Dispatch<React.SetStateAction<string>>;
  number: string;
  setNumber: React.Dispatch<React.SetStateAction<string>>;
  complement: string;
  setComplement: React.Dispatch<React.SetStateAction<string>>;
  brazilianAddress: boolean;
  setBrazilianAddress: React.Dispatch<React.SetStateAction<boolean>>;
};