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

// import React, { useEffect, useState } from "react";
// import {
//   Navbar,
//   Nav,
//   Container,
//   Button,
//   NavDropdown,
//   Form,
// } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { BriefcaseBusinessIcon, Heart, HomeIcon, Signpost } from "lucide-react";

// import { BarLoader } from "react-spinners";
// import { getUsers } from "@/apis/Routes";

// const NavBar = () => {
//   const [signedIn, setSignedIn] = useState(false);
//   const [loginUser, setUser] = useState({});
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const userData = JSON.parse(localStorage.getItem("user"));
//   useEffect(() => {
//     if (userData) {
//       setUser(userData);
//       setSignedIn(true);
//     }
//   }, []);

//   const handleSignIn = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(getUsers);
//       const users = await response.json();

//       const foundUser = users.find((user) => user.email === loginUser.email);

//       if (foundUser) {
//         localStorage.setItem("user", JSON.stringify(foundUser));
//         setUser(foundUser);
//         setSignedIn(true);
//         navigate("/onboarding");
//       } else {
//         alert("Invalid credentials");
//       }
//     } catch (error) {
//       console.error("Error signing in:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSignOut = () => {
//     setLoading(true);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");

//     setSignedIn(false);
//     setUser({});
//     setLoading(false);
//     navigate("/");
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <Navbar
//       style={{
//         width: "100%",
//         zIndex: 1,
//         position: "fixed",
//       }}
//       bg="dark"
//       variant="dark"
//       expand="lg"
//     >
//       <Container>
//         <Navbar.Brand href="/">
//           <Link to={"/"}>
//             <img src="/bg.png" style={{ width: "3rem" }} alt="Logo" />
//           </Link>
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbar-nav" />
//         <Navbar.Collapse id="navbar-nav">
//           <Nav className="ml-auto">
//             <Link to="/" className="nav-link">
//               <HomeIcon className="nav-icon" />
//             </Link>

//             <Link to="/myjob" className="nav-link">
//               <BriefcaseBusinessIcon className="nav-icon" />
//             </Link>
//             <Link to="/savedjobs" className="nav-link">
//               <Heart className="nav-icon" />
//             </Link>

//             {/* {userData.role == "recruiter" ? (
//               <Link to="/savedjobs" className="nav-link">
//                 <Heart className="nav-icon" />
//               </Link>
//             ) : (
//               <Link to="/postjob">
//                 <Signpost className="nav-icon text-gray-400 mb-1" />
//               </Link>
//             )} */}

//             <div className="ms-2">
//               {signedIn ? (
//                 <Button
//                   variant="danger"
//                   className="w-full"
//                   onClick={handleSignOut}
//                 >
//                   Sign Out
//                 </Button>
//               ) : (
//                 <Link to="/login">
//                   <Button
//                     variant="primary"
//                     className="w-full"
//                     onClick={handleSignIn}
//                   >
//                     {loading ? (
//                       // <BarLoader color="white" width={100} />
//                       <div className="flex justify-center">
//                         <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
//                       </div>
//                     ) : (
//                       "Sign In"
//                     )}
//                   </Button>
//                 </Link>
//               )}
//             </div>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavBar;

// import React, { useEffect, useState } from "react";
// import { Navbar, Nav, Container, Button } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { BriefcaseBusinessIcon, Heart, HomeIcon, Signpost } from "lucide-react";

// const NavBar = () => {
//   const [signedIn, setSignedIn] = useState(false);
//   const [loginUser, setUser] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem("user"));
//     if (userData) {
//       setUser(userData);
//       setSignedIn(true);
//     }
//   }, []);

//   const handleSignOut = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     setSignedIn(false);
//     setUser({});
//     navigate("/");
//   };

//   return (
//     <Navbar
//       expand="lg"
//       bg="dark"
//       variant="dark"
//       className="shadow-sm"
//       fixed="top"
//     >
//       <Container>
//         <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
//           <img
//             src="/bg.png"
//             alt="Logo"
//             style={{ width: "2.5rem", marginRight: "0.5rem" }}
//           />
//           <span>Job Hunter</span>
//         </Navbar.Brand>

//         <Navbar.Toggle aria-controls="main-navbar" />

//         <Navbar.Collapse id="main-navbar">
//           <Nav className="ms-auto align-items-center gap-3">
//             <Nav.Link as={Link} to="/">
//               <HomeIcon className="nav-icon" />
//             </Nav.Link>

//             <Nav.Link as={Link} to="/myjob">
//               <BriefcaseBusinessIcon className="nav-icon" />
//             </Nav.Link>

//             <Nav.Link as={Link} to="/savedjobs">
//               <Heart className="nav-icon" />
//             </Nav.Link>

//             {/* Optional recruiter-specific link */}
//             {/* {loginUser?.role === "recruiter" && (
//               <Nav.Link as={Link} to="/postjob">
//                 <Signpost className="nav-icon text-secondary" />
//               </Nav.Link>
//             )} */}

//             {signedIn ? (
//               <Button variant="outline-light" onClick={handleSignOut}>
//                 Sign Out
//               </Button>
//             ) : (
//               <Button as={Link} to="/login" variant="primary">
//                 Sign In
//               </Button>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavBar;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HomeIcon, BriefcaseBusinessIcon, Heart, Signpost } from "lucide-react";
import { toast } from "react-toastify";

const NavBar = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [loginUser, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setSignedIn(!!userData);
      setUser(userData);
    }
  }, []);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1000)); // Fake delay
      localStorage.clear();
      setUser({});
      setSignedIn(false);
      toast.info("Signed out successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Error during sign out");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Fullscreen Loader */}
      {loading && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <nav className="w-full bg-gray-900 text-white shadow-md px-4 py-3 fixed top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/bg.png" alt="Logo" className="w-10 h-10" />
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-6 text-sm sm:text-base">
            <Link to="/" className=" text-white ">
              <HomeIcon className="w-5 h-5 inline-block mr-1" />
              Home
            </Link>

            <Link to="/myjob" className="text-white ">
              <BriefcaseBusinessIcon className="w-5 h-5 inline-block mr-1" />
              My Jobs
            </Link>

            <Link to="/savedjobs" className="text-white ">
              <Heart className="w-5 h-5 inline-block mr-1" />
              Saved
            </Link>

            {/* Uncomment if you want recruiter check */}
            {/* {loginUser?.role === "recruiter" && (
              <Link to="/postjob" className="hover:text-blue-400 transition">
                <Signpost className="w-5 h-5 inline-block mr-1" />
                Post Job
              </Link>
            )} */}

            {signedIn ? (
              <button
                onClick={handleSignOut}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-white transition"
              >
                Sign Out
              </button>
            ) : (
              <Link to="/login">
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-white transition">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
