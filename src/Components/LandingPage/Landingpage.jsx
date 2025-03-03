import React from "react";
import NavBar from "../Header/Header/Navbar";
import HeroSection from "../Hero-section/HeroSection";
import Jobs from "../Jobs/Jobs";
import Companies from "../Companies/Companies";
import CallToACtion from "../CTA/CallToACtion";
import Footer from "../Footer/Footer";

const JobHunterLanding = () => {
  return (
    <>
      <NavBar />
      <br />
      <br />
      <HeroSection />

      <Jobs />

      <Companies />

      <CallToACtion />

      <Footer />
    </>
  );
};

export default JobHunterLanding;
