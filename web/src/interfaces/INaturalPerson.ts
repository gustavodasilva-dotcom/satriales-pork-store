export interface INaturalPerson {
  _id: string;
  name: string;
  ssn: string;
  street: {
    _id: string;
    zipCode: string;
    name: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    isBrazilianAddress: boolean;
    __v: number;
  },
  number: string;
  complement: string;
  __v: number;
};