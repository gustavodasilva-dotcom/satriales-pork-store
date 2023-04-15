import axios from 'api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const _refresh = async () => {
    const response = await axios.get('v1/refresh', {
      withCredentials: true
    });

    setAuth(prev => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return response.data.accessToken
    });

    return response.data.accessToken;
  };

  return _refresh;
};

export default useRefreshToken;