// import React, { useEffect, useState } from "react";
// import { Navbar, Nav, Container } from "react-bootstrap";
// import { Toggletheme } from "../ui/Toggletheme";
// import { Link, useParams, useSearchParams } from "react-router-dom";
// import { BriefcaseBusinessIcon, Heart, LogIn, PenBox } from "lucide-react";
// import { Button } from "../ui/Buttons";
// import { BarLoader } from "react-spinners";
// // import AuthButton from "../AuthContext/Authbutton";

// const NavBar = () => {
//   const [signedIn, setSignedIn] = useState(false);

//   const [search, setSearch] = useSearchParams();

//   useEffect(() => {
//     if (search.get("sign-in")) {
//       setSignedIn(true);
//     }
//   }, [search]);
//   const handelLayOver = (e) => {
//     if (e.target === e.currentTarget) {
//       setSignedIn(false);
//       setSearch({});
//     }
//   };
//   return (
//     <>
//       <Navbar
//         style={{ position: "fixed", width: "100%", zIndex: 1 }}
//         bg="black"
//         variant="dark"
//         expand="lg"
//       >
//         <Container>
//           <Navbar.Brand href="#home">
//             <Link to={"/"}>
//               <img src="/bg.png" style={{ width: "3rem" }} alt="" />
//             </Link>
//           </Navbar.Brand>
//           <Link to={"/login"}>
//             <Button
//               onClick={() => {
//                 setSignedIn(true);
//               }}
//               variant="default"
//               className="ms-2 "
//             >
//               sign in
//             </Button>
//           </Link>

//           {/* {signedIn && (
//             <div className="flex justify-center  gap-8">
//               <Link to="/postjob">
//                 <Button variant="destructive" className={"rounded-full"}>
//                   <PenBox className="mr-2" size={20} />
//                   post Job
//                 </Button>
//               </Link>
//             </div>
//           )} */}
//         </Container>
//       </Navbar>

//       {/* {signedIn && (
//         <div
//           onClick={handelLayOver}
//           className="fixed flex   inset-0 items-center justify-center z-10 bg-black bg-opacity-50"
//         >
//           <Login />
//         </div>
//       )} */}
//     </>
//   );
// };

// export default NavBar;

import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  NavDropdown,
  Form,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BriefcaseBusinessIcon, Heart, HomeIcon, Signpost } from "lucide-react";

import { BarLoader } from "react-spinners";
import { getUsers } from "@/apis/Routes";

const NavBar = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [loginUser, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (userData) {
      setUser(userData);
      setSignedIn(true);
    }
  }, []);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const response = await fetch(getUsers);
      const users = await response.json();

      const foundUser = users.find((user) => user.email === loginUser.email);

      if (foundUser) {
        localStorage.setItem("user", JSON.stringify(foundUser));
        setUser(foundUser);
        setSignedIn(true);
        navigate("/onboarding");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    setLoading(true);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setSignedIn(false);
    setUser({});
    setLoading(false);
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Navbar
      style={{
        width: "100%",
        zIndex: 1,
        position: "fixed",
      }}
      bg="dark"
      variant="dark"
      expand="lg"
    >
      <Container>
        <Navbar.Brand href="/">
          <Link to={"/"}>
            <img src="/bg.png" style={{ width: "3rem" }} alt="Logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <Link to="/" className="nav-link">
              <HomeIcon className="nav-icon" />
            </Link>

            <Link to="/myjob" className="nav-link">
              <BriefcaseBusinessIcon className="nav-icon" />
            </Link>
            <Link to="/savedjobs" className="nav-link">
              <Heart className="nav-icon" />
            </Link>

            {/* {userData.role == "recruiter" ? (
              <Link to="/savedjobs" className="nav-link">
                <Heart className="nav-icon" />
              </Link>
            ) : (
              <Link to="/postjob">
                <Signpost className="nav-icon text-gray-400 mb-1" />
              </Link>
            )} */}

            <div className="ms-2">
              {signedIn ? (
                <Button
                  variant="danger"
                  className="w-full"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              ) : (
                <Link to="/login">
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={handleSignIn}
                  >
                    {loading ? (
                      // <BarLoader color="white" width={100} />
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </Link>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
