import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";


const AuthLayout = () => {
  const { user, loading, error } = useAuth();
  const location = useLocation();

  // console.log("layout ", { location, user, loading, error }); 

  return (
    <div className="container">
        {/* <Header /> */}
      {/*
      {loading && <Loading />}*/}
      {user && !loading && !error && (
        <Navigate to={location?.state?.from?.pathname || "/"} />
      )}
      {!user && <Outlet />}

      {/* <Footer />  */}
    </div>
  );
};

export default AuthLayout;
