import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  let auth = localStorage.getItem("token");
  if (!auth) {
    return (
      <h2 className="text-center italic m-5">Access Denied Please Login !</h2>
    );
  }
  return <Outlet />;
};

export default ProtectedRoute;
