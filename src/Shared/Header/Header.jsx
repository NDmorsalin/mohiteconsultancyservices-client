import { Offcanvas } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";

function Header() {
  const { user, logout } = useAuth();
  
  const navitems = (
    <>
      <NavLink to={"/"} className="btn btn-primary ">
        Home
      </NavLink>
      {user ? (
        <>
          <NavLink to={"/addtask"} className="btn btn-primary  ">
            Add Task
          </NavLink>
          <NavLink to={"/alltasks"} className="btn btn-primary  ">
            All Task
          </NavLink>
          <div className="d-flex justify-content-center gap-2 align-items-center">
            <div
              className="border border-2 border-primary"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "50%",
                overflow: "hidden",
                
              }}
            >
              <img
                src={user?.photoURL}
                alt=""
                className="w-100 object-fit-cover"
              />
            </div>
            <button
              className="btn btn-primary  "
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <NavLink to={"/auth/login"} className="btn btn-primary  ">
            Login
          </NavLink>
          <NavLink to={"/auth/register"} className="btn btn-primary  ">
            Signup
          </NavLink>
        </>
      )}
    </>
  );
  return (
    <Navbar bg="light shadow" expand="md" className="">
      <Container>
        <NavLink to="/" className="fs-1 text-decoration-none ">
          {" "}
          NoteKeeper
        </NavLink>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-md`}
          aria-labelledby={`offcanvasNavbarLabel-expand-md`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
              NoteKeeper
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end gap-3 flex-grow-1 pe-3">
              {navitems}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
