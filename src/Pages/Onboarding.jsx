import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl, setRole } from "@/apis/Routes";

const Onboarding = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const localStorageRole = localStorage.getItem("role");

  useEffect(() => {
    fetch(`${baseUrl}/users`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => console.error("Error fetching recruiter data:", error));
  }, []);

  const assignRole = async (role) => {
    if (localStorageRole) {
      if (localStorageRole == "candidate") navigate("/joblist");
      else navigate("/postjob");
      // isSubmitting(false);
      return;
    }

    const single = user.find((u) => u.email == localStorageUser.email);
    // console.log(single.role);

    if (single.role) {
      if (single.role == "candidate") {
        navigate("/joblist");
        window.location.reload();
      } else {
        navigate("/postjob");
        window.location.reload();
      }
      return;
    }

    setIsSubmitting(true);
    setLoading(true);
    const response = await fetch(setRole, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: single.email,
        role,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Role assigned successfully");
      if (role == "candidate") {
        localStorage.setItem("role", role);
        navigate("/joblist");
      } else {
        localStorage.setItem("role", role);
        navigate("/postjob");
      }
    } else {
      alert(data.error || "Something went wrong!");
    }

    setIsSubmitting(false);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  return (
    <div
      className="flex items-center justify-center pt-90"
      style={{
        background: "#3674B5",
        color: "white",
        padding: "80px 0",
        height: "100vh",
        width: "100%",
        position: "fixed",
      }}
    >
      {isSubmitting && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      )}
      <div>
        <b className="text-8xl">i am a.....</b> <br /> <br />
        <Card className="p-3  justify-between w-auto">
          <Row className="g-4 justify-content-center">
            <Col xs={12} sm={6} md={5} lg={5}>
              <Link>
                <Button
                  variant="primary"
                  className="w-100 fs-5"
                  onClick={() => assignRole("candidate")}
                  disabled={isSubmitting}
                >
                  <b> Candidate</b>
                </Button>
              </Link>
            </Col>
            <Col xs={12} sm={6} md={5} lg={5}>
              <Link>
                <Button
                  variant="dark"
                  className="w-100  fs-5"
                  onClick={() => assignRole("recruiter")}
                  disabled={isSubmitting}
                >
                  <b> Recruiter</b>
                </Button>
              </Link>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
