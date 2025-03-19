import React from "react";
import NavBar from "./Navbar";
import HeroSection from "./HeroSection";
import Jobs from "./Jobs";
import Companies from "./Companies";
import CallToACtion from "./CallToACtion";
import Footer from "./Footer";

const JobHunterLanding = () => {
  return (
    <>
      <HeroSection />

      <Jobs />

      <Companies />

      <CallToACtion />

      <Footer />
    </>
  );
};

export default JobHunterLanding;
