import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useLocation } from "react-router-dom";
import React from "react";
import Nav from "react-bootstrap/Nav";
import { useContext } from "react";
import UserContext from "../UserContext";
import Logout from "../pages/Logout";

const Header = () =>  {
  const { user } = useContext(UserContext);

  const location = useLocation();

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          SiklistaScape
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" exact="true">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products" exact="true">
              Products
            </Nav.Link>
            {user.id !== null ? (
              user.isAdmin ? (
                <>
                  <Nav.Link as={Link} to="/addProduct" exact="true">
                    Add Product
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/orders" exact="true">
                    Orders
                  </Nav.Link>
                  <Nav.Link as={Link} to="/logout">
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/profile" exact="true">
                    Profile
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/cart" exact="true">
                    Cart
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/orders" exact="true">
                    Orders
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/logout" exact="true">
                    Logout
                  </Nav.Link>
                </>
              )
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" exact="true">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" exact="true">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;