import React, { useState, useEffect } from "react";
import "./ExerciseTest.css";

const questionsBank = [
    { question: "Identify the noun: The dog is barking.", correctAnswer: "dog" },
    { question: "Choose the correct verb: She ____ to school every day.", correctAnswer: "goes" },
    { question: "Pick the adjective: The beautiful flower bloomed.", correctAnswer: "beautiful" },
    { question: "Identify the tense: She was reading a book.", correctAnswer: "past continuous" },
    { question: "Convert to passive voice: The chef cooked a delicious meal.", correctAnswer: "A delicious meal was cooked by the chef." },
    { question: "Choose the correct pronoun: _____ is my best friend.", correctAnswer: "He/She" },
    { question: "Identify the adverb: He ran quickly to the store.", correctAnswer: "quickly" },
    { question: "Convert to indirect speech: She said, 'I am happy.'", correctAnswer: "She said that she was happy." },
    { question: "Choose the correct conjunction: I was tired, ____ I kept working.", correctAnswer: "but" },
    { question: "Identify the preposition: The book is on the table.", correctAnswer: "on" },
    { question: "Correct the sentence: he go to school yesterday.", correctAnswer: "He went to school yesterday." },
    { question: "Change to future tense: She writes a letter.", correctAnswer: "She will write a letter." },
    { question: "Identify the type of sentence: What a beautiful day!", correctAnswer: "Exclamatory" },
    { question: "Choose the correct article: She adopted ___ cat.", correctAnswer: "a" },
    { question: "Identify the subject: The birds are chirping in the trees.", correctAnswer: "The birds" },
    { question: "Find the direct object: She gave me a gift.", correctAnswer: "a gift" },
    { question: "Choose the correct punctuation: Where are you going__", correctAnswer: "?" },
    { question: "Identify the helping verb: She is singing a song.", correctAnswer: "is" },
    { question: "Convert to comparative form: This book is good.", correctAnswer: "This book is better." },
    { question: "Pick the correct answer: The sun ____ in the east.", correctAnswer: "rises" }
];

const getNextQuestion = (performance) => {
    if (performance > 0.8) {
        return questionsBank[Math.floor(Math.random() * 10)];
    } else if (performance > 0.5) {
        return questionsBank[Math.floor(Math.random() * 10) + 5];
    } else {
        return questionsBank[Math.floor(Math.random() * 10) + 10];
    }
};

const Exercise7 = () => {
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const initialQuestions = Array.from({ length: 20 }, () => getNextQuestion(1));
        setQuestions(initialQuestions);
        setUserAnswers(Array(20).fill(""));
    }, []);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < 19) {
            let performance = score / (currentQuestionIndex + 1);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setQuestions(prev => {
                const newQuestions = [...prev];
                newQuestions[currentQuestionIndex + 1] = getNextQuestion(performance);
                return newQuestions;
            });
        }
    };

    const handleSubmitQuiz = () => {
        let totalScore = userAnswers.reduce((acc, answer, index) => {
            return acc + ((answer || "").trim().toLowerCase() === questions[index].correctAnswer.toLowerCase() ? 1 : 0);
        }, 0);
        setScore(totalScore);
        setQuizSubmitted(true);
    };

    const handleTryAgain = () => {
        setQuizSubmitted(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        const initialQuestions = Array.from({ length: 20 }, () => getNextQuestion(1));
        setQuestions(initialQuestions);
        setUserAnswers(Array(20).fill(""));
    };

    if (questions.length === 0) {
        return <p>Loading questions...</p>;
    }

    return (
        <div className="exercise-container">
            <h1>📝 Exercise 7: Advanced Grammar Test 📝</h1>
            {!quizSubmitted ? (
                <>
                    <h2>Question {currentQuestionIndex + 1} / 20</h2>
                    <p className="question-box">{questions[currentQuestionIndex].question}</p>
                    <textarea
                        className="answer-input"
                        value={userAnswers[currentQuestionIndex] || ""}
                        onChange={(e) => {
                            const newAnswers = [...userAnswers];
                            newAnswers[currentQuestionIndex] = e.target.value;
                            setUserAnswers(newAnswers);
                        }}
                        placeholder="Write your answer here..."
                    />
                    <div className="button-container">
                        {currentQuestionIndex < 19 ? (
                            <button className="next-btn" onClick={handleNextQuestion}>Next</button>
                        ) : (
                            <button className="submit-btn" onClick={handleSubmitQuiz}>Submit</button>
                        )}
                    </div>
                </>
            ) : (
                <div>
                    <h2>Quiz Completed! 🎉</h2>
                    <h3>Your Score: {score} / 20</h3>
                    {score < 14 ? (
                        <p className="exercise-warning">⚠️ Try Again for Better Performance! 🏋️</p>
                    ) : (
                        <p className="congrats-message">🎉 Well Done! You Passed! 🎉</p>
                    )}
                    <h2>Answers Review</h2>
                    <ul>
                        {questions.map((q, index) => (
                            <li key={index}>
                                <strong>Q{index + 1}: {q.question}</strong>
                                <br />
                                <span style={{ color: (userAnswers[index] || "").trim().toLowerCase() === q.correctAnswer.toLowerCase() ? "green" : "red" }}>
                                    Your Answer: {userAnswers[index] || "No answer"}
                                </span>
                                <br />
                                <span>Correct Answer: {q.correctAnswer}</span>
                            </li>
                        ))}
                    </ul>
                    <button className="try-again-btn" onClick={handleTryAgain}>Try Again</button>
                </div>
            )}
        </div>
    );
};

export default Exercise7;