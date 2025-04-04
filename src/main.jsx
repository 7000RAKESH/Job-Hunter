// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// // import './index.css'
// import App from "./App.jsx";
// import "bootstrap/dist/css/bootstrap.css";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { ClerkProvider } from "@clerk/clerk-react";
import "bootstrap/dist/css/bootstrap.css";
import { dark, neobrutalism, shadesOfPurple } from "@clerk/themes";

// Import your Publishable Key
// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key");
// }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
