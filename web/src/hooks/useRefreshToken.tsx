import axios from 'api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async (): Promise<string> => {
    const res = await axios.get('v1/refresh', {
      withCredentials: true
    });
    const accessToken = res?.data?.accessToken;
    setAuth(accessToken);
    return accessToken;
  };

  return refresh;
};

export default useRefreshToken;