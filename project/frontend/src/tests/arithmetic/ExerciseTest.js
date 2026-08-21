import React, { useState } from "react";
import "./Exercise.css";
import { useNavigate } from "react-router-dom";

const categories = ["Multiplication", "Division", "Fractions", "Geometry", "Factors"];

// Difficulty levels
const DIFFICULTY_LEVELS = {
  EASY: 0,
  MEDIUM: 1,
  HARD: 2
};

// Question parameters for each category and difficulty
const QUESTION_PARAMS = {
  Multiplication: {
    [DIFFICULTY_LEVELS.EASY]: { min: 1, max: 10 },
    [DIFFICULTY_LEVELS.MEDIUM]: { min: 10, max: 20 },
    [DIFFICULTY_LEVELS.HARD]: { min: 20, max: 50 }
  },
  Division: {
    [DIFFICULTY_LEVELS.EASY]: { minDivisor: 1, maxDivisor: 5, minQuotient: 1, maxQuotient: 5 },
    [DIFFICULTY_LEVELS.MEDIUM]: { minDivisor: 5, maxDivisor: 10, minQuotient: 5, maxQuotient: 10 },
    [DIFFICULTY_LEVELS.HARD]: { minDivisor: 10, maxDivisor: 20, minQuotient: 10, maxQuotient: 20 }
  },
  Fractions: {
    [DIFFICULTY_LEVELS.EASY]: { maxNumerator: 5, maxDenominator: 5 },
    [DIFFICULTY_LEVELS.MEDIUM]: { maxNumerator: 8, maxDenominator: 8 },
    [DIFFICULTY_LEVELS.HARD]: { maxNumerator: 12, maxDenominator: 12 }
  },
  Geometry: {
    [DIFFICULTY_LEVELS.EASY]: { minSide: 1, maxSide: 10 },
    [DIFFICULTY_LEVELS.MEDIUM]: { minSide: 10, maxSide: 20 },
    [DIFFICULTY_LEVELS.HARD]: { minSide: 20, maxSide: 50 }
  },
  Factors: {
    [DIFFICULTY_LEVELS.EASY]: { min: 1, max: 20 },
    [DIFFICULTY_LEVELS.MEDIUM]: { min: 20, max: 50 },
    [DIFFICULTY_LEVELS.HARD]: { min: 50, max: 100 }
  }
};

const generateQuestion = (category, difficulty) => {
  const params = QUESTION_PARAMS[category][difficulty];
  let question = "";
  let answer = "";

  switch (category) {
    case "Multiplication":
      const a = Math.floor(Math.random() * (params.max - params.min + 1)) + params.min;
      const b = Math.floor(Math.random() * (params.max - params.min + 1)) + params.min;
      question = `What is ${a} × ${b}?`;
      answer = (a * b).toString();
      break;
    
    case "Division":
      const divisor = Math.floor(Math.random() * (params.maxDivisor - params.minDivisor + 1)) + params.minDivisor;
      const quotient = Math.floor(Math.random() * (params.maxQuotient - params.minQuotient + 1)) + params.minQuotient;
      const dividend = divisor * quotient;
      question = `What is ${dividend} ÷ ${divisor}?`;
      answer = quotient.toString();
      break;

    case "Fractions":
      const num1 = Math.floor(Math.random() * params.maxNumerator) + 1;
      const denom1 = Math.floor(Math.random() * params.maxDenominator) + 1;
      const num2 = Math.floor(Math.random() * params.maxNumerator) + 1;
      const denom2 = Math.floor(Math.random() * params.maxDenominator) + 1;
      
      const numerator = (num1 * denom2) + (num2 * denom1);
      const denominator = denom1 * denom2;
      
      // Function to find the greatest common divisor (GCD)
      const gcd = (a, b) => {
        while (b !== 0) {
          let temp = b;
          b = a % b;
          a = temp;
        }
        return a;
      };
      
      // Simplify the fraction
      const commonDivisor = gcd(numerator, denominator);
      const simplifiedNum = numerator / commonDivisor;
      const simplifiedDen = denominator / commonDivisor;
      
      question = `Solve: (${num1}/${denom1}) + (${num2}/${denom2})`;
      answer = simplifiedDen === 1 ? simplifiedNum.toString() : `${simplifiedNum}/${simplifiedDen}`;
      break;

    case "Geometry":
      const side = Math.floor(Math.random() * (params.maxSide - params.minSide + 1)) + params.minSide;
      question = `Find the perimeter of a square with side ${side} cm.`;
      answer = (4 * side).toString();
      break;

    case "Factors":
      const num = Math.floor(Math.random() * (params.max - params.min + 1)) + params.min;
      question = `List the factors of ${num}.`;
      answer = [...Array(num + 1).keys()].filter(i => num % i === 0).join(", ");
      break;

    default:
      question = "Unknown Question";
      answer = "?";
  }

  return { question, answer, difficulty, category };
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