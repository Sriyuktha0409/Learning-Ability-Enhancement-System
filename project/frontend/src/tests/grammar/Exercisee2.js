import React, { useState, useEffect } from "react";
import "./ExerciseTest.css";

const questionsData = [
    { question: "Identify the noun: The dog runs fast.", correctAnswer: "dog" },
    { question: "Choose the pronoun: (He, Jump, Apple)", correctAnswer: "He" },
    { question: "Which is a verb? (Run, Blue, Chair)", correctAnswer: "Run" },
    { question: "Pick the adjective: The happy child plays.", correctAnswer: "happy" },
    { question: "Select the correct article: __ apple a day keeps the doctor away. (A/An)", correctAnswer: "An" },
    { question: "Find the noun: The teacher explained the lesson.", correctAnswer: "teacher" },
    { question: "Choose the correct pronoun: (They, Running, Table)", correctAnswer: "They" },
    { question: "Which is a verb? (Sing, Green, Cloud)", correctAnswer: "Sing" },
    { question: "Pick the adjective: The small cat climbed the tree.", correctAnswer: "small" },
    { question: "Choose the correct article: __ elephant is large. (A/An)", correctAnswer: "An" },
    { question: "Identify the noun: The scientist made a discovery.", correctAnswer: "scientist" },
    { question: "Choose the correct pronoun: (Whom, Happy, Eat)", correctAnswer: "Whom" },
    { question: "Which is a verb? (Construct, Smart, Lamp)", correctAnswer: "Construct" },
    { question: "Pick the adjective: The exhausted runner finished the race.", correctAnswer: "exhausted" },
    { question: "Select the correct article: He adopted __ unique pet. (A/An)", correctAnswer: "A" },
    { question: "Which is a verb? (Build, Bright, Lamp)", correctAnswer: "Build" },
    { question: "Find the noun: The baby slept peacefully.", correctAnswer: "baby" },
    { question: "Choose the correct pronoun: (It, Slowly, Red)", correctAnswer: "It" },
    { question: "Pick the adjective: The old man walked slowly.", correctAnswer: "old" },
    { question: "Choose the correct article: __ house is on fire. (A/The)", correctAnswer: "The" }
];

const Exercise2 = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState(Array(20).fill(""));
    const [score, setScore] = useState(0);
    const [quizSubmitted, setQuizSubmitted] = useState(false);

    useEffect(() => {
        setUserAnswers(Array(20).fill(""));
    }, []);

    const handleAnswer = (event) => {
        const answer = event.target.value;
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = answer;
        setUserAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < 19) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizSubmitted(true);
            calculateScore();
        }
    };

    const calculateScore = () => {
        let newScore = 0;
        userAnswers.forEach((answer, index) => {
            if (answer.toLowerCase().trim() === questionsData[index].correctAnswer.toLowerCase().trim()) {
                newScore++;
            }
        });
        setScore(newScore);
    };

    const handleTryAgain = () => {
        setCurrentQuestionIndex(0);
        setUserAnswers(Array(20).fill(""));
        setScore(0);
        setQuizSubmitted(false);
    };

    return (
        <div className="exercise-container">
            <h1>📚 Exercise 2: Grammar Test 📚</h1>
            {!quizSubmitted ? (
                <>
                    <h2>Question {currentQuestionIndex + 1} / 20</h2>
                    <p className="question-box">{questionsData[currentQuestionIndex].question}</p>
                    <input
                        className="answer-input"
                        type="text"
                        value={userAnswers[currentQuestionIndex] || ""}
                        onChange={handleAnswer}
                        placeholder="Type your answer here..."
                    />
                    <div className="button-container">
                        <button className="next-btn" onClick={handleNext}>Next</button>
                    </div>
                </>
            ) : (
                <div>
                    <h2>Test Completed! 🎉</h2>
                    <h3>Your Score: {score} / 20</h3>
                    {score < 14 ? (
                        <p className="exercise-warning">🔁 Try Again for Better Performance!</p>
                    ) : (
                        <p className="congrats-message">🎯 Great Job!</p>
                    )}
                    
                    {/* Display Correct Answers and User's Answers */}
                    <h2>✅ Correct Answers:</h2>
                    <ul className="results-list">
                        {questionsData.map((q, index) => (
                            <li key={index} className="result-item">
                                <p><strong>Q{index + 1}:</strong> {q.question}</p>
                                <p className={userAnswers[index]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim() ? "correct" : "incorrect"}>
                                    <strong>Your Answer:</strong> {userAnswers[index] || "No answer"}
                                </p>
                                <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>
                            </li>
                        ))}
                    </ul>
                    <button className="try-again-btn" onClick={handleTryAgain}>Try Again</button>
                </div>
            )}
        </div>
    );
};

export default Exercise2;