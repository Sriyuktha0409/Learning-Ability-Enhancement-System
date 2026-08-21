import React from "react";
import { useNavigate } from "react-router-dom";  
import "./MathTheory.css";

const shapeNames = ["Circle", "Square", "Triangle", "Rectangle"];

const ShapeSVG = ({ type, size = 80 }) => {
    if (type === "Circle") return <svg width={size} height={size}><circle cx={size / 2} cy={size / 2} r={size / 2 - 10} stroke="black" strokeWidth="2" fill="blue" /></svg>;
    if (type === "Square") return <svg width={size} height={size}><rect x="10" y="10" width={size - 20} height={size - 20} stroke="black" strokeWidth="2" fill="green" /></svg>;
    if (type === "Triangle") return <svg width={size} height={size}><polygon points={`${size / 2},10 ${size - 10},${size - 10} 10,${size - 10}`} stroke="black" strokeWidth="2" fill="red" /></svg>;
    if (type === "Rectangle") return <svg width={size * 1.5} height={size}><rect x="10" y="10" width={size * 1.5 - 20} height={size - 20} stroke="black" strokeWidth="2" fill="purple" /></svg>;
    return null;
};

const MathTheory = () => {
    const navigate = useNavigate();  // React Router hook for navigation    

    return (
        <div className="math-theory-container">
            <h1>Mathematics Concepts</h1>

            <section>
                <h2>Addition</h2>
                <p>
                Addition is the process of calculating the total of two or more numbers.
                It is one of the basic arithmetic operations.
                When we add two numbers, we combine their values. For example:
                            <br />
                            2 + 3 = 5
                            <br />
                            We simply count from 2 by 3 steps to arrive at 5.
                </p>
                <div className="visual">🍎🍎 + 🍎🍎🍎 = 🍎🍎🍎🍎🍎</div>
                <ul>
                    <li><strong>Example 1:</strong> 5 + 7 = 12</li>
                    <li><strong>Example 2:</strong> 7 + 2 = 9 </li>
                </ul>
            </section>

            <section>
                <h2>Subtraction</h2>
                <p>Subtraction is the process of taking away one number from another.</p>
                        <p>
                            When we subtract, we remove one number from another. Example:
                            <br />
                            8 - 3 = 5
                        </p>
                <div className="visual">🍪🍪🍪🍪🍪🍪🍪🍪 - 3 = 🍪🍪🍪🍪🍪</div>
                <ul>
                    <li><strong>Example 1:</strong> 4 - 2 = 2</li>
                    <li><strong>Example 2:</strong> 15 - 5 = 10</li>
                </ul>
            </section>

            <section>
                <h2>Place Value</h2>
                <p>Place value tells us the **value of a digit** based on its **position** in a number.</p>

                
                    <h3>Example: Number 45</h3>
                    <p>- The **4** is in the **tens place**, so it means **40**.</p>
                    <p>- The **5** is in the **ones place**, so it means **5**.</p>
                    <p><strong>Total: 40 + 5 = 45</strong></p>
                

                <div className="visual"><h3 align='left'>📊 Place Value Chart</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Hundreds (H)</th>
                            <th>Tens (T)</th>
                            <th>Ones (O)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>3</th>
                            <th>2</th>
                            <th>5</th>
                        </tr>
                    </tbody>
                </table> 
                </div>

                <h3>🔢 Expanded Form</h3>
                
                    <p><strong>478</strong> = 400 + 70 + 8</p>
                
            </section>


            <section>
                <h2>Shapes</h2>
                <p>Shapes are geometric figures we see around us. Some common shapes include:</p>
                        <div className="visual">
                            {shapeNames.map((shape, index) => (
                                <div className="shape-item" key={index}>
                                    <ShapeSVG type={shape} size={100} />
                                    <p><strong>{shape}:</strong> {shape === "Circle" ? "A round shape with no corners." :
                                        shape === "Square" ? "A shape with 4 equal sides." :
                                            shape === "Triangle" ? "A shape with 3 sides." :
                                                "A shape with opposite sides equal."}</p>
                                </div>
                            ))}
                        </div>

                        <ul>
                        <li><strong>Example 1:</strong>A pizza is a circle.</li>
                        <li><strong>Example 2:</strong>A slice of bread is a square or rectangle.</li>
                        </ul>
            </section>
            

            {/* Take Exercise Button */}
            <div className="exercise-button-container">
                <button className="exercise-button" onClick={() => navigate("/exercise2")}>
                    Take Exercise
                </button>
            </div>
        </div>
    );
};

export default MathTheory;
