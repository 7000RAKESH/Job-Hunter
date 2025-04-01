import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

const DropdownToggle = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        onClick={toggleDropdown}
        aria-expanded={showDropdown}
      >
        Status
      </button>
      <ul className={`dropdown-menu ${showDropdown ? "show" : ""}`}>
        <li>
          <a className="dropdown-item" href="#">
            Applied
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Interviewing
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Rejected
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Hired
          </a>
        </li>
      </ul>
    </div>
  );
};

export default DropdownToggle;
