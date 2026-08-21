import React from "react";
import { useNavigate } from "react-router-dom";
import "./MathTheory.css";

const MathTheory7 = () => {
    const navigate = useNavigate();

    return (
        <div className="math-theory-container">
            <h1>📚 Advanced Math Concepts</h1>

            {/* Exponents Section */}
            <section className="topic-section">
                <h2>🔢 Exponents</h2>
                <p>
                    Exponents represent repeated multiplication of a number by itself. The exponent (power) is written as a superscript.
                </p>
                <div className="visual">
                    <strong>Formula:</strong> aⁿ = a × a × a ... (n times)
                </div>
                <ul>
                    <li>⚡ <strong>Example 1:</strong> 2³ = 2 × 2 × 2 = 8</li>
                    <li>🔢 <strong>Example 2:</strong> 5² = 5 × 5 = 25</li>
                </ul>
                <div className="real-world-example">
                    🚀 <strong>Real-world Example:</strong> Compound interest in banking uses exponents for growth calculations.
                </div>
            </section>

            {/* Percentages Section */}
            <section className="topic-section">
                <h2>💯 Percentages</h2>
                <p>
                    A percentage represents a fraction of 100. It is useful in comparing values and calculating discounts, interest, and more.
                </p>
                <div className="visual">
                    <strong>Formula:</strong> (Part / Whole) × 100 = Percentage
                </div>
                <ul>
                    <li>✅ <strong>Example 1:</strong> 20 out of 50 = (20/50) × 100 = 40%</li>
                    <li>🛍️ <strong>Example 2:</strong> A 25% discount on a $200 product saves $50.</li>
                </ul>
                <div className="real-world-example">
                    💰 <strong>Real-world Example:</strong> Sales tax and discounts in shopping are calculated using percentages.
                </div>
            </section>

            {/* Geometry Section */}
            <section className="topic-section">
                <h2>📐 Geometry</h2>
                <p>
                    Geometry deals with the properties and relationships of points, lines, angles, surfaces, and solids.
                </p>
                <div className="visual">
                    <strong>Important Formulas:</strong>
                    <ul>
                        <li>📏 Area of a rectangle = length × width</li>
                        <li>📏 Area of a triangle = (1/2) × base × height</li>
                        <li>🌀 Circumference of a circle = 2πr</li>
                    </ul>
                </div>
                <ul>
                    <li>📐 <strong>Example 1:</strong> Area of a square with side 5cm = 5 × 5 = 25cm²</li>
                    <li>🟠 <strong>Example 2:</strong> A circle with radius 7cm has circumference = 2 × 3.14 × 7 ≈ 44cm</li>
                </ul>
                <div className="real-world-example">
                    🏠 <strong>Real-world Example:</strong> Architecture and construction rely on geometry for designing structures.
                </div>
            </section>

            {/* Volume Section */}
            <section className="topic-section">
                <h2>📦 Volume</h2>
                <p>
                    Volume measures the amount of space occupied by a three-dimensional object.
                </p>
                <div className="visual">
                    <strong>Common Formulas:</strong>
                    <ul>
                        <li>📦 Volume of a cube = side³</li>
                        <li>📦 Volume of a rectangular prism = length × width × height</li>
                        <li>🛢️ Volume of a cylinder = πr²h</li>
                    </ul>
                </div>
                <ul>
                    <li>📦 <strong>Example 1:</strong> Volume of a box (5m × 3m × 2m) = 30m³</li>
                    <li>🛢️ <strong>Example 2:</strong> A cylinder with radius 4cm and height 10cm has volume = 3.14 × 4² × 10 ≈ 502cm³</li>
                </ul>
                <div className="real-world-example">
                    🚰 <strong>Real-world Example:</strong> Measuring water in tanks uses volume calculations.
                </div>
            </section>

            {/* Speed & Distance Section */}
            <section className="topic-section">
                <h2>🚗 Speed & Distance</h2>
                <p>
                    Speed measures how fast an object moves, while distance is how far it travels.
                </p>
                <div className="visual">
                    <strong>Formula:</strong> Speed = Distance / Time
                </div>
                <ul>
                    <li>🚗 <strong>Example 1:</strong> A car travels 100 km in 2 hours. Speed = 100/2 = 50 km/h</li>
                    <li>🚲 <strong>Example 2:</strong> A cyclist covers 30 km in 1.5 hours. Speed = 30/1.5 = 20 km/h</li>
                </ul>
                <div className="real-world-example">
                    ✈️ <strong>Real-world Example:</strong> Airline flight speeds help estimate travel time.
                </div>
            </section>

            {/* Take Exercise Button */}
            <div className="exercise-button-container">
                <button className="exercise-button" onClick={() => navigate("/exercise-test7")}>🚀 Take Exercise</button>
            </div>
        </div>
    );
};

export default MathTheory7;