export interface IAuthProviderProps {
  children?: React.ReactNode
};

export interface IAuthContextProps {
  auth: string,
  setAuth: React.Dispatch<React.SetStateAction<string>>
};