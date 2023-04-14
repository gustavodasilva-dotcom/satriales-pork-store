import { Outlet } from "react-router-dom";
import { useState, useEffect, FC } from "react";
import useRefreshToken from "hooks/useRefreshToken";
import useAuth from "hooks/useAuth";

const PersistLogin: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    !auth ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth)}`);
  }, [isLoading]);

  return (
    <>
      {isLoading
        ? <p>Loading...</p>
        : <Outlet />
      }
    </>
  );
};

export default PersistLogin;