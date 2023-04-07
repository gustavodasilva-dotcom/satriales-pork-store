export interface INeighborhood {
  _id: string;
  name: string;
  city: string;
  __v: number;
};

export interface ICity {
  _id: string;
  name: string;
  state: string;
  __v: number;
};

export interface IState {
  _id: string;
  initials: string;
  country: string;
  __v: number;
};

export interface ICountry {
  _id: string;
  name: string;
  __v: number;
};

export interface IAddress {
  _id: string;
  zipCode: string;
  name: string;
  neighborhood: INeighborhood;
  city: ICity;
  state: IState;
  country: ICountry;
  isBrazilianAddress: boolean;
  __v: number;
};