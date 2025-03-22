import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  BarLoader,
  BeatLoader,
  ClimbingBoxLoader,
  CircleLoader,
  RingLoader,
} from "react-spinners";
const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const handelRole = async (role) => {
    await user
      .update({ unsafeMetadata: { role } })
      .then(() => {
        navigate(role == "recruiter" ? "/post-job" : "/joblist");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(
        user?.unsafeMetadata?.role == "recruiter" ? "/post-job" : "/joblist"
      );
    }
  }, [user]);
  if (!isLoaded) {
    return (
      <BarLoader
        style={{
          height: "5rem",
          width: "100%",
          marginTop: "10rem",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
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
      <div>
        <b className="text-8xl">i am a.....</b> <br /> <br />{" "}
        <Card className="p-3  justify-between w-auto">
          <Row className="g-4 justify-content-center">
            <Col xs={12} sm={6} md={5} lg={5}>
              {" "}
              <Button
                onClick={() => {
                  handelRole("candidate");
                }}
                variant="primary"
                className="w-100 fs-5"
              >
                {" "}
                <b> Candidate</b>{" "}
              </Button>{" "}
            </Col>{" "}
            <Col xs={12} sm={6} md={5} lg={5}>
              {" "}
              <Button
                onClick={() => {
                  handelRole("recruiter");
                }}
                variant="dark"
                className="w-100  fs-5"
              >
                {" "}
                <b> Recruiter</b>{" "}
              </Button>{" "}
            </Col>{" "}
          </Row>{" "}
        </Card>{" "}
      </div>
    </div>
  );
};

export default Onboarding;
