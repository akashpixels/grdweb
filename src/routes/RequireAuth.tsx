import React from "react";

import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

interface Props {
  children: React.ReactNode;
}

const RequireAuth: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const token = Cookies.get("token") || "";

  return token ? <>{children}</> : <Navigate to={`/${location.search}`} replace />;
};

export default RequireAuth;
