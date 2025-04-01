import React, { useEffect, useState } from "react";
import AppliedJobs from "./AppliedJobs";
import PostJob from "./Postjob";
import PostedJobs from "./Postedjobs";
import ApplicationStatus from "./ApplicationStatus";

const Myjobs = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>{user.role == "candidate" ? <AppliedJobs /> : <ApplicationStatus />}</>
  );
};

export default Myjobs;
