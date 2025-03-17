import React from "react";
import faqs from "../../Constants/faq.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

console.log(faqs);
const Footer = () => {
  return (
    <footer className="bg-dark text-white p-4  h-auto">
      <Accordion type="single" collapsible className="w-full font-sans">
        {faqs.map((val, index) => (
          <AccordionItem key={index} value={`item-${index + 1} `}>
            <AccordionTrigger className={"font-light"}>
              {val.question}
            </AccordionTrigger>
            <AccordionContent className={"text-lg font-light"}>
              {val.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </footer>
  );
};

export default Footer;

// {/* <Container>
// <Row>
//   <Col md={4}>
//     <h5>Job Hunter</h5>
//     <p>Your trusted job search platform</p>
//   </Col>
//   <Col md={2}>
//     <h5>Quick Links</h5>
//     <Nav className="flex-column">
//       <Nav.Link href="#" className="text-white p-0 mb-2">
//         About
//       </Nav.Link>
//       <Nav.Link href="#" className="text-white p-0 mb-2">
//         Jobs
//       </Nav.Link>
//       <Nav.Link href="#" className="text-white p-0 mb-2">
//         Contact
//       </Nav.Link>
//     </Nav>
//   </Col>
//   <Col md={2}>
//     <h5>Resources</h5>
//     <Nav className="flex-column">
//       <Nav.Link href="#" className="text-white p-0 mb-2">
//         Blog
//       </Nav.Link>
//       <Nav.Link href="#" className="text-white p-0 mb-2">
//         FAQ
//       </Nav.Link>
//       <Nav.Link href="#" className="text-white p-0 mb-2">
//         Support
//       </Nav.Link>
//     </Nav>
//   </Col>
//   {/* <Col md={4}>
//     <h5>Newsletter</h5>
//     <InputGroup>
//       <Form.Control type="email" placeholder="Enter your email" />
//       <Button variant="light">Subscribe</Button>
//     </InputGroup>
//   </Col> */}
// </Row>
// </Container> */}
