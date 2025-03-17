import NavBar from "@/Components/LandingPage/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const Applayout = () => {
  return (
    <div>
      {/* <main className="grid-background">
        <NavBar />
      </main> */}
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Applayout;
