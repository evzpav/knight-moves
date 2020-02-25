import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/knight.svg";

function Home() {
  return (
    <div className="home">
      <header className="home-header">
        <img src={logo} className="home-logo" alt="logo" />
        <h1>Knight Moves</h1>

        <Link to="/wizard">
          <button type="button" className="start-button">
            {" "}
            Start
          </button>
        </Link>
      </header>
    </div>
  );
}

export default Home;
