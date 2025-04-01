import React from "react";
import PostJob from "./Postjob";
import PostedJobs from "./Postedjobs";
import Savejob from "./Savejob";

const Savedjob = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return <>{user.role == "candidate" ? <Savejob /> : <PostedJobs />}</>;
};

export default Savedjob;
