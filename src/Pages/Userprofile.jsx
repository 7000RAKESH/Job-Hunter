import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="w-full xl:w-full sm:w-full bg-white text-black rounded-xl shadow-lg p-4">
      <h5 className="text-lg sm:text-xl font-semibold mb-2">
        Welcome, {user.username?.toUpperCase()} 👋
      </h5>
      <p className="text-sm sm:text-base text-gray-700 ">Role: {user.role}</p>
      <p className="text-sm sm:text-base text-gray-700 ">
        Email: <small>{user.email}</small>
      </p>

      <Button
        variant="danger"
        onClick={handleLogout}
        className="mt-1 w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition"
      >
        Logout
      </Button>
    </div>
  );
};

export default UserProfile;
