const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cors = require("cors");
const app = express();
const multer = require("multer");
const { error } = require("console");
const path = require("path");
const { message } = require("antd");
const PORT = 3000;

const datafile = "./Models/data.json";
const usersfile = "./Models/users.json";
const savedJobsData = "./Models/savedjobs.json";
const applicationsData = "./Models/applications.json";

const secret_key = "login_System";
const salt = 10;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files (resumes) from the "uploads" folder
app.use("/uploads", express.static("uploads"));

const readSavedFile = () => {
  try {
    const data = fs.readFileSync(savedJobsData, "utf8");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    return [];
  }
};

const writeSavedData = (data) => {
  return fs.writeFileSync(savedJobsData, JSON.stringify(data, null, 2));
};

const readApplyFile = () => {
  try {
    const data = fs.readFileSync(applicationsData, "utf8");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    return [];
  }
};

const writeApplyData = (data) => {
  return fs.writeFileSync(applicationsData, JSON.stringify(data, null, 2));
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Store the file in "uploads" directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
  },
});

const upload = multer({ storage });

app.post("/job-application", upload.single("resume"), (req, res) => {
  const {
    skills,
    experience,
    education,
    candidateId,
    candidatename,
    appliedJobId,
    status,
  } = req.body;
  const resumeFile = req.file;

  fs.readFile(applicationsData, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading file" });
    }

    let candidates = [];
    if (data) {
      candidates = JSON.parse(data);
    }

    // Find candidate or create new one if not found
    let candidate = candidates.find((c) => c.candidateId === candidateId);

    // If the candidate doesn't exist, create a new candidate entry
    if (!candidate) {
      candidate = {
        candidateId: candidateId,
        candidatename: candidatename,
        appliedJobs: [], // Initialize with an empty array
        skills: skills,
        experience: experience,
        education: education,
        resume: resumeFile ? resumeFile.path : null, // Save the path to the resume file
      };
      candidates.push(candidate); // Add the new candidate to the array
    }

    // Check if the candidate has already applied for this job
    const existingJob = candidate.appliedJobs.find(
      (job) => job.jobId === appliedJobId
    );

    if (existingJob) {
      // If the job already exists, update its status
      existingJob.status = status;
    } else {
      // Otherwise, add the job with the status
      candidate.appliedJobs.push({
        jobId: appliedJobId,
        status: "Applied", // Set the initial status for this job
      });
    }

    // Save the updated candidates data back to the file
    fs.writeFile(
      applicationsData,
      JSON.stringify(candidates, null, 2),
      (err) => {
        if (err) {
          return res.status(500).json({ error: "Error saving application" });
        }

        res.status(200).json({ message: "Application submitted successfully" });
      }
    );
  });
});

// app.post("/job-application", upload.single("resume"), (req, res) => {
//   const {
//     skills,
//     experience,
//     education,
//     candidateId,
//     candidatename,
//     appliedJobId,
//     status,
//   } = req.body;
//   const resumeFile = req.file;

//   fs.readFile(applicationsData, "utf-8", (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: "Error reading file" });
//     }

//     let candidates = [];
//     if (data) {
//       candidates = JSON.parse(data);
//     }

//     let candidate = candidates.find((c) => c.candidateId === candidateId);

//     // If the candidate doesn't exist, create a new candidate entry
//     if (!candidate) {
//       candidate = {
//         candidateId: candidateId,
//         candidatename: candidatename,
//         appliedJobs: [],
//         skills: skills,
//         experience: experience,
//         education: education,
//         resume: resumeFile ? resumeFile.path : null, // Save the path to the resume file
//         status: status,
//       };
//       candidates.push(candidate); // Add the new candidate to the array
//     }

//     // If the candidate exists, just add the applied job ID to the appliedJobs array
//     if (!candidate.appliedJobs.includes(appliedJobId)) {
//       candidate.appliedJobs.push(appliedJobId);
//     }

//     // Save the updated candidates data back to the file
//     fs.writeFile(
//       applicationsData,
//       JSON.stringify(candidates, null, 2),
//       (err) => {
//         if (err) {
//           return res.status(500).json({ error: "Error saving application" });
//         }

//         res.status(200).json({ message: "Application submitted successfully" });
//       }
//     );
//   });
// });

app.get("/job-application", (req, res) => {
  const data = readApplyFile();
  res.send(data);
});

app.post("/jobs/:id/apply", (req, res) => {
  const { skills, experience, education, upload } = req.body;
  const id = req.params.id;
  // console.log(skills);
  const data = readDataFile();
  const job = data.find((user) => id == user.id);
  const appliedData = readApplyFile();
  console.log(appliedData[appliedData.length - 1]);

  res.send("yes");
});

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests only from this origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow these HTTP methods
    credentials: true, // Allow cookies and credentials to be sent
  })
);

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// function authMiddleware(req, res, next) {
//   const token = req.headers["authorization"]?.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }
//   jwt.verify(token, secret_key, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//     req.user = decoded;
//     next();
//   });
// }

// app.use(authMiddleware);

const readDataFile = () => {
  try {
    const data = fs.readFileSync(datafile, "utf8");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    return [];
  }
};

const writeDataFile = (data) => {
  return fs.writeFileSync(datafile, JSON.stringify(data, null, 2));
};

const readUsersFile = () => {
  try {
    const data = fs.readFileSync(usersfile, "utf8");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    return [];
  }
};

const writeUsersData = (data) => {
  return fs.writeFileSync(usersfile, JSON.stringify(data, null, 2));
};

app.post("/register", async (req, res) => {
  const { email, password, username } = req.body;
  console.log(req.body);
  const userData = readUsersFile();
  req.body.id = userData.length ? userData[userData.length - 1].id + 1 : 1;
  const hashedPassword = await bcrypt.hash(password, salt);
  userData.push({ ...req.body, password: hashedPassword });
  writeUsersData(userData);
  res
    .status(201)
    .json({ message: "User created successfully", data: req.body });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("You missed inputs");
  }
  const data = readUsersFile();
  const user = data.find((user) => user.email === email);
  if (!user) {
    return res.status(404).send("User not found");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (isPasswordCorrect) {
    const token = jwt.sign(user, secret_key, { expiresIn: "3h" });
    return res.status(200).json({
      message: `Welcome ${user.username}`,
      token,
      status: 200,
      user,
    });
  } else {
    return res.status(401).send("Incorrect password");
  }
});

app.get("/joblist", (req, res) => {
  const jobsData = readDataFile();
  res.json(jobsData);
});

app.get("/register", (req, res) => {
  const jobsData = readUsersFile();
  res.json(jobsData);
});

app.get("/users", (req, res) => {
  const users = readUsersFile();
  res.json(users);
});

app.post("/postjob", (req, res) => {
  const data = readDataFile();
  const {
    name,
    image,
    description,
    role,
    requirements,
    isopen,
    location,
    recruiterid,
    salary,
  } = req.body;

  if (!name || !description || !role || !location) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const jobsData = readDataFile();
  const newJob = {
    id: jobsData.length ? jobsData[jobsData.length - 1].id + 1 : 1,
    name,
    image,
    description,
    role,
    requirements,
    isopen,
    location,
    recruiterid,
    salary,
  };

  jobsData.push(newJob);
  writeDataFile(jobsData);

  res.status(201).json({ message: "Job posted successfully", data: newJob });
});

// PUT - Update a job listing (optional)
app.put("/jobs/:id", (req, res) => {
  const { id } = req.params;
  const { name, image, description, role, requirements, isOpen, location } =
    req.body;

  const jobsData = readDataFile();
  const jobIndex = jobsData.findIndex((job) => job.id === parseInt(id));

  if (jobIndex === -1) {
    return res.status(404).json({ message: "Job not found" });
  }

  const updatedJob = {
    ...jobsData[jobIndex],
    name,
    image,
    description,
    role,
    requirements,
    isOpen,
    location,
  };

  jobsData[jobIndex] = updatedJob;
  writeDataFile(jobsData);

  res
    .status(200)
    .json({ message: "Job updated successfully", data: updatedJob });
});

app.delete("/jobs/:id", (req, res) => {
  const { id } = req.params;

  const jobsData = readDataFile();
  const jobIndex = jobsData.findIndex((job) => job.id === parseInt(id));

  if (jobIndex === -1) {
    return res.status(404).json({ message: "Job not found" });
  }

  jobsData.splice(jobIndex, 1);
  writeDataFile(jobsData);

  res.status(200).json({ message: "Job deleted successfully" });
});

app.get("/jobs/:id", (req, res) => {
  const jobId = req.params.id;
  const data = JSON.parse(fs.readFileSync(datafile, "utf8"));
  // console.log(data);
  const job = data.find((job) => job.id === JSON.parse(jobId));
  if (job) {
    res.json(job);
  } else {
    res.status(404).json({ message: "Job not found" });
  }
});

app.post("/updateRole", (req, res) => {
  const { email, role } = req.body;

  if (!email || !role) {
    return res.status(400).json({ error: "Email and role are required." });
  }

  const users = readUsersFile();
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  if (user.role) {
    return res
      .status(400)
      .json({ error: "User already has a role. Role cannot be changed." });
  }
  user.role = role;
  writeUsersData(users);

  return res.status(200).json({ message: "Role updated successfully." });
});

app.get("/save-job", (rwq, res) => {
  const data = readSavedFile();
  res.send(data);
});

// 4. **Save a Job**

app.post("/save-job", (req, res) => {
  const { candidateId, jobId } = req.body;

  if (!candidateId || !jobId) {
    return res
      .status(400)
      .json({ message: "Candidate ID and Job ID are required" });
  }

  // Read the saved jobs data
  const savedJobs = readSavedFile();

  // Find the candidate's saved jobs entry
  const candidateSavedJobs = savedJobs.find(
    (savedJob) => savedJob.candidateId === candidateId
  );

  // If the candidate doesn't have any saved jobs, create a new entry
  if (!candidateSavedJobs) {
    savedJobs.push({
      candidateId,
      savedJobs: [jobId], // Save the job if it's the first time
    });
  } else {
    // If the candidate already has saved jobs
    const jobIndex = candidateSavedJobs.savedJobs.indexOf(jobId);

    if (jobIndex === -1) {
      // If the job is not already saved, save it
      candidateSavedJobs.savedJobs.push(jobId);
      res.status(200).json({ message: "Job saved successfully" });
    } else {
      // If the job is already saved, unsave it (remove it from the array)
      candidateSavedJobs.savedJobs.splice(jobIndex, 1);
      res.status(200).json({ message: "Job unsaved successfully" });
    }
  }

  // Write the updated saved jobs data back to the file
  writeSavedData(savedJobs);
});

// app.post("/save-job", (req, res) => {
//   const { candidateId, jobId } = req.body;
//   if (!candidateId || !jobId) {
//     return res
//       .status(400)
//       .json({ message: "Candidate ID and Job ID are required" });
//   }

//   const savedJobs = readSavedFile();
//   const candidateSavedJobs = savedJobs.find(
//     (savedJob) => savedJob.candidateId === candidateId
//   );

//   if (!candidateSavedJobs) {
//     savedJobs.push({
//       candidateId,
//       savedJobs: !savedJobs.includes(jobId) && [jobId],
//     });
//   } else {
//     candidateSavedJobs.savedJobs.push(jobId);
//   }

//   writeSavedData(savedJobs);

//   res.status(201).json({ message: "Job saved successfully" });
// });

// 6. **Update Job Status (For Recruiters)**
app.patch("/status/:id", (req, res) => {
  const id = req.params.id;
  const { isopen } = req.body;
  const jobs = readDataFile();

  const jobIndex = jobs.findIndex((job) => job.id == id);

  if (jobIndex === -1) {
    return res.status(404).json({ message: "Job not found" });
  }

  jobs[jobIndex].isopen = isopen;
  // console.log(jobs[jobIndex]);
  // console.log(jobs);
  writeDataFile(jobs);
  res
    .status(200)
    .json({ message: `Job status updated to ${isopen ? "open" : "closed"}` });
});

// // 7. **Update Application Status (For Recruiters)**

app.patch("/:candidateId/:jobId", (req, res) => {
  const { candidateId, jobId } = req.params;
  const { status } = req.body;
  if (
    !status ||
    !["applied", "interviewing", "selected", "rejected"].includes(status)
  ) {
    return res.status(400).json({ message: "Valid status is required" });
  }
  const applications = readApplyFile();
  const applicationIndex = applications.findIndex(
    (app) => app.candidateId == candidateId
  );

  if (applicationIndex === -1) {
    return res.status(404).json({ message: "Application not found" });
  }
  const appliedJobIndex = applications[applicationIndex].appliedJobs.findIndex(
    (job) => job.jobId === jobId
  );

  if (appliedJobIndex === -1) {
    return res
      .status(404)
      .json({ message: "Job not found in candidate's applied jobs" });
  }

  // Update the status for the specified jobId
  applications[applicationIndex].appliedJobs[appliedJobIndex].status = status;

  writeApplyData(applications);
  res.status(200).json({ message: "Status updated successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
