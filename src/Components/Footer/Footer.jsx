import React from "react";
import {
  Nav,
  Container,
  Button,
  Row,
  Col,
  Form,
  InputGroup,
} from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Job Hunter</h5>
            <p>Your trusted job search platform</p>
          </Col>
          <Col md={2}>
            <h5>Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link href="#" className="text-white p-0 mb-2">
                About
              </Nav.Link>
              <Nav.Link href="#" className="text-white p-0 mb-2">
                Jobs
              </Nav.Link>
              <Nav.Link href="#" className="text-white p-0 mb-2">
                Contact
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={2}>
            <h5>Resources</h5>
            <Nav className="flex-column">
              <Nav.Link href="#" className="text-white p-0 mb-2">
                Blog
              </Nav.Link>
              <Nav.Link href="#" className="text-white p-0 mb-2">
                FAQ
              </Nav.Link>
              <Nav.Link href="#" className="text-white p-0 mb-2">
                Support
              </Nav.Link>
            </Nav>
          </Col>
          {/* <Col md={4}>
            <h5>Newsletter</h5>
            <InputGroup>
              <Form.Control type="email" placeholder="Enter your email" />
              <Button variant="light">Subscribe</Button>
            </InputGroup>
          </Col> */}
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
