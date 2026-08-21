import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CategoriesPage.css";

const CategoriesPage = () => {
    const navigate = useNavigate();
    const storedGrade = sessionStorage.getItem("grade") || "1";
    const [lockedTests, setLockedTests] = useState([]);

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem("userData")) || {};
        
        if (userData.testResults) {
            const locked = [];
            userData.testResults.forEach(test => {
                if (test.details.percentage > 70) {
                    if (test.testType.includes('math')) locked.push('arithmetic');
                    if (test.testType.includes('grammar')) locked.push('grammar');
                    if (test.testType.includes('reading')) locked.push('reading');
                }
            });
            setLockedTests(locked);
        }
    }, []); // Empty dependency array since we only need to run this once on mount

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="categories-container">
            <h1 className="categories-title">Select a Test Category</h1>
            <div className="categories-grid">
                <button 
                    className={`category-card ${lockedTests.includes('arithmetic') ? 'disabled-card' : ''}`}
                    onClick={() => !lockedTests.includes('arithmetic') && handleNavigation(`/test/arithmetic/${storedGrade}`)}
                    disabled={lockedTests.includes('arithmetic')}
                >
                    <div className="category-icon">🧮</div>
                    <div className="category-name">Arithmetic Test</div>
                    {lockedTests.includes('arithmetic') ? (
                        <div className="category-grade">Test Locked</div>
                    ) : (
                        <div className="category-grade">Grade {storedGrade}</div>
                    )}
                </button>
                
                <button 
                    className={`category-card ${lockedTests.includes('grammar') ? 'disabled-card' : ''}`}
                    onClick={() => !lockedTests.includes('grammar') && handleNavigation(`/test/grammar/${storedGrade}`)}
                    disabled={lockedTests.includes('grammar')}
                >
                    <div className="category-icon">📝</div>
                    <div className="category-name">Grammar Test</div>
                    {lockedTests.includes('grammar') ? (
                        <div className="category-grade">Test Locked</div>
                    ) : (
                        <div className="category-grade">Grade {storedGrade}</div>
                    )}
                </button>
                
                <button 
                    className={`category-card ${lockedTests.includes('reading') ? 'disabled-card' : ''}`}
                    onClick={() => !lockedTests.includes('reading') && handleNavigation(`/reading/${storedGrade}`)}
                    disabled={lockedTests.includes('reading')}
                >
                    <div className="category-icon">📖</div>
                    <div className="category-name">Reading Test</div>
                    {lockedTests.includes('reading') ? (
                        <div className="category-grade">Test Locked</div>
                    ) : (
                        <div className="category-grade">Grade {storedGrade}</div>
                    )}
                </button>
                
                <button 
                    className="category-card"
                    onClick={() => handleNavigation("/memory")}
                >
                    <div className="category-icon">🧠</div>
                    <div className="category-name">Memory Game</div>
                    <div className="category-grade">All Grades</div>
                </button>
            </div>
        </div>
    );
};

export default CategoriesPage;