import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>
        <Link to="/" className="title">
          Leetcode Rating Predictor
        </Link>
      </h1>
    </div>
  );
};

export default Navbar;
