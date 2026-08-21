import React, { useState } from "react";
import "./Exercise.css";
import { useNavigate } from "react-router-dom";

const categories = ["Multiplication", "Division", "Fractions", "Decimals", "Geometry", "Measurement"];

// Difficulty levels
const DIFFICULTY_LEVELS = {
  EASY: 0,
  MEDIUM: 1,
  HARD: 2
};

// Question parameters for each category and difficulty
const QUESTION_PARAMS = {
  Multiplication: {
    [DIFFICULTY_LEVELS.EASY]: { min1: 2, max1: 20, min2: 2, max2: 20 },
    [DIFFICULTY_LEVELS.MEDIUM]: { min1: 21, max1: 50, min2: 21, max2: 50 },
    [DIFFICULTY_LEVELS.HARD]: { min1: 51, max1: 90, min2: 51, max2: 90 }
  },
  Division: {
    [DIFFICULTY_LEVELS.EASY]: { minDivisor: 2, maxDivisor: 4, minQuotient: 2, maxQuotient: 4 },
    [DIFFICULTY_LEVELS.MEDIUM]: { minDivisor: 4, maxDivisor: 7, minQuotient: 4, maxQuotient: 7 },
    [DIFFICULTY_LEVELS.HARD]: { minDivisor: 6, maxDivisor: 10, minQuotient: 6, maxQuotient: 10 }
  },
  Fractions: {
    [DIFFICULTY_LEVELS.EASY]: { maxDenominator: 5 },
    [DIFFICULTY_LEVELS.MEDIUM]: { maxDenominator: 8 },
    [DIFFICULTY_LEVELS.HARD]: { maxDenominator: 12 }
  },
  Decimals: {
    [DIFFICULTY_LEVELS.EASY]: { range: 5, decimalPlaces: 1 },
    [DIFFICULTY_LEVELS.MEDIUM]: { range: 10, decimalPlaces: 2 },
    [DIFFICULTY_LEVELS.HARD]: { range: 20, decimalPlaces: 3 }
  },
  Geometry: {
    [DIFFICULTY_LEVELS.EASY]: { angles: [30, 45, 60, 90] },
    [DIFFICULTY_LEVELS.MEDIUM]: { angles: [90, 120, 150] },
    [DIFFICULTY_LEVELS.HARD]: { angles: [15, 75, 105, 135, 165] }
  },
  Measurement: {
    [DIFFICULTY_LEVELS.EASY]: { range: 10, units: ["cm to mm", "m to cm"] },
    [DIFFICULTY_LEVELS.MEDIUM]: { range: 100, units: ["m to cm", "kg to g"] },
    [DIFFICULTY_LEVELS.HARD]: { range: 1000, units: ["kg to g", "L to mL"] }
  }
};

const CONVERSIONS = { 
  "cm to mm": 10, 
  "m to cm": 100, 
  "kg to g": 1000, 
  "L to mL": 1000 
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

  const generateUniqueQuestion = (category, difficulty) => {
    let question, answer, options = [];
    let attempt = 0;
    const maxAttempts = 100;
    
    do {
      attempt++;
      if (attempt > maxAttempts) break;
      
      const params = QUESTION_PARAMS[category][difficulty];
      
      switch (category) {
        case "Multiplication":
          const factor1 = Math.floor(Math.random() * (params.max1 - params.min1 + 1)) + params.min1;
          const factor2 = Math.floor(Math.random() * (params.max2 - params.min2 + 1)) + params.min2;
          question = `What is ${factor1} × ${factor2}?`;
          answer = (factor1 * factor2).toString();
          break;

        case "Division":
          const divisor = Math.floor(Math.random() * (params.maxDivisor - params.minDivisor + 1)) + params.minDivisor;
          const quotient = Math.floor(Math.random() * (params.maxQuotient - params.minQuotient + 1)) + params.minQuotient;
          const dividend = divisor * quotient;
          question = `What is ${dividend} ÷ ${divisor}?`;
          answer = quotient.toString();
          break;

        case "Fractions":
          const denominator = Math.floor(Math.random() * (params.maxDenominator - 2 + 1)) + 2;
          const num1 = Math.floor(Math.random() * denominator) + 1;
          const num2 = Math.floor(Math.random() * denominator) + 1;
          question = `Add: ${num1}/${denominator} + ${num2}/${denominator} = ?`;
          
          const gcd = (a, b) => b ? gcd(b, a % b) : a;
          const sumNum = num1 + num2;
          const commonDivisor = gcd(sumNum, denominator);
          answer = commonDivisor === denominator ? 
                   (sumNum / denominator).toString() : 
                   `${sumNum/commonDivisor}/${denominator/commonDivisor}`;
          break;

        case "Decimals":
          const n1 = (Math.random() * params.range).toFixed(params.decimalPlaces);
          const n2 = (Math.random() * params.range).toFixed(params.decimalPlaces);
          question = `Add: ${num1} + ${num2} = ?`;
          answer = (parseFloat(n1) + parseFloat(n2)).toFixed(params.decimalPlaces);
          break;

        case "Geometry":
          const angle = params.angles[Math.floor(Math.random() * params.angles.length)];
          question = `What type of angle is ${angle}°?`;
          options = ["Acute", "Right", "Obtuse"];
          answer = angle < 90 ? "Acute" : angle === 90 ? "Right" : "Obtuse";
          break;

        case "Measurement":
          const unit = params.units[Math.floor(Math.random() * params.units.length)];
          const value = Math.floor(Math.random() * params.range) + 1;
          question = `Convert: ${value} ${unit} = ?`;
          answer = (value * CONVERSIONS[unit]).toString();
          break;

        default:
          const f1 = Math.floor(Math.random() * 5) + 2;
          const f2 = Math.floor(Math.random() * 5) + 2;
          question = `What is ${f1} × ${f2}?`;
          answer = (f1 * f2).toString();
      }
    } while (usedQuestions.has(question) && attempt <= maxAttempts);

    setUsedQuestions(prev => new Set(prev).add(question));
    
    return { question, answer, options, difficulty, category };
  };

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
      initialQuestions.push(generateUniqueQuestion(category, DIFFICULTY_LEVELS.EASY));
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
    const newQuestion = generateUniqueQuestion(selectedCategory, currentDifficulty);
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

                  {selectedCategory === "Geometry" ? (
                    <div className="options-container">
                      {questions[currentQuestionIndex].options.map((option, i) => (
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