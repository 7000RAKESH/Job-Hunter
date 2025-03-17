import React from "react";
import { Container, Button, Row, Card, Col, Form } from "react-bootstrap";

// import {
//   Card,
//   CardHeader,
//   CardFooter,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "../ui/card";
// import { Button } from "../ui/button";
const styles = {
  heroSection: {
    background: "#3674B5",
    color: "white",
    padding: "80px 0",
  },
  featureCard: {
    transition: "transform 0.3s",
    "&:hover": {
      transform: "translateY(-5px)",
    },
  },
  categoryCard: {
    transition: "box-shadow 0.3s",
    "&:hover": {
      boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
    },
  },
};
const HeroSection = () => {
  return (
    <section style={styles.heroSection} id="home">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0">
            <h1 className="display-4 fw-bold mb-4">
              Find Your Dream Job with Job Hunter
            </h1>
            <p className="lead mb-4">
              Your trusted platform for discovering opportunities and building
              your career path
            </p>
            <Card className="p-3 w-lg">
              <Row className="g-4  justify-center">
                <Col md={5}>
                  <Button variant="primary" className="w-100">
                    Find Job
                  </Button>
                </Col>
                <Col md={5}>
                  <Button variant="dark" className="w-100">
                    Post a Job
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col lg={6} className="text-center">
            <img
              src="/main.png"
              alt="Job Search"
              className="img-fluid rounded shadow"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
