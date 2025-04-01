import { getJobs, getUsers, registerUser } from "./Routes";

const fetchData = async () => {
  try {
    const response = await fetch(getJobs); // Path to your data.json
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading job data:", error);
  }
};

const fetchUser = async (options) => {
  let res = await fetch(getUsers, options);
  let data = await res.json();
  return data;
};

const fetchRegisterUser = async (options) => {
  let res = await fetch(registerUser, options);
  let data = await res.json();
  return data;
};

export { fetchData, fetchUser, fetchRegisterUser };
