import useAuth from "hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    auth
      ? <Outlet />
      : <Navigate to='/admin/login' state={{ from: location }} replace />
  )
};

export default RequireAuth;