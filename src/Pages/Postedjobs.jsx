import { TrashIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

const PostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  const [jobStatus, setJobStatus] = useState({
    id: 0,
    isopen: "",
  });

  const handleDelete = (e) => {
    const id = e.target.value;

    fetch(`http://localhost:3000/jobs/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("job deleted succesfully");
        } else {
          alert("failed to delet job");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleIsOpen = (e) => {
    const id = parseInt(e.target.value);
    const isopen = e.target.innerText === "Open" ? "off" : "on"; // Toggle status based on current text

    setJobStatus({
      ...jobStatus,
      isopen,
      id,
    });

    updateStatus(id, isopen);
  };

  const updateStatus = async (id, isopen) => {
    const res = await fetch(`http://localhost:3000/status/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isopen }),
    });

    if (res.ok) {
      const updatedJobs = jobs.map((job) =>
        job.id === id ? { ...job, isopen } : job
      );
      setJobs(updatedJobs);
    }
  };

  useEffect(() => {
    const result = async () => {
      const res = await fetch("http://localhost:3000/joblist");
      const data = await res.json();
      setJobs(data);
      setLoading(false);
    };
    result();
  }, []);

  const filterd = jobs.filter((u) => u.recruiterid === user.id);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{ backgroundColor: "#3674B5", width: "100%", minHeight: "100vh" }}
    >
      <div className="container pt-25">
        <h1 className="text-center mb-4">Posted Jobs</h1>
        <Row>
          {filterd.map((job) => (
            <Col key={job.id} xs={12} sm={6} md={6} lg={4} className="mb-4">
              <Card className="h-100 ">
                <Card.Img
                  variant="top"
                  src={job.image}
                  className="w-10 h-10 p-2.5 object-contain"
                />
                <Card.Body>
                  <Card.Title>{job.name}</Card.Title>
                  <strong>description: </strong>
                  <Card.Text>{job.description}</Card.Text>
                  <p>
                    <strong>Role:</strong> {job.role}
                  </p>
                  <p>
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p>
                    <strong>Requirements:</strong> {job.requirements}
                  </p>
                  <p>
                    <strong>Salary :</strong> {job.salary} ₹ per anum
                  </p>
                  <div className="d-flex justify-between">
                    <Button
                      variant={job.isopen === "on" ? "primary" : "danger"}
                      onClick={handleIsOpen}
                      value={job.id}
                    >
                      {job.isopen === "on" ? "Open" : "Closed"}
                    </Button>
                    <Button
                      variant="danger"
                      value={job.id}
                      onClick={handleDelete}
                    >
                      <TrashIcon />
                      {/* Delete */}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default PostedJobs;
