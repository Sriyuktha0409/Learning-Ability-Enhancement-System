import React, { useState, useEffect } from "react";
import "./ExerciseTest.css";

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const questionBank = {
    easy: [
        { question: "Identify the common noun: Apple, John, Canada", answer: "Apple" },
        { question: "Choose the correct pronoun: John is a boy. ___ likes football.", answer: "He" },
        { question: "Select the correct verb: She ___ to school every day. (go/goes)", answer: "goes" },
    ],
    medium: [
        { question: "Identify the plural form: Child", answer: "Children" },
        { question: "Choose the correct past tense verb: She ___ a book. (reads/read)", answer: "read" },
        { question: "Pick the correct adjective: The sky is very ___. (blue/quickly)", answer: "blue" },
    ],
    hard: [
        { question: "Choose the correct punctuation: Where are you going__ (.,!,?)", answer: "?" },
        { question: "Identify the sentence structure: 'She quickly ran to the store.' (Subject-Verb-Adverb/Subject-Adverb-Verb)", answer: "Subject-Adverb-Verb" },
        { question: "Choose the correct gender noun: The female form of 'actor' is?", answer: "actress" },
    ]
};

const Exercise3 = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        generateQuestions();
    }, []);

    const generateQuestions = () => {
        let generatedQuestions = [];
        for (let i = 0; i < 20; i++) {
            const difficultyLevel = i < 7 ? "easy" : i < 14 ? "medium" : "hard";
            const randomIndex = getRandomNumber(0, questionBank[difficultyLevel].length - 1);
            generatedQuestions.push(questionBank[difficultyLevel][randomIndex]);
        }
        setQuestions(generatedQuestions);
        setUserAnswers(Array(20).fill(""));
        setCurrentQuestionIndex(0);
        setQuizCompleted(false);
        setScore(0);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < 19) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleSubmitQuiz = () => {
        let totalScore = 0;
        userAnswers.forEach((answer, index) => {
            if (answer?.trim().toLowerCase() === questions[index].answer.toLowerCase()) {
                totalScore++;
            }
        });
        setScore(totalScore);
        setQuizCompleted(true);
    };

    return (
        <div className="exercise-container">
            <h1>📝 Exercise 3 - Grammar Challenge 📝</h1>
            {!quizCompleted ? (
                <>
                    <h2>Question {currentQuestionIndex + 1} / 20</h2>
                    <p className="question-box">{questions[currentQuestionIndex]?.question}</p>
                    <input
                        type="text"
                        className="answer-input"
                        value={userAnswers[currentQuestionIndex] || ""}
                        onChange={(e) => {
                            let newAnswers = [...userAnswers];
                            newAnswers[currentQuestionIndex] = e.target.value;
                            setUserAnswers(newAnswers);
                        }}
                        placeholder="Your answer here..."
                    />
                    {currentQuestionIndex < 19 ? (
                        <button className="next-btn" onClick={handleNextQuestion}>Next</button>
                    ) : (
                        <button className="submit-btn" onClick={handleSubmitQuiz}>Submit</button>
                    )}
                </>
            ) : (
                <div>
                    <h1>🎉 Quiz Completed! 🎉</h1>
                    <h2>Your Score: {score} / 20</h2>
                    <h3>Correct Answers:</h3>
                    <ul>
                        {questions.map((q, index) => (
                            <li key={index}>
                                <strong>Q{index + 1}:</strong> {q.question} <br />
                                <strong>Your Answer:</strong> {userAnswers[index] || "Not Answered"} <br />
                                <strong>Correct Answer:</strong> {q.answer}
                            </li>
                        ))}
                    </ul>
                    <button className="try-again-btn" onClick={generateQuestions}>Try Again</button>
                </div>
            )}
        </div>
    );
};

export default Exercise3;