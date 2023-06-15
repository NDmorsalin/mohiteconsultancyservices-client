import { Offcanvas } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function Header() {
  const navitems = (
    <>
      <NavLink to={"/"} className="btn btn-primary mb-3">
        Home
      </NavLink>
      <NavLink to={"/addtask"} className="btn btn-primary  mb-3">
        Add Task
      </NavLink>
      <NavLink to={"/alltasks"} className="btn btn-primary  mb-3">
        All Task
      </NavLink>
    </>
  );
  return (
    <Navbar bg="light shadow" expand="md" className="mb-3">
      <Container>
       <NavLink  to='/' className='fs-1 text-decoration-none ' > NoteKeeper</NavLink>
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
