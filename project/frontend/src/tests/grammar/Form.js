import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";

const UserForm = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [grade, setGrade] = useState("");
    const [school, setSchool] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Save user details to the database
        const userData = { name, age, email, phone, grade, school };

        try {
            const response = await fetch("http://localhost:5000/api/saveUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                // Navigate to the correct quiz page
                navigate(`/quiz${grade}`); // Adjusted to match App.js
            } else {
                console.error("Failed to save user details");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form className="user-form" onSubmit={handleSubmit}>
            <h2>Personal Details</h2>
            <label>
                NAME:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                AGE:
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                EMAIL:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                PHONE:
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
            </label>
            <br />

            <h2>Educational Details</h2>
            <label>
                GRADE:
                <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    required
                >
                    <option value="">Select Grade</option>
                    <option value="1">1st Grade</option>
                    <option value="2">2nd Grade</option>
                    <option value="3">3rd Grade</option>
                    <option value="4">4th Grade</option>
                    <option value="5">5th Grade</option>
                    <option value="6">6th Grade</option>
                    <option value="7">7th Grade</option>
                    <option value="8">8th Grade</option>
                </select>
            </label>
            <br />
            <label>
                SCHOOL:
                <input
                    type="text"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    required
                />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default UserForm;
