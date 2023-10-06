import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";
import LoginContext from "../store/loginContext";
import { useSelector } from "react-redux";

const ProtectedRoute: React.FC = () => {
  const { userInfo } = useSelector((state: any) => state.auth);
  const loginCtx = useContext(LoginContext);

  return userInfo && userInfo.isAdmin /* && loginCtx.isLogin */ ? <Outlet /> : <Login />;
};

export default ProtectedRoute;
