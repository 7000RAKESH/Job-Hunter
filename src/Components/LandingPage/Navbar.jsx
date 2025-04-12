import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  BriefcaseBusinessIcon,
  Heart,
  CircleUserRound,
  Menu,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import UserProfile from "../../Pages/Userprofile";

const NavBar = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [loginUser, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setSignedIn(true);
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
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
      {loading && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <nav className="w-full bg-gray-900 text-white px-4 py-3 fixed top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/bg.png" alt="Logo" className="w-10 h-10" />
          </Link>

          {/* Hamburger Icon */}
          <button
            className="sm:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-10 h-10" />
            ) : (
              <Menu className="w-10 h-10" />
            )}
          </button>

          {/* Links - Hidden on small screens */}
          <div className="hidden sm:flex items-center gap-6 text-sm sm:text-base relative">
            <Link to="/" className="text-white">
              <HomeIcon className="w-5 h-5 inline-block mr-1" />
              Home
            </Link>
            <Link to="/myjob" className="text-white">
              <BriefcaseBusinessIcon className="w-5 h-5 inline-block mr-1" />
              My Jobs
            </Link>
            <Link to="/savedjobs" className="text-white">
              <Heart className="w-5 h-5 inline-block mr-1" />
              {(loginUser?.role || "candidate") === "candidate"
                ? "Saved"
                : "Posts"}
            </Link>

            {signedIn ? (
              <div className="relative">
                <CircleUserRound
                  className="cursor-pointer"
                  onClick={() => setShowProfile((prev) => !prev)}
                />
                {showProfile && (
                  <div
                    ref={profileRef}
                    className="absolute top-10 right-0 z-50 bg-white text-black rounded-lg shadow-lg p-4 w-56"
                  >
                    <UserProfile user={loginUser} onLogout={handleSignOut} />
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-white transition">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-4 space-y-3 text-sm">
            <Link
              to="/"
              className="block text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <HomeIcon className="w-5 h-5 inline-block mr-1" />
              Home
            </Link>
            <Link
              to="/myjob"
              className="block text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <BriefcaseBusinessIcon className="w-5 h-5 inline-block mr-1" />
              My Jobs
            </Link>
            <Link
              to="/savedjobs"
              className="block text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Heart className="w-5 h-5 inline-block mr-1" />
              {(loginUser?.role || "candidate") === "candidate"
                ? "Saved"
                : "Posts"}
            </Link>

            {signedIn ? (
              <div className="block">
                <UserProfile user={loginUser} onLogout={handleSignOut} />
              </div>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-white transition w-full mt-2">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
