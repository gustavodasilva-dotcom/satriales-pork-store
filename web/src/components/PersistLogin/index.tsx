import { Outlet } from "react-router-dom";
import { useState, useEffect, FC } from "react";

import useRefreshToken from "hooks/useRefreshToken";
import useAuth from "hooks/useAuth";

const PersistLogin: FC = () => {
  const [_isLoading, _setIsLoading] = useState(true);
  const _refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await _refresh();
      } catch (error) {
        console.error(error);
      } finally {
        _setIsLoading(false);
      }
    };

    !auth ? verifyRefreshToken() : _setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${_isLoading}`);
    console.log(`aT: ${JSON.stringify(auth)}`);
  }, [_isLoading]);

  return (
    <>
      {_isLoading
        ? <p>Loading...</p>
        : <Outlet />
      }
    </>
  );
};

export default PersistLogin;