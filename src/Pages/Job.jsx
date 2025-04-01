import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { HeartIcon, MapPinIcon } from "lucide-react";
import { Card, Button, Form, Col } from "react-bootstrap";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { myJob } from "@/apis/Routes";

const Job = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false); // Track the save status
  const [formData, setApplied] = useState({
    skills: "",
    experience: "",
    education: "",
    resume: null,
    status: "",
  });
  const [currentJobId, setCurrentJobId] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  // Toggle the save/unsave status
  const toggleSave = () => {
    const savedJobToSend = {
      candidateId: user.id,
      jobId: job.id,
    };

    fetch("http://localhost:3000/save-job", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(savedJobToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        // Only toggle the saved state after the request succeeds
        setIsSaved(!isSaved);
      })
      .catch((error) => {
        console.error("Error saving job:", error);
      });
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setApplied({
        ...formData,
        resume: e.target.files[0],
      });
    } else if (e.target.type === "radio") {
      setApplied({
        ...formData,
        [e.target.name]: e.target.value,
      });
    } else {
      setApplied({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formDataToSend = new FormData();
    formDataToSend.append("skills", formData.skills);
    formDataToSend.append("experience", formData.experience);
    formDataToSend.append("education", formData.education);
    formDataToSend.append("resume", formData.resume);
    formDataToSend.append("candidateId", user.id);
    formDataToSend.append("candidatename", user.username);
    formDataToSend.append("appliedJobId", currentJobId);
    formDataToSend.append("status", formData.status);

    fetch("http://localhost:3000/job-application", {
      method: "POST",
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Application submitted:", data);
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error("Error submitting application:", error);
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`${myJob}${id}`);
        setCurrentJobId(id);

        const data = await response.json();
        setJob(data);
        setLoading(false);

        // Check if the job is already saved for the user
        const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
        const isJobSaved = savedJobs.some(
          (savedJob) => savedJob.jobId === data.id
        );
        setIsSaved(isJobSaved);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) {
    return <BarLoader color="#36d7b7" width={"100%"} />;
  }

  if (!job) {
    return <p>Job not found</p>;
  }

  return (
    <div
      className="job-details"
      style={{
        backgroundColor: "#3674B5",
        color: "white",
        height: "auto",
        width: "100%",
        minHeight: "100vh",
        boxSizing: "border-box",
        paddingTop: "10rem",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Col xs={10} sm={8} md={8} lg={8} xl={8} className="mb-4">
        <Card className="shadow-sm border-light rounded">
          <Card.Body>
            <Card.Title as="b" className="font-weight-bold text-4xl ">
              {job.name}
            </Card.Title>
            <hr />
            <div className="d-flex align-items-center justify-between mb-3">
              <div className="flex items-center gap-2.5 font-bold">
                <MapPinIcon size={15} />
                {job.location}
              </div>
              <div>
                <img src={job.image} className="w-20 object-contain" />
              </div>
            </div>
            <Card.Text>
              <b className="text-2xl">About the job :</b>
              <p className="pl-3">{job.description}</p>
            </Card.Text>
            <Card.Text>
              <div className="mb-3 ">
                <b className="text-2xl">What we are looking for :</b>
                <p className="pl-3">{job.requirements}</p>
                <b className="text-2xl">Salary :</b>
                <p className="pl-3">{job.salary} ₹ per anum</p>
              </div>
            </Card.Text>

            <div className="d-flex justify-content-between align-items-center">
              <span
                className={`badge ${
                  job.isOpen ? "bg-success" : "bg-danger"
                } text-white`}
              >
                {job.isOpen ? "Open" : "Closed"}
              </span>

              {job && (
                <Button onClick={toggleSave} variant="light">
                  {isSaved ? (
                    <HeartIcon
                      size={20}
                      stroke="red"
                      fill="red"
                      className="ml-4"
                    />
                  ) : (
                    <HeartIcon size={20} className="ml-4" />
                  )}
                </Button>
              )}
            </div>
            <hr />
            <div className="flex items-center justify-between mt-3">
              <Drawer>
                <DrawerTrigger asChild>
                  {job.isOpen ? (
                    <Button variant="danger">Apply</Button>
                  ) : (
                    <Button variant="danger" disabled>
                      Apply
                    </Button>
                  )}
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Apply for job</DrawerTitle>
                    <DrawerDescription>
                      Please fill the form below
                    </DrawerDescription>
                    <Form onSubmit={handleSubmit} encType="multipart/form-data">
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Skills :</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Skills"
                          name="skills"
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Experience :</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter your Experience"
                          name="experience"
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group>
                        <p>Education :</p>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="education"
                            id="flexRadioDefault1"
                            onChange={handleChange}
                            value={"Graduate"}
                          />
                          <label
                            className="education"
                            htmlFor="flexRadioDefault1"
                          >
                            Graduate
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="education"
                            id="flexRadioDefault2"
                            onChange={handleChange}
                            value={"Post Graduate"}
                          />
                          <label
                            className="education"
                            htmlFor="flexRadioDefault2"
                          >
                            Post Graduate
                          </label>
                        </div>
                      </Form.Group>

                      <Form.Group controlId="formBasicFile">
                        <Form.Label>Upload Your Resume:</Form.Label>
                        <Form.Control
                          type="file"
                          placeholder="Upload your Resume"
                          name="resume"
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>

                      <br />
                      <Button variant="primary" type="submit" className="w-100">
                        Apply
                      </Button>
                    </Form>
                  </DrawerHeader>
                  <DrawerFooter className="p-1.5 mt-0">
                    <DrawerClose asChild>
                      <Button variant="danger">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              <Button variant="secondary" onClick={() => navigate("/joblist")}>
                Back to Jobs
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};

export default Job;
