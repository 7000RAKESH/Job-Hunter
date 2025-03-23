import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Toggletheme } from "../ui/Toggletheme";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { BriefcaseBusinessIcon, Heart, PenBox } from "lucide-react";
import { Button } from "../ui/Buttons";
import { BarLoader } from "react-spinners";

const NavBar = () => {
  const [signedIn, setSignedIn] = useState(false);

  const [search, setSearch] = useSearchParams();
  const { user } = useUser();
  useEffect(() => {
    if (search.get("sign-in")) {
      setSignedIn(true);
    }
  }, [search]);
  const handelLayOver = (e) => {
    if (e.target === e.currentTarget) {
      setSignedIn(false);
      setSearch({});
    }
  };
  return (
    <>
      <Navbar
        style={{ position: "fixed", width: "100%", zIndex: 1 }}
        bg="black"
        variant="dark"
        expand="lg"
      >
        <Container>
          <Navbar.Brand href="#home">
            <Link to={"/"}>
              <img src="/bg.png" style={{ width: "3rem" }} alt="" />
            </Link>
          </Navbar.Brand>

          <SignedOut>
            <Button
              onClick={() => {
                setSignedIn(true);
              }}
              variant="default"
              className="ms-2 "
            >
              sign in
            </Button>
          </SignedOut>

          <SignedIn>
            <div className="flex justify-center  gap-8">
              {user?.unsafeMetadata?.role == "recruiter" ? (
                <Link to="/postjob">
                  <Button variant="destructive" className={"rounded-full"}>
                    <PenBox className="mr-2" size={20} />
                    post Job
                  </Button>
                </Link>
              ) : (
                ""
              )}
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="my-jobs"
                    labelIcon={<BriefcaseBusinessIcon size={15} />}
                    href="/myjob"
                  />
                  <UserButton.Link
                    label="savd-jobs"
                    labelIcon={<Heart size={15} />}
                    href="/savedjobs"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </div>
          </SignedIn>
        </Container>
      </Navbar>

      {signedIn && (
        <div
          onClick={handelLayOver}
          className="fixed flex   inset-0 items-center justify-center z-10 bg-black bg-opacity-50"
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            forceRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default NavBar;
