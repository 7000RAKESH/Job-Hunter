import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Calendar, MapPin, Building2 } from "lucide-react";
import { getJobs } from "@/apis/Routes";
import DropdownToggle from "@/Components/ui/DropdownToggle";
import { baseUrl } from "@/apis/Routes";

const AppliedJobs = () => {
  const navigate = useNavigate();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applications, setApplications] = useState({});
  const [userApplications, setUserApplications] = useState([]);

  const user = localStorage.getItem("user");

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const userString = localStorage.getItem("user");
        if (!userString) {
          navigate("/login");
          return;
        }

        const user = JSON.parse(userString);
        // console.log(user);
        // Fetch user's applications
        const applicationsResponse = await fetch(`${baseUrl}/job-application`);
        const applications = await applicationsResponse.json();
        // console.log(applications);

        const userApplication = applications.find((app) => {
          return app.candidateId == user.id;
        });
        // console.log(userApplication);
        setUserApplications(userApplication);
        // console.log(userApplication.appliedJobs.jobId);
        setApplications(userApplication);
        if (!userApplication) {
          setAppliedJobs([]);
          setLoading(false);
          return;
        }
        const jobsResponse = await fetch(getJobs);
        const allJobs = await jobsResponse.json();
        // console.log(allJobs);
        const userAppliedJobs = allJobs.filter((job) => {
          return userApplication.appliedJobs.some((appliedJob) => {
            return appliedJob.jobId == job._id && job;
          });
        });
        // console.log(userAppliedJobs);

        setAppliedJobs(userAppliedJobs);
      } catch (err) {
        setError("Failed to fetch applied jobs. Please try again later.");
        console.error("Error fetching applied jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [navigate]);

  // console.log(appliedJobs);
  // console.log(userApplications);
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 p-8 pt-28"
      style={{ backgroundColor: "#3674B5" }}
    >
      {error && (
        <div className="min-h-screen bg-gray-50 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              {error}
            </div>
          </div>
        </div>
      )}
      <div className="max-w-4xl mx-auto">
        <b className="text-3xl font-bold text-white mb-8 ">Applied Jobs</b>
        <br />
        <br />
        {appliedJobs.length === 0 ? (
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
            {appliedJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {job.role}
                    </h2>
                    <div className="flex items-center text-gray-600">
                      {/* <Calendar className="w-4 h-4 mr-2" /> */}
                      <img
                        src={job.image}
                        className="w-20 h-10 object-contain"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center  text-gray-600">
                        <Building2 className="w-4 h-4 mr-2" />
                        {job.name}
                        {/* <img
                          src={job.image}
                          className="w-5 h-5 object-contain"
                        /> */}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {job.location}
                      </div>
                      {/* <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        Applied on {job.postedDate}
                      </div> */}
                    </div>
                  </div>

                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {userApplications.appliedJobs.reduce((one) => {
                      return one.jobId == job.id ? one.status : "Applied";
                    })}
                  </span>
                </div>

                <div className="m-2 pt-2 border-t border-gray-100 flex justify-between ">
                  <div className="text-lg font-medium text-gray-900">
                    <b>Salary :</b>
                    {job.salary ? `${job.salary}₹ per anum` : `NA`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;
