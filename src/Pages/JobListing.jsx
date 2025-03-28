import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { BarLoader } from "react-spinners";
import Jobcard from "@/Components/LandingPage/Jobcard"; // Assuming you have a Jobcard component
import { Input } from "@/Components/ui/input"; // Assuming you have an Input component
import { fetchData } from "@/apis/apijobs";
const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate loading job data from a local JSON file
  useEffect(() => {
    const res = fetchData().then((data) => {
      setJobsData(data);
      setLoading(false);
    });
  }, []);

  const filteredJobs = jobsData.filter((job) => {
    // Filter based on search query, location, and open status
    const isJobOpen = job.isOpen;
    const matchesQuery =
      job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = job.location
      .toLowerCase()
      .includes(location.toLowerCase());

    return isJobOpen && matchesQuery && matchesLocation;
  });

  const handleSearch = (event) => {
    event.preventDefault();
    // Trigger the filter action by setting search query
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

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
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
          Search
        </Button>
      </form>

      {/* Filter by Location */}
      <div className="mb-4  w-auto m-6 bg-white text-dark">
        <Input
          type="text"
          placeholder="Filter by Location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Job Listings */}
      <div className="pt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <Jobcard key={job.id} job={job} />)
        ) : (
          <b>No jobs available</b>
        )}
      </div>
    </div>
  );
};

export default JobListing;
