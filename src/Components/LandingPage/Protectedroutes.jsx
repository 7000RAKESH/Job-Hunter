import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Not logged in
  if (!user?.email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // No role assigned yet
  if (!user?.role && location?.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" state={{ from: location }} replace />;
  }

  // Role-based redirects
  if (user?.role) {
    if (
      user?.role === "candidate" &&
      location?.pathname !== "/joblist" &&
      location?.pathname !== "/onboarding" &&
      location?.pathname !== "/savedjobs" &&
      location?.pathname !== "/myjob"
    ) {
      return <Navigate to="/joblist" state={{ from: location }} replace />;
    }
    if (
      user?.role === "recruiter" &&
      location?.pathname !== "/postjob" &&
      location?.pathname !== "/onboarding" &&
      location?.pathname !== "/myjob" &&
      location?.pathname !== "/savedjobs"
    ) {
      return <Navigate to="/postjob" state={{ from: location }} replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
