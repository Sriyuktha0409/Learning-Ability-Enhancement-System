import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./MathTheory.css"; // Importing the CSS for styling

const MathTheory = () => {
    const navigate = useNavigate(); // React Router hook for navigation

    return (
        <div className="math-theory-container">
            <h1>Mathematics Concepts (Grade 3)</h1>

            <section>
                <h2>Addition</h2>
                <p>
                    Addition is the process of calculating the total of two or more numbers or amounts. 
                    You add numbers to find out how many in total.
                </p>
                <div className="visual">🍎 + 🍎 = 🍎🍎</div>
                <ul>
                    <li><strong>Example 1:</strong> 15 + 10 = 25</li>
                    <li><strong>Example 2:</strong> 500 + 200 = 700</li>
                </ul>
            </section>

            <section>
                <h2>Subtraction</h2>
                <p>
                    Subtraction is taking away a number from another number. It helps us find how much is left.
                </p>
                <div className="visual">🍎🍎🍎 - 🍎 = 🍎🍎</div>
                <ul>
                    <li><strong>Example 1:</strong> 25 - 10 = 15</li>
                    <li><strong>Example 2:</strong> 700 - 200 = 500</li>
                </ul>
            </section>

            <section>
                <h2>Multiplication</h2>
                <p>
                    Multiplication is a quick way of adding the same number multiple times. 
                    It is repeated addition.
                </p>
                <div className="visual">🍎🍎🍎 × 4 = 🍎🍎🍎🍎🍎🍎🍎🍎</div>
                <ul>
                    <li><strong>Example 1:</strong> 3 × 4 = 12</li>
                    <li><strong>Example 2:</strong> 7 × 6 = 42</li>
                </ul>
            </section>

            <section>
                <h2>Division</h2>
                <p>
                    Division is the process of splitting a number into equal parts. It is the opposite of multiplication.
                </p>
                <div className="visual">🍎🍎🍎🍎🍎 ÷ 5 = 🍎🍎 🍎🍎 🍎🍎</div>
                <ul>
                    <li><strong>Example 1:</strong> 20 ÷ 4 = 5</li>
                    <li><strong>Example 2:</strong> 30 ÷ 6 = 5</li>
                </ul>
            </section>

            <section>
                <h2>Even and Odd Numbers</h2>
                <p>
                    An even number is divisible by 2 with no remainder, and an odd number leaves a remainder of 1 when divided by 2.
                </p>
                <div className="visual">🔢 Even numbers: 2, 4, 6, 8, 10</div>
                <ul>
                    <li><strong>Example 1:</strong> 6 is even (6 ÷ 2 = 3)</li>
                    <li><strong>Example 2:</strong> 7 is odd (7 ÷ 2 = 3 remainder 1)</li>
                </ul>
            </section>

            <section>
                <h2>Number Patterns</h2>
                <p>
                    Number patterns are sequences of numbers that follow a specific rule. You can often find patterns by adding or subtracting a number.
                </p>
                <div className="visual">1, 2, 3, 4, 5, 6... (counting by 1)</div>
                <ul>
                    <li><strong>Example 1:</strong> 2, 4, 6, 8, 10... (counting by 2)</li>
                    <li><strong>Example 2:</strong> 5, 10, 15, 20... (counting by 5)</li>
                </ul>
            </section>

            {/* Button to Take the Quiz */}
            <div className="exercise-button-container">
                <button className="exercise-button" onClick={() => navigate("/exercise/3")}>
                    Take Exercise
                </button>
            </div>
        </div>
    );
};

export default MathTheory;
