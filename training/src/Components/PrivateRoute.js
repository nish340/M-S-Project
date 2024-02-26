import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login"; // Assuming your Login component is in the same directory

const PrivateRoute = () => {
  const auth = sessionStorage.getItem("auth");
  const navigate = useNavigate();

 
    useEffect(() => {
        console.log("useEffect is running!");
        if (!auth) {
            navigate("/");
          }
      }, [auth, navigate]);
   

  return auth ? <Outlet /> : <Login />;
};

export default PrivateRoute;
