import React, { useState, useEffect } from "react";
import { postJobs, getUsers, getJobs } from "@/apis/Routes";
import { Button } from "react-bootstrap";
import { fetchUser } from "@/apis/apijobs";

const PostJob = () => {
  const [recruiterData, setRecruiterData] = useState(null);
  const [jobData, setJobData] = useState({
    role: "",
    description: "",
    location: "",
    requirements: "",
    isopen: "",
    image: "",
    name: "",
    salary: 0,
    recruiterid: 0,
  });
  const [postedJobs, setPostedJobs] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => {
        setRecruiterData(data);
        setPostedJobs(data.postedJobs || []);
      })
      .catch((error) => console.error("Error fetching recruiter data:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedJobData = {
      ...jobData,
      recruiterid: user.id,
    };

    fetch(postJobs, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedJobData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Job posted successfully:", data);
        setPostedJobs([...postedJobs, data.id]);
      })
      .catch((error) => console.error("Error posting job:", error));
  };

  if (!recruiterData) {
    return <div>Loading recruiter data...</div>;
  }

  return (
    <div
      className="post-job-container"
      style={{
        background: "#3674B5",
        color: "white",
        padding: "80px 0",
        minHeight: "100vh",
        alignContent: "center",
        justifyItems: "center",
      }}
    >
      <b className="font-extrabold   text-5xl">Post a New Job</b>
      <br />
      {/* <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          color: "black",
          width: "80%",
        }}
      >
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            name="role"
            value={jobData.role}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Company Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={jobData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={jobData.location}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="requirements">Requirements</label>
          <textarea
            id="requirements"
            name="requirements"
            value={jobData.requirements}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Job Description</label>
          <textarea
            id="description"
            name="description"
            value={jobData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Job Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={jobData.image}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="isOpen"
              checked={jobData.isOpen}
              onChange={(e) =>
                setJobData({
                  ...jobData,
                  isOpen: e.target.checked,
                })
              }
            />
            Open Position
          </label>
        </div>

        <Button type="submit">Post Job</Button>
      </form> */}
      <form className="" style={{ width: "80%" }} onSubmit={handleSubmit}>
        <div class="form-group">
          <label className="text-1xl font-bold" for="exampleFormControlInput1">
            Company name :
          </label>
          <input
            type="text"
            name="name"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter company name"
            onChange={handleInputChange}
          />
        </div>
        <div class="form-group">
          <label className="text-1xl font-bold" for="exampleFormControlInput1">
            Location :
          </label>
          <input
            type="text"
            name="location"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter company location"
            onChange={handleInputChange}
          />
        </div>
        <div class="form-group">
          <label className="text-1xl font-bold" for="exampleFormControlInput1">
            Job Role :
          </label>
          <input
            type="text"
            name="role"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter job role"
            onChange={handleInputChange}
          />
        </div>
        <div class="form-group">
          <label className="text-1xl font-bold" for="exampleFormControlInput1">
            Salary :
          </label>
          <input
            type="number"
            name="salary"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter salary per anum"
            onChange={handleInputChange}
          />
        </div>
        <div class="form-group">
          <label className="text-1xl font-bold" for="exampleFormControlInput1">
            Image Url :
          </label>
          <input
            type="text"
            name="image"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter image URL"
            onChange={handleInputChange}
          />
        </div>
        <div class="form-group">
          <label
            className="text-1xl font-bold"
            for="exampleFormControlTextarea1"
          >
            About job :
          </label>
          <textarea
            class="form-control"
            name="description"
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div class="form-group">
          <label
            className="text-1xl font-bold"
            for="exampleFormControlTextarea1"
          >
            Requrirements :
          </label>
          <textarea
            class="form-control"
            name="requirements"
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div class="form-check mt-2">
          <input
            type="checkbox"
            name="isopen"
            class="form-check-input"
            id="exampleCheck1"
            onChange={handleInputChange}
          />
          <label class="form-check-label" for="exampleCheck1">
            IS Open
          </label>
        </div>
        <div>
          <Button type="submit" variant="dark" className="w-full mt-2">
            Post
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
