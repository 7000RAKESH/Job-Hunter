import { fetchRegisterUser } from "@/apis/apijobs";
import { registerUser } from "@/apis/Routes";
import { message } from "antd";
import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [registerFormData, setRegisterFormData] = useState({
    email: "",
    password: "",
    username: "",
    role: "",
  });

  const checkIfEmailExists = async (email) => {
    try {
      const response = await fetch(registerUser);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const users = await response.json();
      const emailExists = users.some((user) => user.email === email);

      return emailExists;
    } catch (error) {
      console.error("Error checking if email exists:", error);
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegisterFormData({ ...registerFormData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const emailExists = await checkIfEmailExists(registerFormData.email);

    if (emailExists) {
      alert("Email is already registered. Please use a different email.");
      setIsSubmitting(false);
      return;
    }

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(registerFormData),
    };

    fetchRegisterUser(options)
      .then((user) => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        alert("An error occurred. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
        gap: "2rem",
      }}
    >
      <Row>
        <Col lg={12} md={12} sm={12} xl={12}>
          <Card className="shadow w-auto">
            <Card.Body>
              <h1 className="text-center">Register</h1>

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formConfirmPassword">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="user name"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <p className="mt-2">Select Role :</p>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      id="flexRadioDefault1"
                      onChange={handleChange}
                      value={"candidate"}
                    />
                    <label className="role" htmlFor="flexRadioDefault1">
                      Candidate
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      id="flexRadioDefault2"
                      onChange={handleChange}
                      value={"recruiter"}
                    />
                    <label className="role" htmlFor="flexRadioDefault2">
                      Recruiter
                    </label>
                  </div>
                </Form.Group>

                <br />
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={isSubmitting}
                >
                  Register
                </Button>
              </Form>

              <div className="text-center mt-3">
                <p>
                  Already have an account? <Link to="/login">Login here</Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* <Col lg={6} md={6} xl={4} className="text-center">
        <img
          src="/main.png"
          alt="Job Search"
          className="img-fluid rounded shadow"
        />
      </Col> */}
    </Container>
  );
};

export default Register;
