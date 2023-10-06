import React, { useContext } from "react";
import LoginContext from "../store/loginContext";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const location = useLocation();
  const loginCtx = useContext(LoginContext);
  const { userInfo } = useSelector((state: any) => state.auth);

  return userInfo /* && loginCtx.isLogin */ ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ from: location }} // <-- current location so login can redirect back is desired
    />
  );
};

export default AuthLayout;
