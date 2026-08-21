import React, { useState, useEffect } from "react";
import "./ExerciseTest.css";

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomLetter = () => String.fromCharCode(getRandomNumber(65, 90));
const isVowel = (letter) => "AEIOU".includes(letter);
const isConsonant = (letter) => !isVowel(letter);

const generateQuestion = () => {
    let type = getRandomNumber(1, 3);
    let question = "";
    let correctAnswer = "";

    switch (type) {
        case 1:
            let vowel = getRandomLetter();
            while (!isVowel(vowel)) vowel = getRandomLetter();
            question = `Which of these is a vowel? A) ${getRandomLetter()} B) ${getRandomLetter()} C) ${vowel}`;
            correctAnswer = vowel;
            break;

        case 2:
            let consonant = getRandomLetter();
            while (!isConsonant(consonant)) consonant = getRandomLetter();
            question = `Which of these is a consonant? A) ${getRandomLetter()} B) ${getRandomLetter()} C) ${consonant}`;
            correctAnswer = consonant;
            break;

        case 3:
            const singularPluralPairs = [
                { singular: "cat", plural: "cats" },
                { singular: "dog", plural: "dogs" },
                { singular: "bus", plural: "buses" },
                { singular: "child", plural: "children" },
                { singular: "mouse", plural: "mice" }
            ];
            let pair = singularPluralPairs[getRandomNumber(0, singularPluralPairs.length - 1)];
            question = `What is the plural of '${pair.singular}'?`;
            correctAnswer = pair.plural;
            break;
    }
    return { question, correctAnswer };
};

const ExerciseTest = () => {
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        generateNewQuiz();
    }, []);

    const generateNewQuiz = () => {
        const initialQuestions = Array.from({ length: 20 }, () => generateQuestion());
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
            <h1>📝 1st Grade Exercise Test 📝</h1>
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
                    <h3>Correct Answers:</h3>
                    <ul className="correct-answers">
                        {questions.map((q, index) => (
                            <li key={index}><strong>Q{index + 1}:</strong> {q.question} <br /> <strong>Answer:</strong> {q.correctAnswer}</li>
                        ))}
                    </ul>
                    <div className="button-container">
                        <button className="try-again-btn" onClick={generateNewQuiz}>Try Again</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExerciseTest;