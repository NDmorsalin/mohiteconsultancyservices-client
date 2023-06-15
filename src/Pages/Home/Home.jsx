import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";

const Home = () => {
  const { user, loading } = useAuth();
  return (
    <div
      style={{
        height: "85vh",
        width: "100%",
      }}
      className=" container text-center d-flex flex-column align-items-center justify-content-center gap-2"
    >
      <h1 className="">Welcome to NoteKeeper</h1>
      <p className="">
        This is a simple note keeping app. You can add, edit and delete notes.
      </p>
      <h4 className="">To get started, please login or register.</h4>
      {loading && <h4>Loading...</h4>}
      {!loading && user ? null : (
        <div className="d-flex align-items-center justify-content-center gap-3">
          <Nav.Item className="">
            <NavLink
              className="btn btn-primary d-inline-block  "
              to={"/auth/login"}
            >
              Login
            </NavLink>
          </Nav.Item>

          <Nav.Item className=" ">
            <NavLink
              className="btn btn-primary d-inline-block  "
              to={"/auth/register"}
            >
              Signup
            </NavLink>
          </Nav.Item>
        </div>
      )}
    </div>
  );
};

export default Home;
