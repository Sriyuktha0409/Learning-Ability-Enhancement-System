import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Quiz.css";

const generateUniqueQuestions = () => {
    const types = ["addition", "subtraction", "moreLess", "shapes"];
    const questionsSet = new Set();

    while (questionsSet.size < 25) {
        const type = types[Math.floor(Math.random() * types.length)];
        let num1, num2, question, answer, options, shapeType;

        switch (type) {
            case "addition":
                num1 = Math.floor(Math.random() * 11) + 1;
                num2 = Math.floor(Math.random() * 11) + 1;
                question = `What is ${num1} + ${num2}?`;
                answer = num1 + num2;
                break;

            case "subtraction":
                num1 = Math.floor(Math.random() * 11) + 10;
                num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
                question = `What is ${num1} - ${num2}?`;
                answer = num1 - num2;
                break;

            case "moreLess":
                num1 = Math.floor(Math.random() * 20) + 1;
                num2 = Math.floor(Math.random() * 20) + 1;
                question = `Is ${num1} ______ ${num2}?`;
                answer =  num1 > num2 ? ">" : num1 < num2 ? "<" : "=";
                options = [">", "<","="];
                break;

            case "shapes":
                const shapeNames = ["Circle", "Square", "Triangle", "Rectangle"];
                shapeType = shapeNames[Math.floor(Math.random() * shapeNames.length)];
                question = "What shape is shown below?";
                answer = shapeType;
                options = shapeNames;
                break;
    
            default:
                continue;
        }

        const questionObj = { question, answer, options, shapeType };
        questionsSet.add(JSON.stringify(questionObj));
    }

    return Array.from(questionsSet).map(q => JSON.parse(q));
};

const ShapeSVG = ({ type }) => {
    if (type === "Circle") return <svg width="100" height="100"><circle cx="50" cy="50" r="40" stroke="black" strokeWidth="2" fill="blue" /></svg>;
    if (type === "Square") return <svg width="100" height="100"><rect x="20" y="20" width="60" height="60" stroke="black" strokeWidth="2" fill="green" /></svg>;
    if (type === "Triangle") return <svg width="100" height="100"><polygon points="50,10 90,90 10,90" stroke="black" strokeWidth="2" fill="red" /></svg>;
    if (type === "Rectangle") return <svg width="120" height="80"><rect x="10" y="20" width="100" height="40" stroke="black" strokeWidth="2" fill="purple" /></svg>;
    return null;
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
            testType: `arithmetic-grade${userData.grade || 1}`,
            score: score,
            details: {
              totalQuestions: 25,
              correctAnswers: score,
              percentage: Math.round((score / 25) * 100),
              timeTaken: 2400 - timeLeft, // Using quiz timer
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
            <h1>1st Grade Maths Quiz</h1>

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
                        {questions[currentIndex].shapeType && (
                            <ShapeSVG type={questions[currentIndex].shapeType} />
                        )}
                        {questions[currentIndex].options ? (
                            <div>
                                {questions[currentIndex].options.map((opt, idx) => (
                                    <label
                                        key={idx}
                                        className={`radio-option ${userAnswers[currentIndex] === opt ? "selected" : ""}`}
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${currentIndex}`}
                                            value={opt}
                                            checked={userAnswers[currentIndex] === opt}
                                            onChange={handleChange}
                                        />
                                        {opt}
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <input
                                type="text"
                                className="answer-box"
                                onChange={handleChange}
                                value={userAnswers[currentIndex] || ""}
                            />
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
                            <p color="brown">Take exercises for better performance</p>
                            
                            <motion.div className="question-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                                <p className="question">{questions[currentIndex].question}</p>
                                {questions[currentIndex].shapeType && (
                                    <ShapeSVG type={questions[currentIndex].shapeType} />
                                )}
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
                            
                            <motion.button className="exercise-button" onClick={() => navigate("/theory1")} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
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