import React from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.css';
const Navbar = () => {
    const navigate=useNavigate();
  return (
    <>
      <nav>
        <h3>Form</h3>
        <ul>
          <li>
            <a onClick={() => navigate("/")}>User</a>
          </li>
          <li>
            <a onClick={() => navigate("view")}>View</a>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default Navbar;
