import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { HeartIcon, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
// import UseFetch from "@/Hooks/useFetch";

const Jobcard = ({ job }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isSaved, setIsSaved] = useState(false);

  const toggleSave = () => {
    const savedJobToSend = {
      candidateId: user.id,
      jobId: job._id,
    };

    fetch("http://localhost:3000/save-job", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(savedJobToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        // Only toggle the saved state after the request succeeds
        setIsSaved(!isSaved);
      })
      .catch((error) => {
        console.error("Error saving job:", error);
      });
  };

  const [saved, setSavde] = useState(false);
  useEffect(() => {
    if (job) {
      setSavde(true);
    }
  }, []);

  return (
    <Card className={"w-auto m-3 bg-white text-black "}>
      <CardHeader>
        <CardTitle className={"flex justify-between font-bold"}>
          {job.role}
          {/* {job && (
            <Trash2Icon
              fill="red"
              size={20}
              className="text-red-300 cursor-pointer"
            />
          )} */}
        </CardTitle>
      </CardHeader>
      <CardContent className={"flex flex-col gap-4 flex-1"}>
        <div className="flex justify-between">
          {/* {job.companies && <p>{job.companies.name}</p>} */}
          {job && <img src={job.image} alt={job.role} className="h-6" />}
          <div className="flex  gap-2 items-center">
            <MapPinIcon size={15} /> {job.location}
          </div>
        </div>
        <hr />
        {job.description}
      </CardContent>
      <CardFooter>
        <Link to={`/jobs/${job._id}`} className="flex-1">
          <Button className="w-full " variant="secondary">
            More Details
          </Button>
        </Link>

        {job && (
          <Button
            onClick={toggleSave}
            // disabled={loadingSavedJob}
            variant="light"
          >
            {/* {isSaved ? (
              <HeartIcon size={20} stroke="red" fill="red" />
            ) : (
              <HeartIcon size={20} />
            )} */}
            <HeartIcon
              className={`w-6 h-6 ${
                isSaved ? "text-red-500" : "text-gray-400"
              }`}
            />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Jobcard;
