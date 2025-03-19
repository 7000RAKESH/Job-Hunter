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
import Protectedroutes from "./Components/LandingPage/Protectedroutes";
import PagenotFound from "./Pages/PagenotFound";

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
        element: (
          <Protectedroutes>
            <Onboarding />,
          </Protectedroutes>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <Protectedroutes>
            <Job />,
          </Protectedroutes>
        ),
      },
      {
        path: "/post-job",
        element: (
          <Protectedroutes>
            <Postjob />
          </Protectedroutes>
        ),
      },
      {
        path: "/joblist",
        element: (
          <Protectedroutes>
            <JobListing />,
          </Protectedroutes>
        ),
      },
      {
        path: "/myjob",
        element: (
          <Protectedroutes>
            <Myjobs />,
          </Protectedroutes>
        ),
      },
      {
        path: "/saved-jobs",
        element: (
          <Protectedroutes>
            <Savedjob />,
          </Protectedroutes>
        ),
      },
      {
        path: "/*",
        element: (
          <Protectedroutes>
            <PagenotFound />
          </Protectedroutes>
        ),
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
