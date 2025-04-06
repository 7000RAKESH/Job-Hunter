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
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        path: "/myjob",
        element: <Myjobs />,
      },
      {
        path: "/postjob",
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
            <JobListing />
          </Protectedroutes>
        ),
      },
      {
        path: "/jobs/:id",
        element: <Job />,
      },
      {
        path: "/savedjobs",
        element: (
          <Protectedroutes>
            <Savedjob />
          </Protectedroutes>
        ),
      },
      {
        path: "/*",
        element: <PagenotFound />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ToastContainer position="top-right" autoClose={2000} />
      <RouterProvider router={routers} />
    </ThemeProvider>
  );
}

export default App;
