import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import companies from "../../Constants/companies.json";
import Autoplay from "embla-carousel-autoplay";

const CallToACtion = () => {
  return (
    <section
      className=" text-white py-5 px-3"
      style={{ background: "#3674B5" }}
      id="about"
    >
      <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full py-10">
        <CarouselContent className={"flex gap-5 sm:gap-20 items-center"}>
          {companies.map((val) => (
            <CarouselItem key={val.id} className="basis-1/3 lg:basis-1/6">
              <img
                src={val.path}
                alt={val.name}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default CallToACtion;

{
  /* <Container className="text-center">
<h2 className="mb-4">Ready to Start Your Career Journey?</h2>
<p className="lead mb-4">
  Join thousands of professionals who found their dream jobs through Job
  Hunter
</p>
<div className="d-flex justify-content-center gap-3">
  <Button variant="light" size="lg">
    Sign Up Now
  </Button>
  <Button variant="outline-light" size="lg">
    Learn More
  </Button>
</div>
</Container> */
}
