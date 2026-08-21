import React, { useState } from "react";
import "./Exercise.css";
import { useNavigate } from "react-router-dom";

const categories = ["Exponents", "Percentages", "Geometry", "Volume", "Speed-Distance"];

// Difficulty levels
const DIFFICULTY_LEVELS = {
  EASY: 0,
  MEDIUM: 1,
  HARD: 2
};

// Question parameters for each category and difficulty
const QUESTION_PARAMS = {
  Exponents: {
    [DIFFICULTY_LEVELS.EASY]: { minBase: 2, maxBase: 5, minExp: 2, maxExp: 3 },
    [DIFFICULTY_LEVELS.MEDIUM]: { minBase: 6, maxBase: 10, minExp: 3, maxExp: 4 },
    [DIFFICULTY_LEVELS.HARD]: { minBase: 11, maxBase: 15, minExp: 4, maxExp: 5 }
  },
  Percentages: {
    [DIFFICULTY_LEVELS.EASY]: { minNum: 100, maxNum: 500, minPercent: 1, maxPercent: 20 },
    [DIFFICULTY_LEVELS.MEDIUM]: { minNum: 500, maxNum: 1000, minPercent: 20, maxPercent: 50 },
    [DIFFICULTY_LEVELS.HARD]: { minNum: 1000, maxNum: 2000, minPercent: 50, maxPercent: 100 }
  },
  Geometry: {
    [DIFFICULTY_LEVELS.EASY]: { minSide: 1, maxSide: 5 },
    [DIFFICULTY_LEVELS.MEDIUM]: { minSide: 6, maxSide: 10 },
    [DIFFICULTY_LEVELS.HARD]: { minSide: 11, maxSide: 15 }
  },
  Volume: {
    [DIFFICULTY_LEVELS.EASY]: { minSide: 1, maxSide: 5 },
    [DIFFICULTY_LEVELS.MEDIUM]: { minSide: 6, maxSide: 10 },
    [DIFFICULTY_LEVELS.HARD]: { minSide: 11, maxSide: 15 }
  },
  "Speed-Distance": {
    [DIFFICULTY_LEVELS.EASY]: { minSpeed: 20, maxSpeed: 50, minTime: 1, maxTime: 3 },
    [DIFFICULTY_LEVELS.MEDIUM]: { minSpeed: 50, maxSpeed: 100, minTime: 3, maxTime: 6 },
    [DIFFICULTY_LEVELS.HARD]: { minSpeed: 100, maxSpeed: 150, minTime: 6, maxTime: 10 }
  }
};

const generateQuestion = (category, difficulty) => {
  const params = QUESTION_PARAMS[category][difficulty];
  let question = "";
  let answer = "";
  let options = [];

  switch (category) {
    case "Exponents":
      const base = Math.floor(Math.random() * (params.maxBase - params.minBase + 1)) + params.minBase;
      const exponent = Math.floor(Math.random() * (params.maxExp - params.minExp + 1)) + params.minExp;
      question = `Evaluate: ${base}^${exponent} = ?`;
      answer = Math.pow(base, exponent).toString();
      break;

    case "Percentages":
      const num = Math.floor(Math.random() * (params.maxNum - params.minNum + 1)) + params.minNum;
      const percent = Math.floor(Math.random() * (params.maxPercent - params.minPercent + 1)) + params.minPercent;
      question = `What is ${percent}% of ${num}?`;
      answer = ((num * percent) / 100).toString();
      break;

    case "Geometry":
      const geometryType = Math.floor(Math.random() * 3);
      const side = Math.floor(Math.random() * (params.maxSide - params.minSide + 1)) + params.minSide;
      
      // eslint-disable-next-line default-case
      switch(geometryType) {
        case 0: // Area of square
          question = `Find the area of a square with side length ${side} cm.`;
          answer = (side * side).toString();
          break;
        case 1: // Area of rectangle
          const width = Math.floor(Math.random() * (params.maxSide - params.minSide + 1)) + params.minSide;
          question = `Find the area of a rectangle with length ${side} cm and width ${width} cm.`;
          answer = (side * width).toString();
          break;
        case 2: // Circumference of circle
          question = `Find the circumference of a circle with radius ${side} cm. (Use π = 3.14)`;
          answer = (2 * 3.14 * side).toFixed(2).toString();
          break;
      }
      break;

    case "Volume":
      const cubeSide = Math.floor(Math.random() * (params.maxSide - params.minSide + 1)) + params.minSide;
      question = `Find the volume of a cube with side length ${cubeSide} cm`;
      answer = Math.pow(cubeSide, 3).toString();
      break;

    case "Speed-Distance":
      const speed = Math.floor(Math.random() * (params.maxSpeed - params.minSpeed + 1)) + params.minSpeed;
      const time = Math.floor(Math.random() * (params.maxTime - params.minTime + 1)) + params.minTime;
      question = `A car moves at ${speed} km/h. How far will it travel in ${time} hours?`;
      answer = (speed * time).toString();
      break;

    default:
      question = "Unknown Question";
      answer = "?";
  }

  return { question, answer, options, difficulty, category };
};

const ExerciseTest = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentDifficulty, setCurrentDifficulty] = useState(DIFFICULTY_LEVELS.EASY);
  const [usedQuestions, setUsedQuestions] = useState(new Set());
  const navigate = useNavigate();

  const updateDifficulty = (correct) => {
    let newDifficulty = currentDifficulty;
    
    if (correct) {
      if (currentDifficulty < DIFFICULTY_LEVELS.HARD) {
        newDifficulty = currentDifficulty + 1;
      }
    } else {
      if (currentDifficulty > DIFFICULTY_LEVELS.EASY) {
        newDifficulty = currentDifficulty - 1;
      }
    }
    
    return newDifficulty;
  };

  const startExercise = (category) => {
    setSelectedCategory(category);
    setUsedQuestions(new Set());
    
    const initialQuestions = [];
    for (let i = 0; i < 5; i++) {
      initialQuestions.push(generateQuestion(category, DIFFICULTY_LEVELS.EASY));
    }
    
    setQuestions(initialQuestions);
    setCurrentQuestionIndex(0);
    setUserInput("");
    setUserAnswers([]);
    setScore(0);
    setCurrentDifficulty(DIFFICULTY_LEVELS.EASY);
  };

  const generateNextQuestion = () => {
    if (questions.length >= 20) return;
    const newQuestion = generateQuestion(selectedCategory, currentDifficulty);
    setQuestions(prev => [...prev, newQuestion]);
  };

  const handleNext = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const hasAnswer = userInput.trim() !== "";
    const correct = hasAnswer && userInput.toString().trim() === currentQuestion.answer.toString().trim();

    setUserAnswers(prev => [
      ...prev,
      {
        question: currentQuestion.question,
        userAnswer: hasAnswer ? userInput : "(skipped)",
        correctAnswer: currentQuestion.answer,
        correct,
        difficulty: currentQuestion.difficulty
      }
    ]);

    if (correct) setScore(prev => prev + 1);
    setUserInput("");
    
    const newDifficulty = hasAnswer ? updateDifficulty(correct) : currentDifficulty;
    setCurrentDifficulty(newDifficulty);
    
    if (currentQuestionIndex < 19) {
      if (questions.length <= currentQuestionIndex + 1) {
        generateNextQuestion();
      }
    }
    
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const getDifficultyName = (difficulty) => {
    switch (difficulty) {
      case DIFFICULTY_LEVELS.EASY: return "Easy";
      case DIFFICULTY_LEVELS.MEDIUM: return "Medium";
      case DIFFICULTY_LEVELS.HARD: return "Hard";
      default: return "";
    }
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
          {currentQuestionIndex < 20 ? (
            <div className="question-box">
              {questions[currentQuestionIndex] && (
                <>
                  <h2>{questions[currentQuestionIndex].question}</h2>
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Your answer"
                  />
                </>
              )}

              <button 
                className="next-btn" 
                onClick={handleNext}
              >
                {currentQuestionIndex < 19 ? "Next" : "Finish"}
              </button>
            </div>
          ) : (
            <div className="result-box">
              <h2>Final Score: {score}/20</h2>
              <h3>Review Your Answers:</h3>
              <ul className="answers-list">
                {userAnswers.map((item, index) => (
                  <li key={index} className={item.correct ? "correct-answer" : "wrong-answer"}>
                    <div className="question-text">{item.question}</div>
                    <div className="answer-details">
                      <span>Your answer: {item.userAnswer}</span><br></br>
                      <span>Correct answer: {item.correctAnswer}</span><br></br>
                      <span className={`difficulty ${getDifficultyClass(item.difficulty)}`}>
                        {getDifficultyName(item.difficulty)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="restart-btn" onClick={() => setSelectedCategory(null)}>
                Try Another Category
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExerciseTest;