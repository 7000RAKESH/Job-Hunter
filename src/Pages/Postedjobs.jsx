// import { TrashIcon } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { Card, Row, Col, Button } from "react-bootstrap";

// const PostedJobs = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const user = JSON.parse(localStorage.getItem("user"));

//   const [jobStatus, setJobStatus] = useState({
//     id: 0,
//     isopen: "",
//   });

//   const handleDelete = (e) => {
//     const id = e.target.value;

//     fetch(`http://localhost:3000/jobs/${id}`, {
//       method: "DELETE",
//       headers: {
//         "content-type": "application/json",
//       },
//     })
//       .then((res) => {
//         if (res.ok) {
//           alert("job deleted succesfully");
//         } else {
//           alert("failed to delet job");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleIsOpen = (e) => {
//     const id = e.target.value;
//     // console.log(id);
//     const isopen = e.target.innerText === "Open" ? "off" : "on"; // Toggle status based on current text

//     setJobStatus({
//       ...jobStatus,
//       isopen,
//       id,
//     });
//     console.log(id, isopen);
//     updateStatus(id, isopen);
//   };

//   const updateStatus = async (id, isopen) => {
//     const res = await fetch(`http://localhost:3000/status/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ isopen }),
//     });

//     if (res.ok) {
//       const updatedJobs = jobs.map((job) =>
//         job.id === id ? { ...job, isopen } : job
//       );
//       setJobs(updatedJobs);
//     }
//   };

//   useEffect(() => {
//     const result = async () => {
//       const res = await fetch("http://localhost:3000/joblist");
//       const data = await res.json();
//       setJobs(data);
//       setLoading(false);
//     };
//     result();
//   }, []);

//   const filterd = jobs.filter((u) => u.recruiterid === user.id);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div
//       style={{ backgroundColor: "#3674B5", width: "100%", minHeight: "100vh" }}
//     >
//       <div className="container pt-25">
//         <h1 className="text-center text-white mb-4">Posted Jobs</h1>
//         <Row>
//           {filterd.map((job) => (
//             <Col key={job.id} xs={12} sm={6} md={6} lg={4} className="mb-4">
//               <Card className="h-100 ">
//                 <Card.Img
//                   variant="top"
//                   src={job.image}
//                   className="w-10 h-10 p-2.5 object-contain"
//                 />
//                 <Card.Body>
//                   <Card.Title>{job.name}</Card.Title>
//                   <strong>description: </strong>
//                   <Card.Text>{job.description}</Card.Text>
//                   <p>
//                     <strong>Role:</strong> {job.role}
//                   </p>
//                   <p>
//                     <strong>Location:</strong> {job.location}
//                   </p>
//                   <p>
//                     <strong>Requirements:</strong> {job.requirements}
//                   </p>
//                   <p>
//                     <strong>Salary :</strong> {job.salary} ₹ per anum
//                   </p>
//                   <div className="d-flex justify-between">
//                     <Button
//                       variant={job.isopen === "on" ? "primary" : "danger"}
//                       onClick={handleIsOpen}
//                       value={job._id}
//                     >
//                       {job.isopen === "on" ? "Open" : "Closed"}
//                     </Button>
//                     <Button
//                       variant="danger"
//                       value={job._id}
//                       onClick={handleDelete}
//                     >
//                       <TrashIcon />
//                       {/* Delete */}
//                     </Button>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default PostedJobs;

import { TrashIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

const PostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleDelete = async (e) => {
    const id = e.target.value;

    try {
      const res = await fetch(`http://localhost:3000/jobs/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        alert("Job deleted successfully");
        setJobs(jobs.filter((job) => job._id !== id));
      } else {
        alert("Failed to delete job");
      }
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  };

  const handleIsOpen = (e) => {
    const id = e.target.value;
    const isopen = e.target.innerText === "Open" ? false : true; // Toggle boolean value

    updateStatus(id, isopen);
  };

  const updateStatus = async (id, isopen) => {
    try {
      const res = await fetch(`http://localhost:3000/status/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isopen }),
      });

      if (res.ok) {
        setJobs((prevJobs) =>
          prevJobs.map((job) => (job._id === id ? { ...job, isopen } : job))
        );
      }
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:3000/joblist");
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((u) => u.recruiterid === user.id);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{ backgroundColor: "#3674B5", width: "100%", minHeight: "100vh" }}
    >
      <div className="container pt-25">
        <h1 className="text-center text-white mb-4">Posted Jobs</h1>
        <Row>
          {filteredJobs.map((job) => (
            <Col key={job._id} xs={12} sm={6} md={6} lg={4} className="mb-4">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={job.image}
                  className="w-10 h-10 p-2.5 object-contain"
                />
                <Card.Body>
                  <Card.Title>{job.name}</Card.Title>
                  <strong>Description: </strong>
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
                    <strong>Salary:</strong> {job.salary} ₹ per annum
                  </p>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant={job.isopen ? "primary" : "danger"}
                      onClick={handleIsOpen}
                      value={job._id}
                    >
                      {job.isopen ? "Open" : "Closed"}
                    </Button>
                    <Button
                      variant="danger"
                      value={job._id}
                      onClick={handleDelete}
                    >
                      <TrashIcon />
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
