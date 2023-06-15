import { Outlet } from "react-router-dom";
import Header from "../Shared/Header/Header";

const HomeLayout = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default HomeLayout;
