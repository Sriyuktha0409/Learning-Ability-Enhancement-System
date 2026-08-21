import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Quiz.css";

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const nouns = ["dog", "car", "house", "tree", "apple"];
const pronouns = ["he", "she", "it", "they", "we"];
const verbs = ["run", "jump", "write", "sing", "eat"];
const adjectives = ["happy", "sad", "fast", "slow", "bright"];
const adverbs = ["quickly", "silently", "happily", "loudly", "brightly"];
const prepositions = ["on", "in", "under", "over", "between"];
const conjunctions = ["and", "but", "or", "because", "although"];
const sentences = [
    "The cat is on the table.",
    "She runs in the park.",
    "He sang a song yesterday.",
    "They will go to school tomorrow.",
    "I love to read books."
];

const generateQuestions = () => {
    let questions = [];
    let answers = [];
    for (let i = 0; i < 25; i++) {
        let type = i % 10;
        let question = "";
        let correctAnswer = "";

        switch (type) {
            case 0:
                let sentenceWithNoun = getRandomElement(sentences);
                question = `Identify the noun in the sentence: "${sentenceWithNoun}"`;
                correctAnswer = sentenceWithNoun.split(" ").find((word) => nouns.includes(word)) || "A noun";
                break;
            case 1:
                let selectedPronoun = getRandomElement(pronouns);
                question = `Choose the correct pronoun for: "${selectedPronoun}"`;
                correctAnswer = selectedPronoun;
                break;
            case 2:
                let verb = getRandomElement(verbs);
                question = `What is the past tense of "${verb}"?`;
                correctAnswer = verb + "ed";
                break;
            case 3:
                let adjective = getRandomElement(adjectives);
                question = `Which word is an adjective? ${adjective}, ${getRandomElement(nouns)}, ${getRandomElement(verbs)}`;
                correctAnswer = adjective;
                break;
            case 4:
                let sentenceWithAdverb = getRandomElement(sentences);
                question = `Identify the adverb in: "${sentenceWithAdverb}"`;
                correctAnswer = sentenceWithAdverb.split(" ").find((word) => adverbs.includes(word)) || "An adverb";
                break;
            case 5:
                question = `Fill in the blank with a preposition: "The book is ___ the table."`;
                correctAnswer = getRandomElement(prepositions);
                break;
            case 6:
                let conjunction = getRandomElement(conjunctions);
                question = `Which word is a conjunction? ${conjunction}, ${getRandomElement(nouns)}, ${getRandomElement(adjectives)}`;
                correctAnswer = conjunction;
                break;
            case 7:
                let sentenceWithTense = getRandomElement(sentences);
                question = `What tense is the sentence: "${sentenceWithTense}"?`;
                correctAnswer = sentenceWithTense.includes("will") ? "Future" : (sentenceWithTense.includes("yesterday") ? "Past" : "Present");
                break;
            case 8:
                question = `Which punctuation mark should end this sentence: "What is your name___"`;
                correctAnswer = "?";
                break;
            case 9:
                let sentenceWithSubject = getRandomElement(sentences);
                question = `Identify the subject in: "${sentenceWithSubject}"`;
                correctAnswer = sentenceWithSubject.split(" ")[0];
                break;
            default:
                break;
        }
        questions.push(question);
        answers.push(correctAnswer);
    }
    return { questions, answers };
};

const Quiz5 = () => {
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState({ questions: [], answers: [] });
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState(Array(25).fill(""));
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(40 * 60);
    const [isSaving, setIsSaving] = useState(false);
    const [celebrate, setCelebrate] = useState(false);

    useEffect(() => {
        const { questions, answers } = generateQuestions();
        setQuizData({ questions, answers });
    }, []);

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
        if (correctAnswer.includes("A noun") || correctAnswer.includes("An adverb")) {
            return userInput.trim().length > 0;
        }
        return userInput?.toString().trim().toLowerCase() === correctAnswer?.toString().trim().toLowerCase();
    };

    const handleNextQuestion = () => {
        if (checkAnswer(userAnswers[currentQuestion], quizData.answers[currentQuestion])) {
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
        let totalScore = userAnswers.reduce((score, answer, index) =>
            score + (checkAnswer(answer, quizData.answers[index]) ? 1 : 0), 0);
        
        setScore(totalScore);
        setQuizSubmitted(true);
        await saveResults(totalScore);
    };

    if (quizData.questions.length === 0) {
        return (
            <motion.div
                className="loading-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <p>Loading questions...</p>
            </motion.div>
        );
    }

    return (
        <div className="quiz-container">
            <div className="timer">⏳ Time Left: {formatTime(timeLeft)}</div>
            <h1>📖 5th Grade Language Quiz 📖</h1>

            {!quizSubmitted ? (
                <>
                    <h2>Question {currentQuestion + 1} / 25</h2>
                    <motion.div
                        className="question-card"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p>{quizData.questions[currentQuestion]}</p>
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
                        <p><strong>Question:</strong> {quizData.questions[currentQuestion]}</p>
                        <p className={checkAnswer(userAnswers[currentQuestion], quizData.answers[currentQuestion]) ? "correct-answer" : "wrong-answer"}>
                            Your Answer: {userAnswers[currentQuestion] || "No Answer"}
                        </p>
                        {!checkAnswer(userAnswers[currentQuestion], quizData.answers[currentQuestion]) && (
                            <p className="correct-answer">Correct Answer: {quizData.answers[currentQuestion]}</p>
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
                        onClick={() => navigate("/learning-module5")}
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

export default Quiz5;