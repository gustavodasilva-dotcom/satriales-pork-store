import React from 'react';
import { createContext, useState } from 'react';

interface Props {
  children?: React.ReactNode
}

interface IAuthContext {
  auth: string,
  setAuth: React.Dispatch<React.SetStateAction<string>>
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState('');

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;