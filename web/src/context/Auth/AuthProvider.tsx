import { createContext, useState } from 'react';
import { IAuthContextProps, IAuthProviderProps } from './AuthProvider.types';

const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [auth, setAuth] = useState('');

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;