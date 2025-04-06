// import { fetchData } from "@/apis/apijobs";
// import Jobcard from "@/Components/LandingPage/Jobcard";

// import { Briefcase } from "lucide-react";
// import React, { useState, useEffect } from "react";
// import { Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const Savejob = () => {
//   const [jobsData, setJobsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [appliedCandidates, setAppliedCandidates] = useState([]);
//   const [savedJobs, setSavedJobs] = useState([]);
//   const user = JSON.parse(localStorage.getItem("user"));
//   const navigate = useNavigate();
//   // Fetch saved jobs for the user
//   // console.log(user);
//   const savedJobsForUser = async () => {
//     const res = await fetch("http://localhost:3000/save-job");
//     const data = await res.json();
//     setAppliedCandidates(data);
//   };
//   // console.log(appliedCandidates);
//   // Toggle the save/unsave status
//   const toggleSave = (jobId) => {
//     const savedJobToSend = {
//       candidateId: user.id,
//       jobId: jobId,
//     };

//     fetch("http://localhost:3000/save-job", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(savedJobToSend),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Update the saved jobs after toggling
//         setSavedJobs((prevSavedJobs) => {
//           if (prevSavedJobs.includes(jobId)) {
//             return prevSavedJobs.filter((id) => id !== jobId); // Remove from saved jobs
//           } else {
//             return [...prevSavedJobs, jobId]; // Add to saved jobs
//           }
//         });
//       })
//       .catch((error) => {
//         console.error("Error saving job:", error);
//       });
//   };

//   // Fetch job data and saved jobs on component mount
//   useEffect(() => {
//     const fetchJobData = async () => {
//       try {
//         const res = await fetchData();
//         setJobsData(res);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching job data:", error);
//         setLoading(false);
//       }
//     };

//     savedJobsForUser();
//     fetchJobData();
//   }, []);

//   // Filter saved jobs for the logged-in user
//   const filteredCandidates = appliedCandidates.find(
//     (candidate) => candidate.candidateId == user.id
//   );

//   console.log(filteredCandidates);
//   // If filteredCandidates exists, we get saved jobs
//   const appliedJobs = filteredCandidates
//     ? jobsData.filter((job) => filteredCandidates.savedJobs.includes(job._id))
//     : [];

//   console.log(appliedJobs);
//   return (
//     <div
//       style={{
//         backgroundColor: "#3674B5",
//         color: "white",
//         height: "auto",
//         width: "100%",
//         minHeight: "100vh",
//         boxSizing: "border-box",
//         textAlign: "center",
//         paddingTop: "5rem",
//       }}
//     >
//       <div className="pt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {loading ? (
//           <b>Loading...</b>
//         ) : (
//           appliedJobs.length > 0 &&
//           appliedJobs.map((job) => (
//             <Jobcard
//               key={job._id}
//               job={job}
//               isSaved={savedJobs.includes(job._id)} // Pass save status
//               toggleSave={() => toggleSave(job._id)} // Toggle save function
//             />
//           ))
//         )}
//       </div>

//       {appliedJobs.length == 0 && (
//         <div
//           className="bg-white rounded-xl shadow-sm p-6 text-center m-auto"
//           style={{ height: "auto", width: "50%" }}
//         >
//           <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-black mb-2">
//             No Saved Jobs Yet
//           </h2>
//           <p className="text-gray-500 mb-4">You haven't saved any jobs yet.</p>
//           <Button onClick={() => navigate("/joblist")} className="">
//             Browse Jobs
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Savejob;

import { fetchData } from "@/apis/apijobs";
import Jobcard from "@/Components/LandingPage/Jobcard";
import { Briefcase } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { baseUrl } from "@/apis/Routes";

const Savejob = () => {
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // Fetch saved jobs for the user
  const savedJobsForUser = async () => {
    try {
      const res = await fetch(`${API_URL}/save-job`);
      const data = await res.json();

      // Find saved jobs for the current user
      const userSavedJobs = data.find((c) => c.candidateId == user.id);
      setSavedJobs(userSavedJobs ? userSavedJobs.savedJobs : []);
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
    }
  };

  // Toggle the save/unsave status
  const toggleSave = async (jobId) => {
    try {
      const savedJobToSend = {
        candidateId: user.id,
        jobId: jobId,
      };

      const response = await fetch(`${baseUrl}/save-job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(savedJobToSend),
      });

      const data = await response.json();

      // Toggle job ID in savedJobs state
      setSavedJobs((prevSavedJobs) =>
        prevSavedJobs.includes(jobId)
          ? prevSavedJobs.filter((id) => id !== jobId)
          : [...prevSavedJobs, jobId]
      );
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  // Fetch job data and saved jobs on component mount
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const res = await fetchData();
        setJobsData(res);
      } catch (error) {
        console.error("Error fetching job data:", error);
      } finally {
        setLoading(false);
      }
    };

    savedJobsForUser();
    fetchJobData();
  }, []);

  // Get saved jobs from job data
  const appliedJobs = jobsData.filter((job) => savedJobs.includes(job._id));

  return (
    <div
      style={{
        backgroundColor: "#3674B5",
        color: "white",
        height: "auto",
        width: "100%",
        minHeight: "100vh",
        boxSizing: "border-box",
        textAlign: "center",
        paddingTop: "5rem",
      }}
    >
      <div className="pt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <b>Loading...</b>
        ) : (
          appliedJobs.length > 0 &&
          appliedJobs.map((job) => (
            <Jobcard
              key={job._id}
              job={job}
              isSaved={savedJobs.includes(job._id)} // Dynamically update saved status
              toggleSave={() => toggleSave(job._id)} // Toggle save function
            />
          ))
        )}
      </div>

      {appliedJobs.length === 0 && (
        <div
          className="bg-white rounded-xl shadow-sm p-6 text-center m-auto"
          style={{ height: "auto", width: "50%" }}
        >
          <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-black mb-2">
            No Saved Jobs Yet
          </h2>
          <p className="text-gray-500 mb-4">You haven't saved any jobs yet.</p>
          <Button onClick={() => navigate("/joblist")}>Browse Jobs</Button>
        </div>
      )}
    </div>
  );
};

export default Savejob;

// import { fetchData } from "@/apis/apijobs";
// import Jobcard from "@/Components/LandingPage/Jobcard";
// import { Briefcase } from "lucide-react";
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Savejob = () => {
//   const [jobsData, setJobsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [appliedCandidates, setAppliedCandidates] = useState([]);
//   const [savedJobs, setSavedJobs] = useState([]);
//   const user = JSON.parse(localStorage.getItem("user"));
//   const navigate = useNavigate();

//   // Fetch saved jobs for the user
//   const savedJobsForUser = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/save-job");
//       const data = await res.json();
//       setAppliedCandidates(data);
//     } catch (error) {
//       console.error("Error fetching saved jobs:", error);
//     }
//   };

//   // Toggle the save/unsave status
//   const toggleSave = (jobId) => {
//     const savedJobToSend = {
//       candidateId: user.id,
//       jobId: jobId,
//     };

//     fetch("http://localhost:3000/save-job", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(savedJobToSend),
//     })
//       .then((response) => response.json())
//       .then(() => {
//         // Update the saved jobs after toggling
//         setSavedJobs((prevSavedJobs) => {
//           if (prevSavedJobs.includes(jobId)) {
//             return prevSavedJobs.filter((id) => id !== jobId); // Remove from saved jobs
//           } else {
//             return [...prevSavedJobs, jobId]; // Add to saved jobs
//           }
//         });
//       })
//       .catch((error) => {
//         console.error("Error saving job:", error);
//       });
//   };

//   // Fetch job data and saved jobs on component mount
//   useEffect(() => {
//     const fetchJobData = async () => {
//       try {
//         const res = await fetchData();
//         setJobsData(res);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching job data:", error);
//         setLoading(false);
//       }
//     };

//     savedJobsForUser();
//     fetchJobData();
//   }, []);

//   // Filter saved jobs for the logged-in user
//   const filteredCandidates = appliedCandidates.find(
//     (candidate) => candidate.candidateId == user.id
//   );

//   // If filteredCandidates exists, we get saved jobs
//   const appliedJobs = filteredCandidates
//     ? jobsData.filter((job) => filteredCandidates.savedJobs.includes(job.id))
//     : [];

//   return (
//     <div
//       style={{
//         backgroundColor: "#3674B5",
//         color: "#2d3748",
//         minHeight: "100vh",
//         padding: "6rem 2rem",
//         textAlign: "center",
//         fontFamily: "'Roboto', sans-serif",
//       }}
//     >
//       <h1 className="text-3xl font-bold mb-8 text-blue-600">Your Saved Jobs</h1>

//       {loading ? (
//         <div className="text-xl font-semibold">Loading...</div>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {appliedJobs.length > 0 ? (
//             appliedJobs.map((job) => (
//               <Jobcard
//                 key={job.id}
//                 job={job}
//                 isSaved={savedJobs.includes(job.id)} // Pass save status
//                 toggleSave={() => toggleSave(job.id)} // Toggle save function
//               />
//             ))
//           ) : (
//             <div
//               className="bg-white rounded-xl shadow-lg p-8 text-center w-full"
//               style={{ maxWidth: "400px", margin: "0 auto" }}
//             >
//               <Briefcase className="w-16 h-16 text-gray-500 mb-4 mx-auto" />
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                 No Saved Jobs Yet
//               </h2>
//               <p className="text-gray-500 mb-4">
//                 You haven’t saved any jobs yet. Start exploring jobs and save
//                 your favorites.
//               </p>
//               <button
//                 onClick={() => navigate("/joblist")}
//                 className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 Browse Jobs
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Savejob;
