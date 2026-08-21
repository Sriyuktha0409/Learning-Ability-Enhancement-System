import React, { useState } from "react";
import "./Exercise.css";
import { useNavigate } from "react-router-dom";

const categories = ["Addition", "Subtraction", "Place Value", "Shapes"];
const shapeNames = ["Circle", "Square", "Triangle", "Rectangle"];

const DIFFICULTY_LEVELS = { EASY: 0, MEDIUM: 1, HARD: 2 };
const DIFFICULTY_NAMES = ["EASY", "MEDIUM", "HARD"];

const QUESTION_PARAMS = {
  Addition: {
    [DIFFICULTY_LEVELS.EASY]: { min: 10, max: 20 },
    [DIFFICULTY_LEVELS.MEDIUM]: { min: 20, max: 40 },
    [DIFFICULTY_LEVELS.HARD]: { min: 40, max: 60 }
  },
  Subtraction: {
    [DIFFICULTY_LEVELS.EASY]: { min: 10, max: 30 },
    [DIFFICULTY_LEVELS.MEDIUM]: { min: 30, max: 50 },
    [DIFFICULTY_LEVELS.HARD]: { min: 50, max: 60 }
  },
  "Place Value": {
    [DIFFICULTY_LEVELS.EASY]: { digits: 3, place: "ones" },
    [DIFFICULTY_LEVELS.MEDIUM]: { digits: 3, place: "tens" },
    [DIFFICULTY_LEVELS.HARD]: { digits: 4, place: "hundreds" }
  },
  Shapes: { options: shapeNames }
};

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

  const renderShape = (shapeType) => {
    switch (shapeType) {
      case "Circle": return <svg width="100" height="100"><circle cx="50" cy="50" r="40" fill="blue" /></svg>;
      case "Square": return <svg width="100" height="100"><rect x="20" y="20" width="60" height="60" fill="green" /></svg>;
      case "Triangle": return <svg width="100" height="100"><polygon points="50,10 90,80 10,80" fill="red" /></svg>;
      case "Rectangle": return <svg width="120" height="80"><rect x="10" y="20" width="100" height="40" fill="purple" /></svg>;
      default: return null;
    }
  };

  const generateUniqueQuestion = (category, difficulty) => {
    let question, answer, options = [];
    
    if (category === "Shapes") {
      const shape = shapeNames[Math.floor(Math.random() * shapeNames.length)];
      options = [...shapeNames].sort(() => Math.random() - 0.5);
      question = "Identify the shape shown below:";
      answer = shape;
      return { question, answer, options, shapeType: shape };
    }
    
    const params = QUESTION_PARAMS[category][difficulty];
    
    switch (category) {
      case "Addition": {
        const a = Math.floor(Math.random() * (params.max - params.min + 1)) + params.min;
        const b = Math.floor(Math.random() * (params.max - params.min + 1)) + params.min;
        question = `What is ${a} + ${b}?`;
        answer = (a + b).toString();
        break;
      }
      case "Subtraction": {
        const num1 = Math.floor(Math.random() * (params.max - params.min + 1)) + params.min;
        const num2 = Math.floor(Math.random() * (num1 - params.min + 1)) + params.min;
        question = `What is ${num1} - ${num2}?`;
        answer = (num1 - num2).toString();
        break;
      }
      case "Place Value": {
        const digits = Array.from({length: params.digits}, () => Math.floor(Math.random() * 10));
        const number = parseInt(digits.join(''));
        let placeValue, placeName;
        
        if (params.place === "ones") {
          placeValue = digits[digits.length-1];
          placeName = "ones";
        } else if (params.place === "tens") {
          placeValue = digits[digits.length-2] * 10;
          placeName = "tens";
        } else {
          placeValue = digits[digits.length-3] * 100;
          placeName = "hundreds";
        }
        
        question = `What is the ${placeName} place value in ${number}?`;
        answer = placeValue.toString();
        break;
      }
      default:
        question = "Unknown Question";
        answer = "?";
    }

    return { question, answer };
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
    const questionCount = category === "Shapes" ? 4 : 1;
    
    // For shapes, generate all 4 unique questions at once
    if (category === "Shapes") {
      const usedShapes = new Set();
      while (initialQuestions.length < 4) {
        const newQuestion = generateUniqueQuestion(category, DIFFICULTY_LEVELS.EASY);
        if (!usedShapes.has(newQuestion.shapeType)) {
          initialQuestions.push(newQuestion);
          usedShapes.add(newQuestion.shapeType);
        }
      }
    } else {
      initialQuestions.push(generateUniqueQuestion(category, DIFFICULTY_LEVELS.EASY));
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
    const newQuestion = generateUniqueQuestion(selectedCategory, currentDifficulty);
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
    if (currentQuestionIndex < (selectedCategory === "Shapes" ? 3 : 19)) {
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
              <span>Question: <strong>{currentQuestionIndex + 1}/4</strong></span>
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
                  {currentQuestionIndex < (selectedCategory === "Shapes" ? 3 : 19) ? "Next" : "Finish"}
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
              <h3>Final Score: {score}/{selectedCategory === "Shapes" ? 4 : 20}</h3>
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