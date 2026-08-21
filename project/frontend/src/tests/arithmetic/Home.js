import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Styling for attractive UI

const Home = () => {
    return (
        <div className="home-container">
            <h1>Choose an Exercise</h1>
            <div className="exercise-grid">
                <Link to="/exercises/addition" className="exercise-card">Addition</Link>
                <Link to="/exercises/subtraction" className="exercise-card">Subtraction</Link>
                <Link to="/exercises/moreless" className="exercise-card">Greater/Less</Link>
                <Link to="/exercises/shapes" className="exercise-card">Shapes</Link>
            </div>
        </div>
    );
};

export default Home;
