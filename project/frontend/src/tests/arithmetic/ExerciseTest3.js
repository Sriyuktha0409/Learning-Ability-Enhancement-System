import React, { useState } from "react";
import "./Exercise.css";
import { useNavigate } from "react-router-dom";

// Constants
const DIFFICULTY_LEVELS = { EASY: 0, MEDIUM: 1, HARD: 2 };
const DIFFICULTY_NAMES = ["EASY", "MEDIUM", "HARD"];
const REWARD_CORRECT = 1;
const REWARD_WRONG = -1;
const LEARNING_RATE = 0.1;
const DISCOUNT_FACTOR = 0.9;
const EXPLORATION_RATE = 0.2;

const categories = ["Addition", "Subtraction", "Multiplication", "Division", "Even-Odd"];
const shapeNames = ["Circle", "Square", "Rectangle", "Triangle", "Hexagon", "Pentagon"];

// RL Q-Table
const initializeQTable = () => {
  const qTable = {};
  DIFFICULTY_NAMES.forEach(difficulty => {
    qTable[difficulty] = {
      EASY: 0,
      MEDIUM: 0,
      HARD: 0
    };
  });
  return qTable;
};

const QUESTION_PARAMS = {
  Addition: {
    [DIFFICULTY_LEVELS.EASY]: { min: 100, max: 200 },
    [DIFFICULTY_LEVELS.MEDIUM]: { min: 200, max: 400 },
    [DIFFICULTY_LEVELS.HARD]: { min: 400, max: 600 }
  },
  Subtraction: {
    [DIFFICULTY_LEVELS.EASY]: { min: 200, max: 400 },
    [DIFFICULTY_LEVELS.MEDIUM]: { min: 400, max: 600 },
    [DIFFICULTY_LEVELS.HARD]: { min: 600, max: 800 }
  },
  Multiplication: {
    [DIFFICULTY_LEVELS.EASY]: { min: 2, max: 5 },
    [DIFFICULTY_LEVELS.MEDIUM]: { min: 5, max: 10 },
    [DIFFICULTY_LEVELS.HARD]: { min: 10, max: 15 }
  },
  Division: {
    [DIFFICULTY_LEVELS.EASY]: { min: 2, max: 5 },
    [DIFFICULTY_LEVELS.MEDIUM]: { min: 5, max: 10 },
    [DIFFICULTY_LEVELS.HARD]: { min: 10, max: 15 }
  },
  "Even-Odd": {
    options: ["Even", "Odd"]
  },
  Shapes: { options: shapeNames }
};

const ExerciseWithRL = () => {
  // App State
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [usedShapes, setUsedShapes] = useState([]);
  
  // RL State
  const [qTable, setQTable] = useState(initializeQTable());
  const [difficulty, setDifficulty] = useState(DIFFICULTY_LEVELS.EASY);
  const navigate = useNavigate();

  // Strict difficulty progression rules
  const getNextDifficulty = (currentDifficulty, isCorrect) => {
    if (selectedCategory === "Shapes" || selectedCategory === "Even-Odd") {
      return DIFFICULTY_LEVELS.EASY;
    }
    
    if (isCorrect) {
      if (currentDifficulty === DIFFICULTY_LEVELS.EASY) {
        return DIFFICULTY_LEVELS.MEDIUM;
      } else if (currentDifficulty === DIFFICULTY_LEVELS.MEDIUM) {
        return DIFFICULTY_LEVELS.HARD;
      } else {
        return DIFFICULTY_LEVELS.HARD;
      }
    } else {
      if (currentDifficulty === DIFFICULTY_LEVELS.HARD) {
        return DIFFICULTY_LEVELS.MEDIUM;
      } else if (currentDifficulty === DIFFICULTY_LEVELS.MEDIUM) {
        return DIFFICULTY_LEVELS.EASY;
      } else {
        return DIFFICULTY_LEVELS.EASY;
      }
    }
  };

  // RL Action Selection with exploration
  const chooseDifficulty = (currentDifficulty, isCorrect) => {
    if (selectedCategory === "Shapes" || selectedCategory === "Even-Odd") {
      return DIFFICULTY_LEVELS.EASY;
    }
    
    if (Math.random() < EXPLORATION_RATE) {
      return Math.floor(Math.random() * 3);
    }
    return getNextDifficulty(currentDifficulty, isCorrect);
  };

  // Safe Q-table update
  const updateQTable = (oldDifficulty, action, reward, newDifficulty) => {
    if (selectedCategory === "Shapes" || selectedCategory === "Even-Odd") return;
    
    const oldState = DIFFICULTY_NAMES[oldDifficulty];
    const newState = DIFFICULTY_NAMES[newDifficulty];
    const actionName = DIFFICULTY_NAMES[action];

    if (!qTable[oldState]) qTable[oldState] = { EASY: 0, MEDIUM: 0, HARD: 0 };
    if (!qTable[newState]) qTable[newState] = { EASY: 0, MEDIUM: 0, HARD: 0 };

    const oldQValue = qTable[oldState][actionName] || 0;
    const maxNextQ = Math.max(...Object.values(qTable[newState]));
    const newQValue = oldQValue + LEARNING_RATE * (
      reward + DISCOUNT_FACTOR * maxNextQ - oldQValue
    );
    
    setQTable(prev => ({
      ...prev,
      [oldState]: { ...prev[oldState], [actionName]: newQValue }
    }));
  };

  // Generate Questions
  const generateUniqueQuestion = (category, difficulty) => {
    let question, answer, options = [];
    
    if (category === "Shapes") {
      const availableShapes = shapeNames.filter(shape => !usedShapes.includes(shape));
      const shape = availableShapes.length > 0 
        ? availableShapes[Math.floor(Math.random() * availableShapes.length)]
        : shapeNames[Math.floor(Math.random() * shapeNames.length)];
      
      setUsedShapes(prev => [...prev, shape]);
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
      case "Multiplication": {
        const factor1 = Math.floor(Math.random() * (params.max - params.min + 1)) + params.min;
        const factor2 = Math.floor(Math.random() * (params.max - params.min + 1)) + params.min;
        question = `What is ${factor1} × ${factor2}?`;
        answer = (factor1 * factor2).toString();
        break;
      }
      case "Division": {
        const divisor = Math.floor(Math.random() * (params.max - params.min + 1)) + params.min;
        const dividend = divisor * (Math.floor(Math.random() * 13) + 2);
        question = `What is ${dividend} ÷ ${divisor}?`;
        answer = (dividend / divisor).toString();
        break;
      }
      case "Even-Odd": {
        const num = Math.floor(Math.random() * 1000);
        question = `Is ${num} even or odd?`;
        options = ["Even", "Odd"];
        answer = num % 2 === 0 ? "Even" : "Odd";
        return { question, answer, options };
      }
      default:
        question = "Unknown Question";
        answer = "?";
    }
    return { question, answer };
  };

  // Render Shape
  const renderShape = (shapeType) => {
    switch (shapeType) {
      case "Circle": return <svg width="100" height="100"><circle cx="50" cy="50" r="40" fill="blue" /></svg>;
      case "Square": return <svg width="100" height="100"><rect x="20" y="20" width="60" height="60" fill="green" /></svg>;
      case "Rectangle": return <svg width="120" height="80"><rect x="10" y="20" width="100" height="40" fill="purple" /></svg>;
      case "Triangle": return <svg width="100" height="100"><polygon points="50,10 90,80 10,80" fill="red" /></svg>;
      case "Hexagon": return <svg width="100" height="100"><polygon points="50,10 90,25 90,75 50,90 10,75 10,25" fill="yellow" /></svg>;
      case "Pentagon": return <svg width="100" height="100"><polygon points="50,10 90,30 75,80 25,80 10,30" fill="orange" /></svg>;
      default: return null;
    }
  };

  // Start Exercise
  const startExercise = (category) => {
    setSelectedCategory(category);
    setUsedShapes([]);
    const initialQuestions = [generateUniqueQuestion(category, DIFFICULTY_LEVELS.EASY)];
    setQuestions(initialQuestions);
    setCurrentQuestionIndex(0);
    setUserInput("");
    setScore(0);
    setUserAnswers([]);
    setSessionCompleted(false);
    setDifficulty(DIFFICULTY_LEVELS.EASY);
  };

  // Handle Answer Submission
  const handleAnswer = () => {
    if (!userInput && selectedCategory !== "Shapes" && selectedCategory !== "Even-Odd") return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = userInput.toString().trim() === currentQuestion.answer.toString().trim();
    const reward = isCorrect ? REWARD_CORRECT : REWARD_WRONG;

    // Choose next difficulty
    const nextDifficulty = chooseDifficulty(difficulty, isCorrect);
    
    // Update Q-table
    updateQTable(difficulty, nextDifficulty, reward, nextDifficulty);

    // Update app state
    setScore(prev => isCorrect ? prev + 1 : prev);
    setUserAnswers(prev => [...prev, {
      question: currentQuestion.question,
      userAnswer: userInput,
      correctAnswer: currentQuestion.answer,
      isCorrect,
      difficulty: selectedCategory === "Shapes" || selectedCategory === "Even-Odd" 
        ? "N/A" 
        : DIFFICULTY_NAMES[difficulty],
      shapeType: currentQuestion.shapeType || null
    }]);
    
    setDifficulty(nextDifficulty);
    setUserInput("");

    // Generate next question if not completed
    if (!(selectedCategory === "Shapes" && currentQuestionIndex >= 5)) {
      const newQuestion = generateUniqueQuestion(selectedCategory, nextDifficulty);
      setQuestions(prev => [...prev, newQuestion]);
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setSessionCompleted(true);
    }
  };

  // End Session
  const completeSession = () => {
    setSessionCompleted(true);
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
            {selectedCategory !== "Shapes" && selectedCategory !== "Even-Odd" && (
              <span>Difficulty: <strong>{DIFFICULTY_NAMES[difficulty]}</strong></span>
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
                  disabled={!userInput && selectedCategory !== "Shapes" && selectedCategory !== "Even-Odd"}
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
                        {selectedCategory !== "Shapes" && selectedCategory !== "Even-Odd" && (
                          <div className="difficulty">Difficulty: {item.difficulty}</div>
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