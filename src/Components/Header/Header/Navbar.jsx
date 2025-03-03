import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar
      style={{ position: "fixed", width: "100%", zIndex: 1 }}
      bg="black"
      variant="dark"
      expand="lg"
    >
      <Container>
        <Navbar.Brand href="#home">
          <img src="/bg.png" style={{ width: "3rem" }} alt="" />
          <b> Job Hunter</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#jobs">Jobs</Nav.Link>
            <Nav.Link href="#companies">Companies</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Button variant="light" className="ms-2">
              Sign In
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
