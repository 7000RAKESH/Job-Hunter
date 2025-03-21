import { useUser } from "@clerk/clerk-react";
import React, { use } from "react";
import { Navigate, useLocation } from "react-router-dom";

const Protectedroutes = ({ children }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { pathname } = useLocation();
  // console.log(user);
  if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
    return <Navigate to={"/?sign-in=true"} />;
  }

  if (
    user !== undefined &&
    !user?.unsafeMetadata?.role &&
    pathname !== "/onboarding"
  ) {
    return <Navigate to="/onboarding" />;
  }

  return children;
};

export default Protectedroutes;
