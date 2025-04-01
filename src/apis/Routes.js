const baseUrl = "http://localhost:3000";

const getJobs = `${baseUrl}/joblist`;

const myJob = `${baseUrl}/jobs/`;

const getUsers = `${baseUrl}/login`;

const registerUser = `${baseUrl}/register`;

const setRole = `${baseUrl}/updateRole`;

const postJobs = `${baseUrl}/postjob`;

export { getJobs, myJob, getUsers, registerUser, setRole, postJobs };
