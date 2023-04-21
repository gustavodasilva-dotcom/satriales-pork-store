import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  const _location = useLocation();

  return (
    auth
      ? <Outlet />
      : <Navigate to='/admin/login' state={{ from: _location }} replace />
  )
};

export default RequireAuth;