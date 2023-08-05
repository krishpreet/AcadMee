import React from "react";
import img1 from "../../../images/AcadMe edit.png";
import "./Header.css";
import { Link } from "react-router-dom";
import UserOptions from "./UserOptions";

function Header() {
  return (
    <div className="headerContainer">
      <nav className="navbar">
        <ul className="navlist">
          <Link to="/">
            <div className="logo">
              <img src={img1} alt="logo" />
            </div>
          </Link>
        </ul>
        <div className="useroptions">
          <span>
            <UserOptions />
          </span>
        </div>
      </nav>
    </div>
  );
}

export default Header;
