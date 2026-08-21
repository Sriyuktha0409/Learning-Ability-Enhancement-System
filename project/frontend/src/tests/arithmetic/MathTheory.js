import React from "react";
import { useNavigate } from "react-router-dom";  
import "./MathTheory.css";

const MathTheory = () => {
    const navigate = useNavigate();  // React Router hook for navigation

    return (
        <div className="math-theory-container">
            <h1>Mathematics Concepts</h1>

            <section>
                <h2>Multiplication</h2>
                <p>
                    Multiplication is a fundamental arithmetic operation used to calculate the total of equal groups. 
                    It is often described as repeated addition. For example, 3 × 4 means adding 3 four times (3 + 3 + 3 + 3) 
                    which equals 12.
                </p>
                <div className="visual">🍎🍎🍎 × 4 = 🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎</div>
                <ul>
                    <li><strong>Example 1:</strong> 5 × 7 = 35</li>
                    <li><strong>Example 2:</strong> 12 × 9 = 108</li>
                </ul>
            </section>

            <section>
                <h2>Division</h2>
                <p>
                    Division is the process of splitting a number into equal parts. It is the inverse operation of multiplication. 
                </p>
                <div className="visual">🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪 ÷ 3 = 🍪🍪🍪🍪  🍪🍪🍪🍪  🍪🍪🍪🍪</div>
                <ul>
                    <li><strong>Example 1:</strong> 24 ÷ 6 = 4</li>
                    <li><strong>Example 2:</strong> 100 ÷ 5 = 20</li>
                </ul>
            </section>

            <section>
                <h2>Fractions</h2>
                <p>
                    A fraction represents a part of a whole. It consists of a numerator (top number) and a denominator (bottom number). 
                </p>
                <div className="visual">🍕🍕🍕🍕 ÷ 2 = 🍕🍕 / 🍕🍕</div>
                <ul>
                    <li><strong>Example 1:</strong> 1/4 + 1/4 = 2/4 = 1/2</li>
                    <li><strong>Example 2:</strong> 3/5 × 2/3 = 6/15 = 2/5</li>
                </ul>
            </section>

            <section>
                <h2>Decimals</h2>
                <p>
                    Decimals are a way of representing fractions in a base-10 system. 
                </p>
                <div className="visual">💰 0.50 = 50% of a dollar</div>
                <ul>
                    <li><strong>Example 1:</strong> 0.75 = 75/100 = 3/4</li>
                    <li><strong>Example 2:</strong> 2.5 × 4 = 10</li>
                </ul>
            </section>

            <section>
                <h2>Geometry</h2>
                <p>
                    Geometry is the branch of mathematics concerned with shapes, sizes, and properties of space. Here are perimeter formulas for different shapes:
                </p>
                <div className="visual">📏🔺📐 Example: Perimeter of a rectangle = 2 × (length + width)</div>
                <ul>
                    <li><strong>Perimeter of a Square:</strong> 4 × side</li>
                    <li><strong>Perimeter of a Rectangle:</strong> 2 × (length + width)</li>
                    <li><strong>Perimeter of a Triangle:</strong> sum of all three sides</li>
                    <li><strong>Perimeter of a Circle (Circumference):</strong> 2 × π × radius</li>
                    <li><strong>Perimeter of a Regular Polygon:</strong> number of sides × length of one side</li>
                </ul>
            </section>

            <section>
                <h2>Factors</h2>
                <p>
                    Factors are numbers that divide another number exactly without leaving a remainder. 
                </p>
                <div className="visual">🔢 Factors of 12: 1, 2, 3, 4, 6, 12</div>
                <ul>
                    <li><strong>Example 1:</strong> Factors of 18: 1, 2, 3, 6, 9, 18</li>
                    <li><strong>Example 2:</strong> Factors of 25: 1, 5, 25</li>
                </ul>
            </section>

            {/* Take Exercise Button */}
            <div className="exercise-button-container">
                <button className="exercise-button" onClick={() => navigate("/exercise-test")}>
                    Take Exercise
                </button>
            </div>
        </div>
    );
};

export default MathTheory;
