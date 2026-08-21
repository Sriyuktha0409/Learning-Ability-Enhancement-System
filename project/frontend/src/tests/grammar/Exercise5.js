import React, { useState, useEffect } from "react";
import "./ExerciseTest.css";

const topics = [
    "Nouns", "Pronouns", "Verbs", "Adjectives", "Adverbs", 
    "Prepositions", "Conjunctions", "Tenses", "Sentence Structure", "Punctuation"
];

const generateQuestion = (difficulty) => {
    const topic = topics[Math.floor(Math.random() * topics.length)];
    let question = "";
    let correctAnswer = "";

    switch (topic) {
        case "Nouns":
            question = "Identify the noun in the sentence: 'The cat sleeps on the mat.'";
            correctAnswer = "cat, mat";
            break;
        case "Pronouns":
            question = "Choose the correct pronoun: '___ am going to the park.' (He/I/She)";
            correctAnswer = "I";
            break;
        case "Verbs":
            question = "What is the verb in this sentence? 'She runs every morning.'";
            correctAnswer = "runs";
            break;
        case "Adjectives":
            question = "Find the adjective: 'The tall building is impressive.'";
            correctAnswer = "tall";
            break;
        case "Adverbs":
            question = "Which word is the adverb? 'He ran quickly to the store.'";
            correctAnswer = "quickly";
            break;
        case "Prepositions":
            question = "Identify the preposition: 'The book is on the table.'";
            correctAnswer = "on";
            break;
        case "Conjunctions":
            question = "Find the conjunction: 'I wanted to go, but it was raining.'";
            correctAnswer = "but";
            break;
        case "Tenses":
            question = "What tense is used? 'She had finished her homework before dinner.'";
            correctAnswer = "Past Perfect";
            break;
        case "Sentence Structure":
            question = "Identify the subject: 'The little boy played in the garden.'";
            correctAnswer = "The little boy";
            break;
        case "Punctuation":
            question = "Where should the comma go? 'After school I went home and did my homework.'";
            correctAnswer = "After school, I went home and did my homework.";
            break;
        default:
            question = "Error generating question.";
            correctAnswer = "";
    }

    return { question, correctAnswer };
};

const Exercise5 = () => {
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        resetQuiz();
    }, []);

    const resetQuiz = () => {
        const initialQuestions = Array.from({ length: 20 }, () => generateQuestion(1));
        setQuestions(initialQuestions);
        setUserAnswers(Array(20).fill(""));
        setCurrentQuestionIndex(0);
        setQuizSubmitted(false);
        setScore(0);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < 19) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleSubmitQuiz = () => {
        let totalScore = userAnswers.reduce((acc, answer, index) => {
            return acc + ((answer || "").trim().toLowerCase() === questions[index].correctAnswer.toLowerCase() ? 1 : 0);
        }, 0);
        setScore(totalScore);
        setQuizSubmitted(true);
    };

    if (questions.length === 0) {
        return <p>Loading questions...</p>;
    }

    return (
        <div className="exercise-container">
            <h1>📝 Exercise 5: Advanced Grammar Test 📝</h1>
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
                    <button className="try-again-btn" onClick={resetQuiz}>Try Again</button>
                </div>
            )}
        </div>
    );
};

export default Exercise5;