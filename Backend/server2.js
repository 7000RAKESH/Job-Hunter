const express = require("express");
const fs = require("fs-extra");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json()); // For parsing JSON request bodies

// Paths to the data files
const jobsFilePath = "./data/jobs.json";
const usersFilePath = "./data/users.json";
const applicationsFilePath = "./data/applications.json";
const savedJobsFilePath = "./data/savedJobs.json";

// Read data from JSON file
const readDataFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
    return [];
  }
};

// Write data to JSON file
const writeDataFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(`Error writing to file ${filePath}:`, err);
  }
};

// 1. **Get All Jobs**
app.get("/api/jobs", (req, res) => {
  const jobs = readDataFile(jobsFilePath);
  res.json(jobs);
});

// 2. **Get Job by ID**
app.get("/api/jobs/:id", (req, res) => {
  const jobId = parseInt(req.params.id, 10);
  const jobs = readDataFile(jobsFilePath);
  const job = jobs.find((job) => job.id === jobId);
  if (job) {
    res.json(job);
  } else {
    res.status(404).json({ message: "Job not found" });
  }
});

// 3. **Apply for a Job**
app.post("/api/apply", (req, res) => {
  const { job_id, candidate_id } = req.body;
  if (!job_id || !candidate_id) {
    return res
      .status(400)
      .json({ message: "Job ID and Candidate ID are required" });
  }

  const applications = readDataFile(applicationsFilePath);
  const newApplication = {
    id: applications.length + 1,
    job_id,
    candidate_id,
    status: "applied",
    application_date: new Date().toISOString(),
  };

  applications.push(newApplication);
  writeDataFile(applicationsFilePath, applications);

  res
    .status(201)
    .json({
      message: "Application submitted successfully",
      application: newApplication,
    });
});

// 4. **Save a Job**
app.post("/api/save-job", (req, res) => {
  const { candidate_id, job_id } = req.body;
  if (!candidate_id || !job_id) {
    return res
      .status(400)
      .json({ message: "Candidate ID and Job ID are required" });
  }

  const savedJobs = readDataFile(savedJobsFilePath);
  const candidateSavedJobs = savedJobs.find(
    (savedJob) => savedJob.candidate_id === candidate_id
  );

  if (!candidateSavedJobs) {
    savedJobs.push({ candidate_id, saved_jobs: [job_id] });
  } else {
    candidateSavedJobs.saved_jobs.push(job_id);
  }

  writeDataFile(savedJobsFilePath, savedJobs);

  res.status(201).json({ message: "Job saved successfully" });
});

// 5. **Post a New Job (For Recruiters)**
app.post("/api/post-job", (req, res) => {
  const { title, description, location, company, requirements, recruiter_id } =
    req.body;

  if (
    !title ||
    !description ||
    !location ||
    !company ||
    !requirements ||
    !recruiter_id
  ) {
    return res
      .status(400)
      .json({ message: "All fields are required to post a job" });
  }

  const jobs = readDataFile(jobsFilePath);
  const newJob = {
    id: jobs.length + 1,
    title,
    description,
    location,
    company,
    requirements,
    isOpen: true,
    recruiter_id,
    applications: [],
  };

  jobs.push(newJob);
  writeDataFile(jobsFilePath, jobs);

  res.status(201).json({ message: "Job posted successfully", job: newJob });
});

// 6. **Update Job Status (For Recruiters)**
app.patch("/api/jobs/:id/status", (req, res) => {
  const jobId = parseInt(req.params.id, 10);
  const { isOpen } = req.body;

  const jobs = readDataFile(jobsFilePath);
  const jobIndex = jobs.findIndex((job) => job.id === jobId);

  if (jobIndex === -1) {
    return res.status(404).json({ message: "Job not found" });
  }

  jobs[jobIndex].isOpen = isOpen;
  writeDataFile(jobsFilePath, jobs);

  res.json({ message: `Job status updated to ${isOpen ? "open" : "closed"}` });
});

// 7. **Update Application Status (For Recruiters)**
app.patch("/api/applications/:id/status", (req, res) => {
  const applicationId = parseInt(req.params.id, 10);
  const { status } = req.body;

  if (
    !status ||
    !["applied", "interviewing", "selected", "rejected"].includes(status)
  ) {
    return res.status(400).json({ message: "Valid status is required" });
  }

  const applications = readDataFile(applicationsFilePath);
  const applicationIndex = applications.findIndex(
    (app) => app.id === applicationId
  );

  if (applicationIndex === -1) {
    return res.status(404).json({ message: "Application not found" });
  }

  applications[applicationIndex].status = status;
  writeDataFile(applicationsFilePath, applications);

  res.json({ message: `Application status updated to ${status}` });
});

// 8. **Get Applications for a Job**
app.get("/api/jobs/:id/applications", (req, res) => {
  const jobId = parseInt(req.params.id, 10);
  const applications = readDataFile(applicationsFilePath);
  const jobApplications = applications.filter((app) => app.job_id === jobId);

  res.json(jobApplications);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
