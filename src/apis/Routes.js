// const baseUrl = "http://localhost:3000";

const baseUrl = "https://job-hunter-backend-a8qv.onrender.com";

// console.log(baseUrl);
const getJobs = `${baseUrl}/joblist`;

const myJob = `${baseUrl}/jobs/`;

const getUsers = `${baseUrl}/login`;

const registerUser = `${baseUrl}/register`;

const setRole = `${baseUrl}/updateRole`;

const postJobs = `${baseUrl}/postjob`;

export { getJobs, myJob, getUsers, registerUser, setRole, postJobs, baseUrl };
