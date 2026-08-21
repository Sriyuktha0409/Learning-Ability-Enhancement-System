import React, { useState } from "react";
import "./Exercise.css";
import { useNavigate } from "react-router-dom";

const categories = ["Addition", "Subtraction", "Multiplication", "Division", "Even-Odd"];
const shapeNames = ["Circle", "Square", "Rectangle", "Triangle", "Hexagon", "Pentagon"];

const DIFFICULTY_LEVELS = { EASY: 0, MEDIUM: 1, HARD: 2 };
const DIFFICULTY_NAMES = ["EASY", "MEDIUM", "HARD"];

const ExerciseWithRL = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [score, setScore] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [sessionCompleted, setSessionCompleted] = useState(false);
    const [currentDifficulty, setCurrentDifficulty] = useState(DIFFICULTY_LEVELS.EASY);
    const navigate = useNavigate();

    const generateQuestion = (category) => {
        let question = "";
        let answer = "";
        let options = [];

        switch (category) {
            case "Addition":
                let a = Math.floor(Math.random() * 301) + 100;
                let b = Math.floor(Math.random() * 301) + 100;
                question = `What is ${a} + ${b}?`;
                answer = (a + b).toString();
                break;
            case "Subtraction":
                let num1 = Math.floor(Math.random() * 501) + 200;
                let num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
                question = `What is ${num1} - ${num2}?`;
                answer = (num1 - num2).toString();
                break;
            case "Multiplication":
                let factor1 = Math.floor(Math.random() * 13) + 2;
                let factor2 = Math.floor(Math.random() * 13) + 2;
                question = `What is ${factor1} × ${factor2}?`;
                answer = (factor1 * factor2).toString();
                break;
            case "Division":
                let divisor = Math.floor(Math.random() * 9) + 2;
                let dividend = divisor * (Math.floor(Math.random() * 13) + 2);
                question = `What is ${dividend} ÷ ${divisor}?`;
                answer = (dividend / divisor).toString();
                break;
            case "Even-Odd":
                num1 = Math.floor(Math.random() * 1000);
                question = `Is ${num1} even or odd?`;
                options = ["Even", "Odd"];
                answer = num1 % 2 === 0 ? "Even" : "Odd";
                return { question, answer, options };
            default:
                question = "Unknown Question";
                answer = "?";
        }
        return { question, answer };
    };

    const renderShape = (shapeType) => {
        switch (shapeType) {
            case "Circle":
                return <svg width="100" height="100"><circle cx="50" cy="50" r="40" fill="blue" /></svg>;
            case "Square":
                return <svg width="100" height="100"><rect x="20" y="20" width="60" height="60" fill="green" /></svg>;
            case "Rectangle":
                return <svg width="120" height="80"><rect x="10" y="20" width="100" height="40" fill="purple" /></svg>;
            case "Triangle":
                return <svg width="100" height="100"><polygon points="50,10 90,80 10,80" fill="red" /></svg>;
            case "Hexagon":
                return <svg width="100" height="100"><polygon points="50,10 90,25 90,75 50,90 10,75 10,25" fill="yellow" /></svg>;
            case "Pentagon":
                return <svg width="100" height="100"><polygon points="50,10 90,30 75,80 25,80 10,30" fill="orange" /></svg>;
            default:
                return null;
        }
    };

    const updateDifficulty = (isCorrect) => {
        let newDifficulty = currentDifficulty;
        
        if (isCorrect) {
            if (currentDifficulty < DIFFICULTY_LEVELS.HARD) {
                newDifficulty = currentDifficulty + 1;
            }
        } else {
            if (currentDifficulty > DIFFICULTY_LEVELS.EASY) {
                newDifficulty = currentDifficulty - 1;
            }
        }
        
        setCurrentDifficulty(newDifficulty);
        return newDifficulty;
    };

    const startExercise = (category) => {
        setSelectedCategory(category);
        const initialQuestions = [];
        const questionCount = category === "Shapes" ? 6 : 1; // 6 shapes available
        
        if (category === "Shapes") {
            const usedShapes = new Set();
            while (initialQuestions.length < 6) {
                const shape = shapeNames[Math.floor(Math.random() * shapeNames.length)];
                if (!usedShapes.has(shape)) {
                    const question = "Identify the shape shown below:";
                    const answer = shape;
                    const options = [...shapeNames].sort(() => Math.random() - 0.5);
                    initialQuestions.push({ question, answer, options, shapeType: shape });
                    usedShapes.add(shape);
                }
            }
        } else {
            initialQuestions.push(generateQuestion(category));
        }
        
        setQuestions(initialQuestions);
        setCurrentQuestionIndex(0);
        setUserInput("");
        setScore(0);
        setUserAnswers([]);
        setSessionCompleted(false);
        setCurrentDifficulty(DIFFICULTY_LEVELS.EASY);
    };

    const generateNextQuestion = () => {
        if (selectedCategory === "Shapes") return;
        const newQuestion = generateQuestion(selectedCategory);
        setQuestions(prev => [...prev, newQuestion]);
    };

    const handleAnswer = () => {
        if (!userInput && selectedCategory !== "Shapes") return;

        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = userInput.toString().trim() === currentQuestion.answer.toString().trim();

        // Update score
        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        // Record answer
        setUserAnswers(prev => [...prev, {
            question: currentQuestion.question,
            userAnswer: userInput || "(skipped)",
            correctAnswer: currentQuestion.answer,
            isCorrect,
            difficulty: selectedCategory === "Shapes" ? "N/A" : DIFFICULTY_NAMES[currentDifficulty],
            shapeType: currentQuestion.shapeType || null
        }]);

        // Update difficulty for non-Shapes categories
        if (selectedCategory !== "Shapes") {
            updateDifficulty(isCorrect);
            generateNextQuestion();
        }

        setUserInput("");

        // Move to next question or complete session
        if (currentQuestionIndex < (selectedCategory === "Shapes" ? 5 : 19)) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setSessionCompleted(true);
        }
    };

    const completeSession = () => {
        setSessionCompleted(true);
    };

    const getDifficultyClass = (difficulty) => {
        switch (difficulty) {
            case DIFFICULTY_LEVELS.EASY: return "easy";
            case DIFFICULTY_LEVELS.MEDIUM: return "medium";
            case DIFFICULTY_LEVELS.HARD: return "hard";
            default: return "";
        }
    };

    return (
        <div className="exercise-container">
            {!selectedCategory ? (
                <div className="category-selection">
                    <h1>Select a Category</h1>
                    <div className="category-buttons">
                        {categories.map((category) => (
                            <button key={category} onClick={() => startExercise(category)}>
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="exercise-page">
                    <h1>{selectedCategory} Exercise</h1>
                    <div className="status-bar">
                        {selectedCategory !== "Shapes" && (
                            <span>Difficulty: <strong>{DIFFICULTY_NAMES[currentDifficulty]}</strong></span>
                        )}
                        <span>Score: <strong>{score}/{userAnswers.length}</strong></span>
                        {selectedCategory === "Shapes" && (
                            <span>Question: <strong>{currentQuestionIndex + 1}/6</strong></span>
                        )}
                    </div>
                    
                    {!sessionCompleted ? (
                        <div className="question-box">
                            <h2>{questions[currentQuestionIndex]?.question}</h2>
                            
                            {selectedCategory === "Shapes" ? (
                                <div className="shape-container">
                                    {renderShape(questions[currentQuestionIndex]?.shapeType)}
                                    <div className="shape-options">
                                        {questions[currentQuestionIndex]?.options?.map((shape, i) => (
                                            <button
                                                key={i}
                                                className={`shape-btn ${userInput === shape ? "selected" : ""}`}
                                                onClick={() => setUserInput(shape)}
                                            >
                                                {shape}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : selectedCategory === "Even-Odd" ? (
                                <div className="options-container">
                                    {questions[currentQuestionIndex]?.options?.map((option, i) => (
                                        <button
                                            key={i}
                                            className={`option-btn ${userInput === option ? "selected" : ""}`}
                                            onClick={() => setUserInput(option)}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <input
                                    type="text"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    placeholder="Your answer"
                                />
                            )}

                            <div className="action-buttons">
                                <button 
                                    className="next-btn" 
                                    onClick={handleAnswer}
                                    disabled={!userInput && selectedCategory !== "Shapes"}
                                >
                                    {currentQuestionIndex < (selectedCategory === "Shapes" ? 5 : 19) ? "Next" : "Finish"}
                                </button>
                                <button 
                                    className="complete-btn" 
                                    onClick={completeSession}
                                >
                                    End Session
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="result-box">
                            <h2>Session Complete!</h2>
                            <h3>Final Score: {score}/{selectedCategory === "Shapes" ? 6 : 20}</h3>
                            <div className="answers-list">
                                {userAnswers.map((item, index) => (
                                    <div 
                                        key={index} 
                                        className={`answer-item ${item.isCorrect ? "correct" : "wrong"}`}
                                    >
                                        <div className="question">{item.question}</div>
                                        {item.shapeType ? (
                                            <>
                                                <div className="user-answer">
                                                    <p>Your answer:</p>
                                                    {renderShape(item.userAnswer)}
                                                </div>
                                                <div className="correct-answer">
                                                    <p>Correct answer:</p>
                                                    {renderShape(item.correctAnswer)}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="user-answer">Your answer: {item.userAnswer}</div>
                                                <div className="correct-answer">Correct answer: {item.correctAnswer}</div>
                                                {selectedCategory !== "Shapes" && (
                                                    <div className={`difficulty ${getDifficultyClass(item.difficulty)}`}>
                                                        Difficulty: {DIFFICULTY_NAMES[item.difficulty]}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button 
                                className="restart-btn" 
                                onClick={() => setSelectedCategory(null)}
                            >
                                Try Another Category
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ExerciseWithRL;