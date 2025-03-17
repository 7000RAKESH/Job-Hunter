import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Landingpage from "./Components/LandingPage/Landingpage";
import Applayout from "./Layout/Applayout";
import Onboarding from "./Pages/Onboarding";
import Job from "./Pages/Job";
import Postjob from "./Pages/Postjob";
import JobListing from "./Pages/JobListing";
import Myjobs from "./Pages/Myjobs";
import Savedjob from "./Pages/Savedjob";
import { ThemeProvider } from "./Components/ui/Themeprovider";

const routers = createBrowserRouter([
  {
    element: <Applayout />,
    children: [
      {
        path: "/",
        element: <Landingpage />,
      },
      {
        path: "/onboarding",
        element: <Onboarding />,
      },
      {
        path: "/job/:id",
        element: <Job />,
      },
      {
        path: "/post-job",
        element: <Postjob />,
      },
      {
        path: "/joblist",
        element: <JobListing />,
      },
      {
        path: "/myjob",
        element: <Myjobs />,
      },
      {
        path: "/saved-jobs",
        element: <Savedjob />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={routers} />;
    </ThemeProvider>
  );
}

export default App;
