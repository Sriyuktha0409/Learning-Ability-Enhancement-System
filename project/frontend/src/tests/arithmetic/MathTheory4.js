import React from "react";
import { useNavigate } from "react-router-dom";
import "./MathTheory.css"; // Importing the CSS for styling

const MathTheory4 = () => {
    const navigate = useNavigate(); // React Router hook for navigation

    return (
        <div className="math-theory-container">
            <h1>Mathematics Concepts (Grade 4)</h1>

            <section>
                <h2>Multiplication</h2>
                <p>
                    Multiplication in Grade 4 involves larger numbers. We also begin to explore the concept of multiplying larger multi-digit numbers.
                </p>
                <div className="visual">123 × 45 = 5535</div>
                <ul>
                    <li><strong>Example 1:</strong> 12 × 45 = 540</li>
                    <li><strong>Example 2:</strong> 25 × 36 = 900</li>
                </ul>
            </section>

            <section>
                <h2>Division</h2>
                <p>
                    Division in Grade 4 includes long division. We divide larger numbers and work with remainders.
                </p>
                <div className="visual">576 ÷ 24 = 24</div>
                <ul>
                    <li><strong>Example 1:</strong> 672 ÷ 24 = 28</li>
                    <li><strong>Example 2:</strong> 850 ÷ 50 = 17</li>
                </ul>
            </section>

            <section>
                <h2>Fractions</h2>
                <p>
                    Fractions are an essential concept in Grade 4. You’ll learn to add, subtract, and compare fractions, and also simplify them.
                </p>
                <div className="visual">3/4 + 1/4 = 4/4 (1 whole)</div>
                <ul>
                    <li><strong>Example 1:</strong> 1/2 + 1/4 = 3/4</li>
                    <li><strong>Example 2:</strong> 5/8 - 1/8 = 4/8 (simplified to 1/2)</li>
                </ul>
            </section>

            <section>
                <h2>Decimals</h2>
                <p>
                    Decimals are a part of the Grade 4 curriculum, where you begin performing operations like addition, subtraction, and comparison with decimal numbers.
                </p>
                <div className="visual">2.5 + 3.6 = 6.1</div>
                <ul>
                    <li><strong>Example 1:</strong> 3.2 + 4.5 = 7.7</li>
                    <li><strong>Example 2:</strong> 6.8 - 2.3 = 4.5</li>
                </ul>
            </section>

            <section>
                <h2>Geometry</h2>
                <p>
                    In Grade 4 geometry, you will study 2D and 3D shapes, symmetry, angles, and lines.
                </p>
                <div className="visual">What type of angle is 90°? - <strong>Right Angle</strong></div>
                <ul>
                    <li><strong>Example 1:</strong> Identify shapes: squares, rectangles, triangles</li>
                    <li><strong>Example 2:</strong> Symmetry: a shape that can be folded into two identical halves</li>
                </ul>
            </section>

            <section>
                <h2>Measurement</h2>
                <p>
                    Measurement in Grade 4 includes working with units for length, weight, and capacity.
                </p>
                <div className="visual">Convert 5 meters to centimeters = 500 cm</div>
                <ul>
                    <li><strong>Example 1:</strong> Convert 3 kilograms to grams = 3000 grams</li>
                    <li><strong>Example 2:</strong> Convert 7 liters to milliliters = 7000 mL</li>
                </ul>
            </section>

            {/* Button to Go to Exercises Instead of the Quiz */}
            <div className="exercise-button-container">
                <button className="exercise-button" onClick={() => navigate("/exercise/4")}>
                    Go to Exercises
                </button>
            </div>
        </div>
    );
};

export default MathTheory4;
