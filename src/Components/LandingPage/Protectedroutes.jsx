// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";

// const Protectedroutes = ({ children }) => {
//   const location = useLocation();
//   const data = JSON.parse(localStorage.getItem("user"));
//   // console.log(data);
//   const role = localStorage.getItem("role");
//   if (data?.email) {
//     if (!data.role && location.pathname !== "/onboarding") {
//       return <Navigate to="/onboarding" state={{ from: location }} />;
//     }
//     if (data.role) {
//       if (data.role === "candidate" && location.pathname !== "/joblist") {
//         return <Navigate to="/joblist" state={{ from: location }} />;
//       }
//       if (data.role === "recruiter" && location.pathname !== "/postjob") {
//         return <Navigate to="/postjob" state={{ from: location }} />;
//       }
//     }
//   }

//   if (!data?.email && location.pathname !== "/login") {
//     return <Navigate to="/login" state={{ from: location }} />;
//   }

//   // If the user is either not authenticated or has completed onboarding, render the children
//   return children;
// };

// export default Protectedroutes;

import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // const location = useLocation();
  // const user = JSON.parse(localStorage.getItem("user") || "{}");
  // const role = localStorage.getItem("role");

  // // Not logged in
  // if (!user?.email) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  // // No role assigned yet
  // if (!user.role && location.pathname !== "/onboarding") {
  //   return <Navigate to="/onboarding" state={{ from: location }} replace />;
  // }

  // // Role-based redirects
  // if (user.role) {
  //   if (
  //     user.role === "candidate" &&
  //     location.pathname !== "/joblist" &&
  //     location.pathname !== "/onboarding"
  //   ) {
  //     return <Navigate to="/joblist" state={{ from: location }} replace />;
  //   }
  //   if (
  //     user.role === "recruiter" &&
  //     location.pathname !== "/postjob" &&
  //     location.pathname !== "/onboarding"
  //   ) {
  //     return <Navigate to="/postjob" state={{ from: location }} replace />;
  //   }
  // }

  return <>{children}</>;
};

export default ProtectedRoute;
