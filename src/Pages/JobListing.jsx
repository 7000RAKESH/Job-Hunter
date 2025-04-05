import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { BarLoader } from "react-spinners";
import Jobcard from "@/Components/LandingPage/Jobcard";
import { Input } from "@/Components/ui/input";
import { fetchData } from "@/apis/apijobs";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page

  useEffect(() => {
    const res = fetchData().then((data) => {
      setJobsData(data);
      setLoading(false);
    });
  }, []);

  const filteredJobs = jobsData.filter((job) => {
    const matchesQuery =
      job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = job.location
      .toLowerCase()
      .includes(location.toLowerCase());

    return matchesQuery && matchesLocation;
  });

  // Get the current page's jobs
  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const handleClearFilter = (e) => {
    e.preventDefault();
    setSearchQuery("");
    setLocation("");
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading) {
    return (
      <BarLoader
        style={{
          height: "5rem",
          width: "100%",
          marginTop: "10rem",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    );
  }

  // console.log(currentJobs);
  return (
    <div
      className="pt-30"
      style={{
        backgroundColor: "#3674B5",
        color: "white",
        height: "auto",
        width: "100%",
        minHeight: "100vh",
        boxSizing: "border-box",
        textAlign: "center",
      }}
    >
      <b className="text-6xl font-extrabold">Latest Jobs</b>
      <form
        onSubmit={handleClearFilter}
        className="h-14 flex m-4 flex-row w-auto gap-2  justify-between mb-3 text-dark "
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title.."
          name="search-query"
          className="h-full bg-white flex-1 px-4 text-md "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit" className="h-full sm:w-28" variant="danger">
          Clear Filter
        </Button>
      </form>
      <div className="mb-4  w-auto m-6 bg-white text-dark">
        <Input
          type="text"
          placeholder="Filter by Location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="pt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => <Jobcard key={job._id} job={job} />)
        ) : (
          <b>No jobs available</b>
        )}
      </div>

      {/* Pagination controls */}
      <div className="pagination-container p-5">
        <Button
          variant="light"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="light"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default JobListing;
