import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { HeartIcon, MapPinIcon, Trash2Icon, Briefcase } from "lucide-react";
import { Card, Button, Row, Col } from "react-bootstrap";
const Myjobs = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // console.log(useParams());
  // console.log(id);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/jobs/${id}`); // Make sure your API supports fetching a job by ID
        const data = await response.json();
        // console.log(data);
        setJob(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  // console.log(job);

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
              <div className="flex items-center gap-2.5  font-bold">
                <MapPinIcon size={15} />
                {job.location}
              </div>
              <div>
                <img src={job.image} className="w-20 object-contain" />
              </div>
            </div>
            <Card.Text
              className="text-truncate"
              style={{ maxHeight: "80px", overflow: "hidden" }}
            >
              <b className="text-2xl">About th job :</b>
              <ul className="pl-3">{job.description}</ul>
            </Card.Text>
            <div className="mb-3 ">
              <b className="text-2xl">What we are looking for :</b>
              <ul className="pl-3">
                {job.requirements}
                {/* {job.requirements.slice(0, 3).map((req, index) => (
                  <li key={index} className="text-muted">
                    {req}
                  </li>
                ))} */}
              </ul>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span
                className={`badge ${
                  job.isOpen ? "bg-success" : "bg-danger"
                } text-white`}
              >
                {job.isOpen ? "Open" : "Closed"}
              </span>

              <Button variant="link" onClick={() => onSave(id)}>
                <HeartIcon />
              </Button>
            </div>
            <hr />
            <div className="flex items-center  justify-between mt-3">
              <Button
                variant="primary"
                block
                onClick={() => alert(`Apply for job ${job.name}`)}
              >
                Apply
              </Button>

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

export default Myjobs;
