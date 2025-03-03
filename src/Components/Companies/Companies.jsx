import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { companies } from "../../Constants/companies";
const Companies = () => {
  return (
    <section
      className="py-5"
      id="companies"
      // style={{
      //   backgroundImage: "url( ../src/assets/bg1.jpg)",
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover",
      // }}
    >
      <Container>
        <h2 className="text-center mb-5 ">Popular Job Categories</h2>
        <Row className="g-4">
          {companies.map((category, idx) => (
            <Col md={3} key={idx}>
              <Card
                className="h-100 categoryCard"
                // style={styles.categoryCard}
              >
                <Card.Body>
                  <Card.Title>{category}</Card.Title>
                  <Card.Text>Browse {category} Jobs</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Companies;
