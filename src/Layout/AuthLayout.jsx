import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import Header from "../Shared/Header/Header";

const AuthLayout = () => {
  const { user, loading, error } = useAuth();
  const location = useLocation();

  // console.log("layout ", { location, user, loading, error });

  return (
    <>
      {" "}
      <Header />
      <div className="container">
        {/*
      {loading && <Loading />}*/}
        {user && !loading && !error && (
          <Navigate to={location?.state?.from?.pathname || "/"} />
        )}
        {!user && <Outlet />}

        {/* <Footer />  */}
      </div>
    </>
  );
};

export default AuthLayout;
