import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Quiz.css";

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const nouns = ["dog", "city", "teacher", "car", "apple"];
const pronouns = ["he", "she", "it", "they", "we"];
const verbs = ["run", "eat", "write", "sleep", "play"];
const adjectives = ["happy", "big", "bright", "cold", "fast"];
const adverbs = ["quickly", "softly", "angrily", "happily", "loudly"];
const sentences = ["The cat is sleeping.", "She runs fast.", "They are playing outside."];
const prepositions = ["in", "on", "under", "over", "between"];
const conjunctions = ["and", "but", "or", "so", "yet"];

const generateQuestions = () => {
    let questions = [];
    let answers = [];

    for (let i = 0; i < 25; i++) {
        let type = i % 10;
        let question = "";
        let correctAnswer = "";

        switch (type) {
            case 0:
                let nounSentence = getRandomElement(sentences);
                question = `Identify the noun in: "${nounSentence}"`;
                correctAnswer = nouns.find(n => nounSentence.includes(n)) || "dog";
                break;
            case 1:
                let pronoun = getRandomElement(pronouns);
                question = `Which word is a pronoun? ${pronoun}`;
                correctAnswer = pronoun;
                break;
            case 2:
                let verbSentence = getRandomElement(sentences);
                question = `Identify the verb in: "${verbSentence}"`;
                correctAnswer = verbs.find(v => verbSentence.includes(v)) || "runs";
                break;
            case 3:
                question = `Which tense is this sentence in? "She was running."`;
                correctAnswer = "past";
                break;
            case 4:
                let adjective = getRandomElement(adjectives);
                question = `What is the adjective in: "${adjective} dog"?`;
                correctAnswer = adjective;
                break;
            case 5:
                let adverb = getRandomElement(adverbs);
                question = `Which is an adverb? ${adverb}`;
                correctAnswer = adverb;
                break;
            case 6:
                question = `Choose the correct preposition: "The book is ___ the table."`;
                correctAnswer = "on";
                break;
            case 7:
                let conjunction = getRandomElement(conjunctions);
                question = `Which is a conjunction? ${conjunction}`;
                correctAnswer = conjunction;
                break;
            case 8:
                question = `What punctuation mark should end this sentence? "Where are you going"`;
                correctAnswer = "?";
                break;
            case 9:
                question = `Which is a phrase? "in the morning"`;
                correctAnswer = "in the morning";
                break;
            default:
                break;
        }
        questions.push(question);
        answers.push(correctAnswer);
    }
    return { questions, answers };
};

const Quiz6 = () => {
    const navigate = useNavigate();
    const [quizData] = useState(generateQuestions());
    const { questions, answers } = quizData;
    const [currentQuestion, setCurrentQuestion] = useState(0);
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
        // Special handling for sentence-based questions
        if (correctAnswer === "in the morning" || correctAnswer === "dog" || correctAnswer === "runs") {
            return userInput.trim().length > 0;
        }
        return userInput?.toString().trim().toLowerCase() === correctAnswer?.toString().trim().toLowerCase();
    };

    const handleNextQuestion = () => {
        if (checkAnswer(userAnswers[currentQuestion], answers[currentQuestion])) {
            setCelebrate(true);
            setTimeout(() => setCelebrate(false), 1500);
        }
        if (currentQuestion < 24) {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
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
            if (checkAnswer(answer, answers[index])) {
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
            <h1>📖 6th Grade Grammar Quiz 📖</h1>

            {!quizSubmitted ? (
                <>
                    <h2>Question {currentQuestion + 1} / 25</h2>
                    <motion.div
                        className="question-card"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p>{questions[currentQuestion]}</p>
                        <textarea
                            value={userAnswers[currentQuestion]}
                            onChange={(e) => {
                                const newAnswers = [...userAnswers];
                                newAnswers[currentQuestion] = e.target.value;
                                setUserAnswers(newAnswers);
                            }}
                            placeholder="Write your answer here..."
                        />
                    </motion.div>

                    <div className="button-group">
                        <motion.button
                            onClick={handlePrevQuestion}
                            disabled={currentQuestion === 0}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Previous
                        </motion.button>
                        
                        {currentQuestion < 24 ? (
                            <motion.button
                                onClick={handleNextQuestion}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Next
                            </motion.button>
                        ) : (
                            <motion.button
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
                        <p className="exercise-warning">⚠️ For Better Performance, Take Exercise! 🏋️</p>
                    ) : (
                        <p className="congrats-message">🎉 Congratulations! You Passed! 🎉</p>
                    )}

                    <div className="question-review">
                        <h3>Question Review:</h3>
                        <p><strong>Question:</strong> {questions[currentQuestion]}</p>
                        <p className={checkAnswer(userAnswers[currentQuestion], answers[currentQuestion]) ? "correct-answer" : "wrong-answer"}>
                            Your Answer: {userAnswers[currentQuestion] || "No Answer"}
                        </p>
                        {!checkAnswer(userAnswers[currentQuestion], answers[currentQuestion]) && (
                            <p className="correct-answer">Correct Answer: {answers[currentQuestion]}</p>
                        )}
                    </div>

                    <div className="nav-buttons">
                        <motion.button
                            onClick={handlePrevQuestion}
                            disabled={currentQuestion === 0}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Previous
                        </motion.button>
                        <motion.button
                            onClick={() => {
                                if (currentQuestion < 24) setCurrentQuestion(prev => prev + 1);
                            }}
                            disabled={currentQuestion === 24}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Next
                        </motion.button>
                    </div>

                    <motion.button
                        className="exercise-button"
                        onClick={() => navigate("/learning-module6")}
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

export default Quiz6;