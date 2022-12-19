import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="left-side">
        <Outlet />
      </div>
      <div className="right-side" />
    </div>
  );
};

export default AuthLayout;
