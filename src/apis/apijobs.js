import { getJobs } from "./Routes";

const fetchData = async () => {
  try {
    const response = await fetch(getJobs); // Path to your data.json
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading job data:", error);
  }
};
export { fetchData };
