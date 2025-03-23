import { getJobs } from "@/apis/apijobs";
import useFetch from "@/Hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { BarLoader } from "react-spinners";
import supabase from "@/utils/supabase2";
import { Input } from "@/Components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import Jobcard from "@/Components/LandingPage/Jobcard";
const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompanyId] = useState("");
  const { isLoaded } = useUser();
  const [jobsData, setJobsData] = useState([]);

  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from("jobs")
      .select("* ,companies(name,logo_url)");
    if (error) {
      console.log(error);
    }
    if (data) {
      setJobsData(data);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  console.log(jobsData);
  const {
    fn: fnJobs,
    data: datajobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  console.log(datajobs);

  useEffect(() => {
    fnJobs();
  }, [isLoaded, location, company_id, searchQuery, jobsData]);

  if (!isLoaded) {
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
    <>
      <div
        className="pt-30"
        style={{
          backgroundColor: "#3674B5",
          color: "white",
          height: "auto",
          width: "100%",
          textAlign: "center",
        }}
      >
        <b className="text-6xl  font-extrabold ">Latest Jobs</b>
        <div className=" pt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* <form
          // onSubmit={handleSearch}
          className="h-14 flex flex-row w-full gap-2 items-center mb-3"
        >
          <Input
            type="text"
            placeholder="Search Jobs by Title.."
            name="search-query"
            className="h-full flex-1  px-4 text-md"
          />
          <Button type="submit" className="h-full sm:w-28" variant="blue">
            Search
          </Button>
        </form> */}

          {loadingJobs && (
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
          )}

          {jobsData ? (
            jobsData.map((job, index) => (
              <Jobcard
                key={job.id}
                job={job}
                savedInit={job.saved?.length > 0}
              />
            ))
          ) : (
            <b>no jobs</b>
          )}
        </div>
      </div>
    </>
  );
};

export default JobListing;

{
  /* <div className="">
        <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
          Latest Jobs
        </h1>

        <div className="flex flex-col sm:flex-row gap-2">
          <Select
            value={location}
            onValueChange={(value) => setLocation(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {State.getStatesOfCountry("IN").map(({ name }) => {
                  return (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={company_id}
            onValueChange={(value) => setCompany_id(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {companies?.map(({ name, id }) => {
                  return (
                    <SelectItem key={name} value={id}>
                      {name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            className="sm:w-1/2"
            variant="destructive"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        </div>

        {loadingJobs && (
          <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
        )}

        {loadingJobs === false && (
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs?.length ? (
              jobs.map((job) => {
                return (
                  <JobCard
                    key={job.id}
                    job={job}
                    savedInit={job?.saved?.length > 0}
                  />
                );
              })
            ) : (
              <div>No Jobs Found 😢</div>
            )}
          </div>
        )}
      </div> */
}
