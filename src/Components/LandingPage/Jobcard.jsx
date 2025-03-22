import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { useUser } from "@clerk/clerk-react";
import { HeartIcon, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import UseFetch from "@/Hooks/useFetch";

const Jobcard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}) => {
  const [saved, setSaved] = useState(savedInit);
  const {
    fn: fnSavedJob,
    data: savedJob,
    loading: loadingSavedJob,
  } = UseFetch();

  const { user } = useUser();
  const handleSavedJob = async () => {
    await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });
    onJobSaved();
  };

  useEffect(() => {
    if (savedJob !== undefined) {
      setSaved(savedJob?.length > 0);
    }
  }, [saved]);
  return (
    <Card className={"w-auto m-3  "}>
      <CardHeader>
        <CardTitle className={"flex justify-between font-bold"}>
          {job.title}
          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={20}
              className="text-red-300 cursor-pointer"
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className={"flex flex-col gap-4 flex-1"}>
        <div className="flex justify-between">
          {/* {job.companies && <p>{job.companies.name}</p>} */}
          {job.companies && (
            <img src={job.companies.logo_url} className="h-6" />
          )}
          <div className="flex  gap-2 items-center">
            <MapPinIcon size={15} /> {job.location}
          </div>
        </div>
        <hr />
        {job.description}
      </CardContent>
      <CardFooter>
        <Link to={`/jobs/${job.id}`} className="flex-1">
          <Button className="w-full " variant="secondary">
            More Details
          </Button>
        </Link>

        {!isMyJob && (
          <Button
            onClick={handleSavedJob}
            disabled={loadingSavedJob}
            variant="light"
          >
            {saved ? (
              <HeartIcon size={20} stroke="red" fill="red" className="ml-4" />
            ) : (
              <HeartIcon size={20} className="ml-4" />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Jobcard;
