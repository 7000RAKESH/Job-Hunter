import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Calendar, MapPin, Building2 } from "lucide-react";
import { getJobs } from "@/apis/Routes";
import DropdownToggle from "@/Components/ui/DropdownToggle";
const API_URL = "http://localhost:3000";

const ApplicationStatus = () => {
  const navigate = useNavigate();
  const [recruiterApplications, setRecruiterApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const arr = [];
  const user = JSON.parse(localStorage.getItem("user"));

  const handleStatus = (candidateId, jobId, status) => {
    const body = {
      status: status,
    };
    fetch(`${API_URL}/${candidateId}/${jobId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Application submitted:", data);
      })
      .catch((error) => {
        console.error("Error submitting application:", error);
      });
    setLoading(false);
  };

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        if (!user) {
          navigate("/login");
          return;
        }

        const applicationsResponse = await fetch(`${API_URL}/job-application`);
        const applications = await applicationsResponse.json();

        const jobsResponse = await fetch(getJobs);
        const allJobs = await jobsResponse.json();
        // console.log(allJobs);

        applications.forEach((application) => {
          application.appliedJobs.map((update) => {
            // console.log(update.jobId);
            allJobs.filter((job) => {
              return job.id == update.jobId
                ? arr.push([application, job])
                : "no jobs applied";
            });
          });
        });

        setRecruiterApplications(arr);
      } catch (err) {
        setError("Failed to fetch applied jobs. Please try again later.");
        console.error("Error fetching applied jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [navigate]);

  // recruiterApplications.map((job) => {
  //   console.log(job);
  // });
  // console.log(recruiterApplications);
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 p-8 pt-28"
      style={{ backgroundColor: "#3674B5" }}
    >
      <div className="max-w-4xl mx-auto">
        <b className="text-3xl font-bold text-white mb-8 ">Applied Jobs</b>
        <br />
        <br />
        {recruiterApplications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No Applications Yet
            </h2>
            <p className="text-gray-500 mb-4">
              You haven't applied to any jobs yet.
            </p>
            <button
              onClick={() => navigate("/joblist")}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {recruiterApplications.map((job, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {job[1].role}
                    </h2>
                    <hr />
                    <div className="flex items-center text-gray-600">
                      {/* <Calendar className="w-4 h-4 mr-2" /> */}
                      <img
                        src={job[1].image}
                        className="w-20 h-10 object-contain"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center  text-gray-600">
                        <Building2 className="w-4 h-4 mr-2" />
                        {job[1].name}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {job[1].location}
                      </div>
                      {/* <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        Applied on {job.postedDate}
                      </div> */}
                    </div>
                  </div>

                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {job[0].appliedJobs.map((c) => {
                      return c.jobId == job[1].id && c.status;
                    })}
                  </span>
                </div>

                <div className="m-2 pt-2 border-t border-gray-100 flex justify-between ">
                  <div className="text-lg font-medium text-gray-900">
                    <b>Salary :</b>
                    {job[1].salary ? `${job[1].salary} ₹ per anum` : `NA`}
                  </div>
                </div>

                <div className="mt-6 p-4 border border-gray-200 rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    Candidate Details
                  </h2>
                  <div className="space-y-2">
                    <p>
                      <strong>Name:</strong>{" "}
                      {job[0].candidatename.toUpperCase()}
                    </p>
                    <p>
                      <strong>Education:</strong> {job[0].education}
                    </p>
                    <p>
                      <strong>Experience:</strong> {job[0].experience} years
                    </p>
                    <p>
                      <strong>Skills:</strong> {job[0].skills}
                    </p>
                    <div className="flex items-center">
                      <strong>Resume:</strong>
                      <a
                        href={`/${job[0].resume}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-500 hover:text-blue-700"
                      >
                        View Resume
                      </a>
                    </div>
                  </div>
                </div>

                <select
                  class="form-select mt-2"
                  aria-label="Default select example"
                  onChange={(e) => {
                    handleStatus(job[0].candidateId, job[1].id, e.target.value);
                  }}
                >
                  <option value={"applied"}>Applied</option>
                  <option value="interviewing">Interviewing</option>
                  <option value="selected">Selected</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationStatus;
