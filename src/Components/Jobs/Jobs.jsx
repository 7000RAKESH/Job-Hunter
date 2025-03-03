import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { jobs } from "../../Constants/Jobs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
const Jobs = () => {
  return (
    <section
      className="py-5 bg-light"
      id="jobs"
      style={{
        backgroundImage: "url( ../src/assets/bg2.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Container>
        <h2 className="text-center mb-5 text-white">Why Choose Job Hunter?</h2>
        <Row className="g-4">
          {jobs.map((feature, idx) => (
            <Col md={3} key={idx}>
              <Card className="h-100 text-center " style={styles.featureCard}>
                <Card.Body>
                  <FontAwesomeIcon
                    icon={feature.icon}
                    size="2x"
                    className="text-primary mb-3"
                  />
                  <Card.Title>{feature.title}</Card.Title>
                  <Card.Text>{feature.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Jobs;
