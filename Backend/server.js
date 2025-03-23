const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const app = express();

const PORT = 3000;

const datafile = "./Models/data.json";
const usersfile = "./Models/users.json";
const savedJobs = "./Models/savedjobs.json";
const applications = "./Models/applications.json";

const secret_key = "login_System";

const salt = 10;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authorization Middleware
function authMiddleware(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, secret_key, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
}

// app.use(authMiddleware);

// Read data from JSON files
const readDataFile = () => {
  try {
    const data = fs.readFileSync(datafile, "utf8");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    return [];
  }
};

// Write data to the jobs file
const writeDataFile = (data) => {
  return fs.writeFileSync(datafile, JSON.stringify(data, null, 2));
};

// Read users from the users file
const readUsersFile = () => {
  try {
    const data = fs.readFileSync(usersfile, "utf8");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    return [];
  }
};

// Write users data to the users file
const writeUsersData = (data) => {
  return fs.writeFileSync(usersfile, JSON.stringify(data, null, 2));
};

// POST - Register a new user
app.post("/register", async (req, res) => {
  const { email, password, username } = req.body;
  const userData = readUsersFile();
  req.body.id = userData.length ? userData[userData.length - 1].id + 1 : 1;
  const hashedPassword = await bcrypt.hash(password, salt);
  userData.push({ ...req.body, password: hashedPassword });
  writeUsersData(userData);
  res
    .status(201)
    .json({ message: "User created successfully", data: req.body });
});

// POST - User login (returns a token)
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
    });
  } else {
    return res.status(401).send("Incorrect password");
  }
});

// GET - Show all job listings
app.get("/joblist", (req, res) => {
  const jobsData = readDataFile();
  res.json(jobsData);
});

// POST - Save a new job listing
app.post("/postjob", (req, res) => {
  const { name, image, description, role, requirements, isOpen, location } =
    req.body;

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
    isOpen,
    location,
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

// DELETE - Delete a job listing (optional)
app.delete("/jobs/:id", authMiddleware, (req, res) => {
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

// Fetch job details by ID
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
