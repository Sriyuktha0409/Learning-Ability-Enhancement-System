import React, { useState } from "react";
import "./ExerciseTest.css";

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const nouns = ["dog", "school", "car", "tree", "book"];
const verbs = ["run", "jump", "write", "read", "eat"];
const adjectives = ["happy", "blue", "fast", "bright", "soft"];
const pronouns = ["he", "she", "it", "we", "they"];
const punctuation = [".", ",", "!", "?"];
const tenses = ["past", "present", "future"];

const generateQuestions = () => {
    let generatedQuestions = [];
    
    for (let i = 0; i < 20; i++) {
        let type = i % 6;
        let question = "";
        let correctAnswer = "";

        switch (type) {
            case 0:
                let noun = getRandomElement(nouns);
                question = `Identify the noun in: "The ${noun} is big."`;
                correctAnswer = noun;
                break;
            case 1:
                let verb = getRandomElement(verbs);
                question = `What is the base form of "${verb}ing"?`;
                correctAnswer = verb;
                break;
            case 2:
                let adjective = getRandomElement(adjectives);
                question = `Which word is an adjective? ${adjective}, ${getRandomElement(nouns)}, ${getRandomElement(verbs)}`;
                correctAnswer = adjective;
                break;
            case 3:
                let pronoun = getRandomElement(pronouns);
                question = `Which word is a pronoun? ${pronoun}, ${getRandomElement(nouns)}, ${getRandomElement(adjectives)}`;
                correctAnswer = pronoun;
                break;
            case 4:
                let tense = getRandomElement(tenses);
                question = `What tense is the sentence: "I will eat lunch."?`;
                correctAnswer = "future";
                break;
            case 5:
                let punct = getRandomElement(punctuation);
                question = `Which symbol is a punctuation mark? ${punct}, ${getRandomElement(nouns)}, ${getRandomElement(verbs)}`;
                correctAnswer = punct;
                break;
        }

        generatedQuestions.push({ question, correctAnswer });
    }

    return generatedQuestions;
};

const Exercise4 = () => {
    const [questions, setQuestions] = useState(generateQuestions());
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState(Array(20).fill(""));
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const handleNextQuestion = () => {
        if (currentQuestion < 19) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleSubmitQuiz = () => {
        let totalScore = 0;
        userAnswers.forEach((answer, index) => {
            if (answer.trim().toLowerCase() === questions[index].correctAnswer.toLowerCase()) {
                totalScore++;
            }
        });
        setScore(totalScore);
        setQuizSubmitted(true);
    };

    const handleTryAgain = () => {
        setQuestions(generateQuestions());
        setCurrentQuestion(0);
        setUserAnswers(Array(20).fill(""));
        setQuizSubmitted(false);
        setScore(0);
    };

    return (
        <div className="exercise-container">
            <h1>📝 Exercise 4: Grammar Test 📝</h1>

            {!quizSubmitted ? (
                <>
                    <h2>Question {currentQuestion + 1} / 20</h2>
                    <p className="question-box">{questions[currentQuestion].question}</p>
                    <textarea
                        className="answer-box"
                        value={userAnswers[currentQuestion]}
                        onChange={(e) => {
                            const newAnswers = [...userAnswers];
                            newAnswers[currentQuestion] = e.target.value;
                            setUserAnswers(newAnswers);
                        }}
                        placeholder="Write your answer here..."
                    />

                    {currentQuestion < 19 ? (
                        <button onClick={handleNextQuestion}>Next</button>
                    ) : (
                        <button onClick={handleSubmitQuiz}>Submit</button>
                    )}
                </>
            ) : (
                <div>
                    <h2>Test Completed! 🎉</h2>
                    <h3>Your Score: {score} / 20</h3>

                    <h3>Review Your Answers:</h3>
                    <ul>
                        {questions.map((q, index) => (
                            <li key={index}>
                                <strong>{q.question}</strong><br />
                                <span className="user-answer">Your Answer: {userAnswers[index]}</span><br />
                                <span className="correct-answer">Correct Answer: {q.correctAnswer}</span>
                            </li>
                        ))}
                    </ul>

                    <button onClick={handleTryAgain} className="try-again-btn">Try Again</button>
                </div>
            )}
        </div>
    );
};

export default Exercise4;
