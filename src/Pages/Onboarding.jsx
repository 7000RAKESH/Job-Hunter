import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  BarLoader,
  BeatLoader,
  ClimbingBoxLoader,
  CircleLoader,
  RingLoader,
} from "react-spinners";
import { baseUrl, setRole } from "@/apis/Routes";

const Onboarding = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState({});

  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const localStorageRole = localStorage.getItem("role");

  useEffect(() => {
    fetch(`${baseUrl}/users`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => console.error("Error fetching recruiter data:", error));
  }, []);

  const assignRole = async (role) => {
    if (localStorageRole) {
      if (localStorageRole == "candidate") navigate("/joblist");
      else navigate("/postjob");
      // isSubmitting(false);
      return;
    }

    const single = user.find((u) => u.email == localStorageUser.email);
    console.log(single.role);

    if (single.role) {
      if (single.role == "candidate") {
        navigate("/joblist");
      } else {
        navigate("/postjob");
      }
      return;
    }

    setIsSubmitting(true);

    const response = await fetch(setRole, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: single.email,
        role,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Role assigned successfully");
      if (role == "candidate") {
        localStorage.setItem("role", role);
        navigate("/joblist");
      } else {
        localStorage.setItem("role", role);
        navigate("/postjob");
      }
    } else {
      alert(data.error || "Something went wrong!");
    }

    setIsSubmitting(false);
  };

  // if (!isLoaded) {
  //   return (
  //     <BarLoader
  //       style={{
  //         height: "5rem",
  //         width: "100%",
  //         marginTop: "10rem",
  //         position: "absolute",
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //       }}
  //     />
  //   );
  // }
  return (
    <div
      className="flex items-center justify-center pt-90"
      style={{
        background: "#3674B5",
        color: "white",
        padding: "80px 0",
        height: "100vh",
        width: "100%",
        position: "fixed",
      }}
    >
      {isSubmitting && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      )}
      <div>
        <b className="text-8xl">i am a.....</b> <br /> <br />
        <Card className="p-3  justify-between w-auto">
          <Row className="g-4 justify-content-center">
            <Col xs={12} sm={6} md={5} lg={5}>
              <Link>
                <Button
                  variant="primary"
                  className="w-100 fs-5"
                  onClick={() => assignRole("candidate")}
                  disabled={isSubmitting}
                >
                  <b> Candidate</b>
                </Button>
              </Link>
            </Col>
            <Col xs={12} sm={6} md={5} lg={5}>
              <Link>
                <Button
                  variant="dark"
                  className="w-100  fs-5"
                  onClick={() => assignRole("recruiter")}
                  disabled={isSubmitting}
                >
                  <b> Recruiter</b>
                </Button>
              </Link>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;

// import React, { useState } from "react";
// import { UserCircle2, Building2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// function App() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [selectedRole, setSelectedRole] = useState(null);
//   const navigate = useNavigate();
//   const handleRoleSelection = async (role) => {
//     try {
//       setIsSubmitting(true);
//       setSelectedRole(role);

//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       // Store role in localStorage
//       localStorage.setItem("role", role);

//       // Navigate to appropriate page (you'll need to set up routing)
//       alert(`Selected role: ${role}`);
//       if (role == "candidate") {
//         navigate("/joblist");
//       } else {
//         navigate("/postjob");
//       }
//     } catch (error) {
//       console.error("Error selecting role:", error);
//       alert("Failed to set role. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div
//       style={{ background: "#3674B5" }}
//       className="min-h-screen bg-gradient-to-br flex items-center justify-center p-4"
//     >
//       <div className="max-w-md w-full">
//         <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-8">
//           I am a...
//         </h1>

//         <div className="bg-white rounded-xl shadow-2xl p-6 space-y-4">
//           <button
//             onClick={() => handleRoleSelection("candidate")}
//             disabled={isSubmitting}
//             className={`w-full p-4 rounded-lg flex items-center justify-center space-x-3 text-lg font-semibold transition-all
//               ${
//                 selectedRole === "candidate"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 hover:bg-gray-200 text-gray-800"
//               } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
//           >
//             <UserCircle2 className="w-6 h-6" />
//             <span>Candidate</span>
//           </button>

//           <button
//             onClick={() => handleRoleSelection("recruiter")}
//             disabled={isSubmitting}
//             className={`w-full p-4 rounded-lg flex items-center justify-center space-x-3 text-lg font-semibold transition-all
//               ${
//                 selectedRole === "recruiter"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 hover:bg-gray-200 text-gray-800"
//               } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
//           >
//             <Building2 className="w-6 h-6" />
//             <span>Recruiter</span>
//           </button>

//           {isSubmitting && (
//             <div className="flex justify-center">
//               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
