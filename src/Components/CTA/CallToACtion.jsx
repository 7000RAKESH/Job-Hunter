import React from "react";
import { Container, Button } from "react-bootstrap";
const CallToACtion = () => {
  return (
    <section
      className=" text-white py-5"
      style={{ background: "#3674B5" }}
      id="about"
    >
      <Container className="text-center">
        <h2 className="mb-4">Ready to Start Your Career Journey?</h2>
        <p className="lead mb-4">
          Join thousands of professionals who found their dream jobs through Job
          Hunter
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Button variant="light" size="lg">
            Sign Up Now
          </Button>
          <Button variant="outline-light" size="lg">
            Learn More
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default CallToACtion;
