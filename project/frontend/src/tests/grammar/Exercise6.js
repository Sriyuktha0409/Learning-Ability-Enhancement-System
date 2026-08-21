import React, { useState, useEffect } from "react";
import "./ExerciseTest.css";

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const questionsBank = [
    { question: "Identify the noun: The cat is sleeping.", options: ["cat", "is", "sleeping", "the"], answer: "cat" },
    { question: "Choose the correct pronoun: ___ went to the market.", options: ["He", "Her", "Them", "Us"], answer: "He" },
    { question: "Identify the verb: She runs fast.", options: ["She", "runs", "fast", "the"], answer: "runs" },
    { question: "Which is an adjective? The red car is fast.", options: ["red", "car", "is", "fast"], answer: "red" },
    { question: "Which is an adverb? She spoke softly.", options: ["She", "spoke", "softly", "the"], answer: "softly" },
    { question: "Choose the correct preposition: The book is ___ the table.", options: ["on", "at", "by", "with"], answer: "on" },
    { question: "Choose the conjunction: I like tea ___ coffee.", options: ["and", "or", "but", "so"], answer: "and" },
    { question: "Identify the correct tense: She will go to school.", options: ["Past", "Present", "Future", "None"], answer: "Future" },
    { question: "Find the phrase: She was waiting at the bus stop.", options: ["She was", "waiting", "at the bus stop", "the bus"], answer: "at the bus stop" },
    { question: "Which is a punctuation mark?", options: ["?", "and", "cat", "run"], answer: "?" },
    { question: "Choose the correct verb form: He ___ a book.", options: ["reads", "reading", "read", "to read"], answer: "reads" },
    { question: "Identify the adverb: She quickly finished her work.", options: ["She", "quickly", "finished", "work"], answer: "quickly" },
    { question: "Identify the noun: The sun is shining.", options: ["sun", "is", "shining", "the"], answer: "sun" },
    { question: "Choose the correct pronoun: ___ am happy.", options: ["I", "He", "She", "They"], answer: "I" },
    { question: "Identify the verb: They play football.", options: ["They", "play", "football", "the"], answer: "play" },
    { question: "Which is an adjective? The blue sky is clear.", options: ["blue", "sky", "is", "clear"], answer: "blue" },
    { question: "Choose the correct preposition: The cat is ___ the box.", options: ["in", "on", "by", "at"], answer: "in" },
    { question: "Choose the conjunction: I wanted to go, ___ it was raining.", options: ["but", "or", "and", "so"], answer: "but" },
    { question: "Identify the punctuation mark: He said, \"Hello!\"", options: ["!", "?", ",", "and"], answer: "!" },
    { question: "Choose the correct tense: They had completed the task.", options: ["Past", "Present", "Future", "None"], answer: "Past" }
];

const Exercise6 = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState(Array(20).fill(""));
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        setQuestions(questionsBank.sort(() => 0.5 - Math.random()).slice(0, 20));
    }, []);

    const handleAnswer = (answer) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestionIndex] = answer;
        setUserAnswers(updatedAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < 19) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleSubmit = () => {
        const totalScore = userAnswers.reduce((acc, answer, index) => acc + (answer === questions[index].answer ? 1 : 0), 0);
        setScore(totalScore);
        setQuizSubmitted(true);
    };

    const handleTryAgain = () => {
        setQuestions(questionsBank.sort(() => 0.5 - Math.random()).slice(0, 20));
        setCurrentQuestionIndex(0);
        setUserAnswers(Array(20).fill(""));
        setQuizSubmitted(false);
        setScore(0);
    };

    return (
        <div className="exercise-container">
            <h1>📝 Exercise 6: Grammar Mastery 📝</h1>
            {!quizSubmitted ? (
                <>
                    <h2>Question {currentQuestionIndex + 1} / 20</h2>
                    <p className="question-box">{questions[currentQuestionIndex]?.question}</p>
                    <div className="options-container">
                        {questions[currentQuestionIndex]?.options.map((option, index) => (
                            <button
                                key={index}
                                className={`option-btn ${userAnswers[currentQuestionIndex] === option ? "selected" : ""}`}
                                onClick={() => handleAnswer(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <div className="button-container">
                        {currentQuestionIndex < 19 ? (
                            <button className="next-btn" onClick={handleNext}>Next</button>
                        ) : (
                            <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                        )}
                    </div>
                </>
            ) : (
                <div>
                    <h2>Quiz Completed! 🎉</h2>
                    <h3>Your Score: {score} / 20</h3>
                    {score < 14 ? <p className="exercise-warning">⚠️ Try Again for Better Performance! 🏋️</p> : <p className="congrats-message">🎉 Well Done! You Passed! 🎉</p>}
                    <h2>Answers Review</h2>
                    <ul>
                        {questions.map((q, index) => (
                            <li key={index}>
                                <strong>Q{index + 1}: {q.question}</strong>
                                <br />
                                <span style={{ color: userAnswers[index] === q.answer ? "green" : "red" }}>
                                    Your Answer: {userAnswers[index] || "No answer"}
                                </span>
                                <br />
                                <span>Correct Answer: {q.answer}</span>
                            </li>
                        ))}
                    </ul>
                    <button className="try-again-btn" onClick={handleTryAgain}>Try Again</button>
                </div>
            )}
        </div>
    );
};

export default Exercise6;
