import React from 'react';
import logo from '../knight.svg';


import { Link } from "react-router-dom";

function Home() {

    return (

        <div className="home">

            <header className="home-header">
                <img src={logo} className="home-logo" alt="logo"></img>
                <h1>Knight Moves</h1>


                <Link to="/wizard">
                    <button className="start-button">  Start</button>
                </Link>

            </header>

        </div>
    );
}

export default Home;