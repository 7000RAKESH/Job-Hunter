import { fetchUser } from "@/apis/apijobs";
import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginFormData),
    };

    fetchUser(options)
      .then((data) => {
        console.log(data);
        if (data && data.status === 200) {
          const token = data.token;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/onboarding");
        } else {
          alert("Invalid credentials");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        maxWidth: "100%",
        margin: "0",
        padding: "0",
        backgroundColor: "#3674B5",
        color: "white",
      }}
    >
      <Row>
        <Col lg={12} md={12} sm={12} xl={12}>
          <Card className="shadow">
            <Card.Body>
              <h3 className="text-center">Login</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br />
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={isSubmitting}
                >
                  Login
                </Button>
              </Form>
              <div className="text-center mt-3">
                <p>
                  Don't have an account?
                  <Link to="/register">Register here</Link>
                </p>
              </div>
              <div className="text-center mt-3">
                <p>
                  Guest !<Link to="/">Guest Login</Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
