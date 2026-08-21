import React from "react";
import { useNavigate } from "react-router-dom";
import "./MathTheory.css";

const MathTheory = () => {
    const navigate = useNavigate();

    return (
        <div className="math-theory-container">
            <h1>📚 Mathematics Concepts</h1>

            {/* Algebra Section */}
            <section className="topic-section">
                <h2>🔢 Algebra</h2>
                <p>
                    Algebra is a branch of mathematics that deals with symbols and the rules for manipulating these symbols. 
                    It helps in forming equations and solving problems systematically.
                </p>
                <div className="visual">
                    <strong>Equation:</strong> x + 3 = 7 &nbsp; → &nbsp; <strong>Find x?</strong> 🤔
                </div>
                <ul>
                    <li>✏️ <strong>Example 1:</strong> 2x + 5 = 15 &nbsp; → &nbsp; <strong>x = 5</strong></li>
                    <li>📐 <strong>Example 2:</strong> 3y - 4 = 8 &nbsp; → &nbsp; <strong>y = 4</strong></li>
                </ul>
                <div className="real-world-example">
                    🎯 <strong>Real-world Example:</strong> If you buy 3 candies for $2 each, the total cost is <em>3 × $2</em>.
                </div>
            </section>

            {/* Decimal Fractions Section */}
            <section className="topic-section">
                <h2>💰 Decimal Fractions</h2>
                <p>
                    Decimal fractions are fractions where the denominator is a power of ten (10, 100, 1000, etc.). They are 
                    commonly written using a decimal point.
                </p>
                <div className="visual">
                    <strong>Visual Representation:</strong> 🍕 A half pizza (1/2) = 0.5
                </div>
                <ul>
                    <li>✅ <strong>Example 1:</strong> 0.5 = 5/10 = 1/2</li>
                    <li>🧩 <strong>Example 2:</strong> 0.75 = 75/100 = 3/4</li>
                </ul>
                <div className="real-world-example">
                    💳 <strong>Real-world Example:</strong> If you have $1.50, it means you have 1 full dollar and half (1.5).
                </div>
            </section>

            {/* Statistics Section */}
            <section className="topic-section">
                <h2>📊 Statistics</h2>
                <p>
                    Statistics is the study of data collection, organization, analysis, and interpretation. It helps in 
                    understanding trends and making decisions.
                </p>
                <div className="visual">
                    <strong>Formula:</strong> Mean = (Sum of values) / (Total number of values)
                </div>
                <ul>
                    <li>📉 <strong>Mean:</strong> The average value in a set of numbers.</li>
                    <li>📈 <strong>Median:</strong> The middle value when numbers are arranged in order.</li>
                    <li>🔄 <strong>Mode:</strong> The number that appears most frequently.</li>
                </ul>
                <div className="real-world-example">
                    🏀 <strong>Real-world Example:</strong> If a basketball player scores 10, 15, and 20 points in 3 games, their average is (10+15+20)/3 = <strong>15</strong>.
                </div>
            </section>

            {/* Ratios Section */}
            <section className="topic-section">
                <h2>🍏🍎 Ratios</h2>
                <p>
                    A ratio compares two numbers or quantities, showing how much of one exists in relation to another. 
                    Ratios can be simplified like fractions.
                </p>
                <div className="visual">
                    <strong>Example:</strong> In a fruit basket, if there are 3 apples and 2 oranges, the ratio is **3:2**.
                </div>
                <ul>
                    <li>📊 <strong>Example 1:</strong> If there are 8 boys and 12 girls in a class, the ratio is **8:12 = 2:3**.</li>
                    <li>🥣 <strong>Example 2:</strong> A recipe uses sugar and flour in a **1:3** ratio (1 cup sugar for 3 cups flour).</li>
                </ul>
                <div className="real-world-example">
                    🚗 <strong>Real-world Example:</strong> A car's fuel efficiency is **30 miles per gallon** (30:1).
                </div>
            </section>

            {/* Take Exercise Button */}
            <div className="exercise-button-container">
                <button className="exercise-button" onClick={() => navigate("/exercise-test6")}>
                    🚀 Take Exercise
                </button>
            </div>
        </div>
    );
};

export default MathTheory;
