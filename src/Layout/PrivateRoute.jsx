import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";

/* eslint-disable react/prop-types */
const PrivateRoute = ({ children }) => {
  const { user, loading, error } = useAuth();
  const location = useLocation();

  if (loading) return <h1>Loading...</h1>;
  if (error) return <div>{error}</div>;
  if (!user)
    return (
      <Navigate
        to={"/auth/login"}
        state={{
          from: location,
        }}
        replace
      />
    );

  return <div>{children}</div>;
};

export default PrivateRoute;
