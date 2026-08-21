import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Quiz.css";

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const singularPluralPairs = [
    { singular: "cat", plural: "cats" }, { singular: "dog", plural: "dogs" },
    { singular: "bus", plural: "buses" }, { singular: "child", plural: "children" },
    { singular: "mouse", plural: "mice" }, { singular: "woman", plural: "women" },
    { singular: "man", plural: "men" }, { singular: "tooth", plural: "teeth" },
    { singular: "foot", plural: "feet" }, { singular: "person", plural: "people" }
];

const generateQuestions = () => {
    let questions = [];
    let answers = [];

    for (let i = 0; i < 25; i++) {
        const pair = singularPluralPairs[getRandomNumber(0, singularPluralPairs.length - 1)];
        let question = `What is the plural of '${pair.singular}'?`;
        let correctAnswer = pair.plural;

        questions.push(question);
        answers.push(correctAnswer);
    }
    return { questions, answers };
};

const Quiz2 = () => {
    const navigate = useNavigate();
    const [quizData] = useState(() => generateQuestions());
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState(Array(25).fill(""));
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(40 * 60);
    const [isSaving, setIsSaving] = useState(false);
    const [celebrate, setCelebrate] = useState(false);

    useEffect(() => {
        if (timeLeft > 0 && !quizSubmitted) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (!quizSubmitted) {
            handleSubmitQuiz();
        }
    }, [timeLeft, quizSubmitted]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const checkAnswer = (userInput, correctAnswer) => {
        return userInput?.toString().trim().toLowerCase() === correctAnswer?.toString().trim().toLowerCase();
    };

    const handleNextQuestion = () => {
        if (checkAnswer(userAnswers[currentQuestionIndex], quizData.answers[currentQuestionIndex])) {
            setCelebrate(true);
            setTimeout(() => setCelebrate(false), 1500);
        }
        if (currentQuestionIndex < 24) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
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
            testType: `grammar-grade${userData.grade || 1}`,
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

    const handleSubmitQuiz = async () => {
        let totalScore = 0;
        userAnswers.forEach((answer, index) => {
            if (checkAnswer(answer, quizData.answers[index])) {
                totalScore++;
            }
        });
        setScore(totalScore);
        setQuizSubmitted(true);
        await saveResults(totalScore);
    };

    return (
        <div className="quiz-container">
            <div className="timer">⏳ Time Left: {formatTime(timeLeft)}</div>
            <h1>📝 2nd Grade Language Quiz 📝</h1>

            {!quizSubmitted ? (
                <>
                    <h2>Question {currentQuestionIndex + 1} / 25</h2>
                    <motion.div
                        className="question-card"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="question-box">{quizData.questions[currentQuestionIndex]}</p>
                        <textarea
                            className="answer-input"
                            value={userAnswers[currentQuestionIndex]}
                            onChange={(e) => {
                                const newAnswers = [...userAnswers];
                                newAnswers[currentQuestionIndex] = e.target.value;
                                setUserAnswers(newAnswers);
                            }}
                            placeholder="Write your answer here..."
                        />
                    </motion.div>

                    <div className="button-group">
                        <motion.button
                            onClick={handlePrevQuestion}
                            disabled={currentQuestionIndex === 0}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Previous
                        </motion.button>
                        
                        {currentQuestionIndex < 24 ? (
                            <motion.button
                                className="next-btn"
                                onClick={handleNextQuestion}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Next
                            </motion.button>
                        ) : (
                            <motion.button
                                className="submit-btn"
                                onClick={handleSubmitQuiz}
                                disabled={isSaving}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {isSaving ? "Submitting..." : "Submit Quiz"}
                            </motion.button>
                        )}
                    </div>
                </>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2>Quiz Completed! 🎉</h2>
                    <h3>Your Score: {score} / 25</h3>
                    {score < 18 ? (
                        <p className="exercise-warning">⚠️ For Better Performance, Take Exercises! 🏋️</p>
                    ) : (
                        <p className="congrats-message">🎉 Congratulations! You Passed! 🎉</p>
                    )}

                    <div className="question-review">
                        <h3>Question Review:</h3>
                        <p><strong>Question:</strong> {quizData.questions[currentQuestionIndex]}</p>
                        <p className={checkAnswer(userAnswers[currentQuestionIndex], quizData.answers[currentQuestionIndex]) ? "correct-answer" : "wrong-answer"}>
                            Your Answer: {userAnswers[currentQuestionIndex] || "No Answer"}
                        </p>
                        {!checkAnswer(userAnswers[currentQuestionIndex], quizData.answers[currentQuestionIndex]) && (
                            <p className="correct-answer">Correct Answer: {quizData.answers[currentQuestionIndex]}</p>
                        )}
                    </div>

                    <div className="nav-buttons">
                        <motion.button
                            onClick={handlePrevQuestion}
                            disabled={currentQuestionIndex === 0}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Previous
                        </motion.button>
                        <motion.button
                            onClick={() => {
                                if (currentQuestionIndex < 24) setCurrentQuestionIndex(prev => prev + 1);
                            }}
                            disabled={currentQuestionIndex === 24}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Next
                        </motion.button>
                    </div>

                    <motion.button
                        className="exercise-btn"
                        onClick={() => navigate("/learning-module2")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Take Exercises
                    </motion.button>

                    <motion.button
                        onClick={() => window.location.reload()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Retake Quiz
                    </motion.button>
                </motion.div>
            )}

            {celebrate && (
                <motion.div
                    className="celebration-popup"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    🎉 Correct! 🎉
                </motion.div>
            )}
        </div>
    );
};

export default Quiz2;