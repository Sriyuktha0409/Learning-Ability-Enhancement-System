import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Quiz.css";

const generateUniqueQuestions = () => {
    const types = ["Exponents", "Percentages", "Geometry", "Volume", "Speed-Distance"];
    const questionsSet = new Set();

    while (questionsSet.size < 25) {
        const type = types[Math.floor(Math.random() * types.length)];
        let num1, num2, question, answer;

        switch (type) {
            case "Exponents":
                num1 = Math.floor(Math.random() * 5) + 2;
                num2 = Math.floor(Math.random() * 3) + 2;
                question = `Evaluate: ${num1}^${num2} = ?`;
                answer = Math.pow(num1, num2);
                break;

            case "Percentages":
                num1 = Math.floor(Math.random() * 500) + 100;
                num2 = Math.floor(Math.random() * 50) + 1;
                question = `What is ${num2}% of ${num1}?`;
                answer = (num1 * num2) / 100;
                break;

            case "Geometry":
                const geometryType = Math.floor(Math.random() * 3);
                let side, length, width, radius;
                        
                // eslint-disable-next-line default-case
                switch(geometryType) {
                    case 0: // Area of square
                        side = Math.floor(Math.random() * 10) + 1;
                        question = `Find the area of a square with side length ${side} cm.`;
                        answer = side * side;
                        break;
                        
                    case 1: // Area of rectangle
                        length = Math.floor(Math.random() * 10) + 1;
                        width = Math.floor(Math.random() * 10) + 1;
                        question = `Find the area of a rectangle with length ${length} cm and width ${width} cm.`;
                        answer = length * width;
                        break;
                        
                    case 2: // Circumference of circle
                        radius = Math.floor(Math.random() * 10) + 1;
                        question = `Find the circumference of a circle with radius ${radius} cm. (Use π = 3.14)`;
                        answer = Math.round(2 * 3.14 * radius * 100) / 100;
                        break;
                }
                break;

            case "Volume":
                num1 = Math.floor(Math.random() * 10) + 1;
                question = `Find the volume of a cube with side ${num1}`;
                answer = Math.pow(num1, 3);
                break;

            case "Speed-Distance":
                num1 = Math.floor(Math.random() * 80) + 20;
                num2 = Math.floor(Math.random() * 10) + 1;
                question = `A car moves at ${num1} km/h. How far in ${num2} hours?`;
                answer = num1 * num2;
                break;

            default:
                continue;
        }

        questionsSet.add(JSON.stringify({ question, answer }));
    }

    return Array.from(questionsSet).map(q => JSON.parse(q));
};

const Quiz = () => {
    const navigate = useNavigate();
    const [questions] = useState(generateUniqueQuestions());
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(2400);
    const [celebrate, setCelebrate] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmit();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleChange = (e) => {
        setUserAnswers({ ...userAnswers, [currentIndex]: e.target.value });
    };

    const handleNext = () => {
        if (checkAnswer(userAnswers[currentIndex], questions[currentIndex].answer)) {
            setCelebrate(true);
            setTimeout(() => setCelebrate(false), 1500);
        }
        if (currentIndex < 24) setCurrentIndex(currentIndex + 1);
    };

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    const checkAnswer = (userInput, correctAnswer) => {
        if (typeof correctAnswer === 'number') {
            return parseFloat(userInput) === correctAnswer;
        }
        return userInput?.toString().trim().toLowerCase() === correctAnswer?.toString().trim().toLowerCase();
    };

    const calculateScore = () => {
        return Object.keys(userAnswers).reduce((acc, key) => {
            return acc + (checkAnswer(userAnswers[key], questions[key].answer) ? 1 : 0);
        }, 0);
    };

    const saveResults = async (score) => {
        console.log('Starting to save results...');
        setIsSaving(true);
        
        try {
          const userData = JSON.parse(sessionStorage.getItem('userData'));
          if (!userData?.email) {
            throw new Error("User not logged in - cannot save results");
          }
      
          const testData = {
            email: userData.email,
            testType: `math-grade${userData.grade || 1}`,
            score: score,
            details: {
              totalQuestions: 25,
              correctAnswers: score,
              percentage: Math.round((score / 25) * 100),
              timeTaken: 2400 - timeLeft,
              date: new Date().toISOString()
            }
          };
      
          console.log('Sending test data to server:', JSON.stringify(testData, null, 2));
      
          const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/save-test-result`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData),
          });
      
          const data = await response.json();
      
          if (!response.ok) {
            console.error('Server responded with error:', data);
            throw new Error(data.message || "Failed to save results");
          }
      
          console.log('Results saved successfully:', data);
          return data;
        } catch (error) {
          console.error("Error saving results:", error);
          throw error;
        } finally {
          setIsSaving(false);
        }
    };

    const handleSubmit = async () => {
        const calculatedScore = calculateScore();
        setScore(calculatedScore);
        setSubmitted(true);
        await saveResults(calculatedScore);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="quiz-container">
            <h1>7th Grade Maths Quiz</h1>

            {!submitted && <div className="timer">Time Left: {formatTime(timeLeft)}</div>}

            {!submitted ? (
                <div>
                    <motion.div
                        className="question-card"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="question">{questions[currentIndex].question}</p>
                        <input
                            type="text"
                            className="answer-box"
                            onChange={handleChange}
                            value={userAnswers[currentIndex] || ""}
                        />
                    </motion.div>

                    <div className="nav-buttons">
                        <motion.button onClick={handlePrev} disabled={currentIndex === 0} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            Previous
                        </motion.button>
                        <motion.button onClick={handleNext} disabled={currentIndex === 24} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            Next
                        </motion.button>
                    </div>

                    {currentIndex === 24 && (
                        <motion.button 
                            className="submit-button" 
                            onClick={handleSubmit} 
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.9 }}
                            disabled={isSaving}
                        >
                            {isSaving ? "Saving Results..." : "Submit Quiz"}
                        </motion.button>
                    )}
                </div>
            ) : (
                <div>
                    <h2>Your Score: {score} / 25</h2>
                    
                    {Math.round((score / 25) * 100) >= 70 ? (
                        <>
                            <h2 className="excellent-score">Excellent! 🎉</h2>
                            <motion.button 
                                className="submit-button" 
                                onClick={() => navigate("/categories")} 
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.9 }}
                            >
                                Back to Categories
                            </motion.button>
                        </>
                    ) : (
                        <>
                            <h2 className="poor-score">Poor Performance</h2>
                            <p style={{ color: "brown" }}>Take exercises for better performance</p>
                            
                            <motion.div className="question-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                                <p className="question">{questions[currentIndex].question}</p>
                                <p className={checkAnswer(userAnswers[currentIndex], questions[currentIndex].answer) ? "correct-answer" : "wrong-answer"}>
                                    Your Answer: {userAnswers[currentIndex] || "Not answered"}
                                </p>
                                {!checkAnswer(userAnswers[currentIndex], questions[currentIndex].answer) && (
                                    <p className="correct-answer">Correct Answer: {questions[currentIndex].answer}</p>
                                )}
                            </motion.div>

                            <div className="nav-buttons">
                                <motion.button onClick={handlePrev} disabled={currentIndex === 0} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    Previous
                                </motion.button>
                                <motion.button onClick={handleNext} disabled={currentIndex === 24} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    Next
                                </motion.button>
                            </div>
                            
                            <motion.button className="exercise-button" onClick={() => navigate("/MathTheory7")} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                Go to Math Theory
                            </motion.button>

                            <motion.button onClick={() => window.location.reload()} className="submit-button" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                Retake Quiz
                            </motion.button>
                        </>
                    )}
                </div>
            )}

            {celebrate && (
                <motion.div className="celebration-popup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                    <h2>🎉 Correct! 🎉</h2>
                </motion.div>
            )}
        </div>
    );
};

export default Quiz;