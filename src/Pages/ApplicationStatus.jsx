import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, MapPin, Building2 } from "lucide-react";
import { getJobs } from "@/apis/Routes";

import { baseUrl } from "@/apis/Routes";

const PdfImage = ({ pdfUrl }) => {
  if (!pdfUrl) return null; // Handle case where URL is missing

  // Cloudinary transformation to extract the first page as an image
  const imageUrl = pdfUrl.replace("/upload/", "/upload/f_auto,q_auto,pg_1/");

  return (
    <a href={pdfUrl} target="_self" rel="noopener noreferrer">
      <img
        src={imageUrl}
        alt="Resume Preview"
        className="w-40 h-auto border rounded-lg shadow"
      />
    </a>
  );
};

// export default PdfImage;

const ApplicationStatus = () => {
  const navigate = useNavigate();
  const [recruiterApplications, setRecruiterApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);

  const fetchAppliedJobs = async () => {
    try {
      setLoading(true);

      if (!user) {
        navigate("/login");
        return;
      }

      const applicationsResponse = await fetch(`${baseUrl}/job-application`);
      const applications = await applicationsResponse.json();

      const jobsResponse = await fetch(getJobs);
      const allJobs = await jobsResponse.json();

      const recruiterJobs = allJobs.filter((job) => job.recruiterid == user.id);
      // console.log(recruiterJobs);
      const arr = [];

      console.log(applications);
      applications.forEach((application) => {
        application.appliedJobs.forEach((update) => {
          recruiterJobs.forEach((job) => {
            if (job._id == update.jobId) {
              arr.push([application, job]);
            }
          });
        });
      });
      // console.log(arr);
      setRecruiterApplications(arr);
    } catch (err) {
      setError("Failed to fetch applied jobs. Please try again later.");
      console.error("Error fetching applied jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (candidateId, jobId, status) => {
    try {
      const response = await fetch(`${baseUrl}/${candidateId}/${jobId}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();
      console.log("Application status updated:", data);

      // Re-fetch to get updated UI
      await fetchAppliedJobs();
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 pt-40">
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
        <b className="text-3xl font-bold text-white mb-8 ">
          Applied Candidates
        </b>
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
            {recruiterApplications.map((job, index) => {
              const application = job[0];
              const jobDetails = job[1];
              // console.log(application.appliedJobs);
              // console.log(application.resume);
              // Get current status
              const currentStatusObj = application.appliedJobs.find(
                (j) => j.jobId === jobDetails._id
              );
              const currentStatus = currentStatusObj?.status;

              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {jobDetails.role}
                      </h2>
                      <hr />
                      <div className="flex items-center text-gray-600 mt-2 mb-1">
                        <img
                          src={jobDetails.image}
                          className="w-24 h-18 object-contain p-2 "
                          alt="company-logo"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center  text-gray-600">
                          <Building2 className="w-4 h-4 mr-2" />
                          {jobDetails.name}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          {jobDetails.location}
                        </div>
                      </div>
                    </div>

                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {currentStatus}
                    </span>
                  </div>

                  <div className="m-2 pt-2 border-t border-gray-100 flex justify-between">
                    <div className="text-lg font-medium text-gray-900">
                      <b>Salary :</b>{" "}
                      {jobDetails.salary
                        ? `${jobDetails.salary} ₹ per anum`
                        : `NA`}
                    </div>
                  </div>

                  <div className="mt-6 p-4 border border-gray-200 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      Candidate Details
                    </h2>
                    <div className="space-y-2">
                      <p>
                        <strong>Name:</strong>{" "}
                        {application.candidatename.toUpperCase()}
                      </p>
                      <p>
                        <strong>Education:</strong> {application.education}
                      </p>
                      <p>
                        <strong>Experience:</strong> {application.experience}{" "}
                        years
                      </p>
                      <p>
                        <strong>Skills:</strong> {application.skills}
                      </p>
                      <div className="flex flex-col items-start mt-2">
                        <strong>Resume:</strong>
                        {application.resume ? (
                          <>
                            {/* <PdfImage pdfUrl={application.resume} /> */}
                            <a
                              href={application.resume}
                              target="_self"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:text-blue-700 mt-2"
                            >
                              View Full Resume
                            </a>
                          </>
                        ) : (
                          <p className="text-gray-500">No resume uploaded.</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <select
                    className="form-select mt-2 border-gray-300 rounded-md"
                    aria-label="Change application status"
                    value={currentStatus}
                    onChange={(e) =>
                      handleStatus(
                        application.candidateId,
                        jobDetails._id,
                        e.target.value
                      )
                    }
                  >
                    <option value="applied">Applied</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="selected">Selected</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationStatus;

// {/* <div className="flex items-center">
// <strong>Resume:</strong>
// <a
//   href={application.resume}
//   target="_self"
//   rel="noopener noreferrer"
//   className="ml-2 text-blue-500 hover:text-blue-700"
// >
//   <PdfImage value={application.resume} />
//   {/* <img
//     src="https://res.cloudinary.com/dnydrlzfu/image/upload/f_auto,q_auto,pg_1//v1743767025/resumes/resume_1743766995364.pdf"
//     alt="noimg"
//   /> */}
//   {/* <iframe
//     src="https://res.cloudinary.com/dnydrlzfu/image//upload/f_auto,q_auto,pg_1//v1743767025/resumes/resume_1743766995364.pdf"
//     width="100%"
//     height="500px"
//     style={{ border: "none" }}
//   /> */}
//   View Resume
// </a>
// </div> */}
