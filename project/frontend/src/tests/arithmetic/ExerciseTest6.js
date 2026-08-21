import React, { useState } from "react";
import "./Exercise.css";
import { useNavigate } from "react-router-dom";

const categories = ["Algebra", "Statistics", "Decimal Fractions", "Ratios"];
const shapeNames = ["Circle", "Square", "Rectangle", "Triangle", "Hexagon", "Pentagon"];

// Difficulty levels
const DIFFICULTY_LEVELS = {
  EASY: 0,
  MEDIUM: 1,
  HARD: 2
};

// Question parameters for each category and difficulty
const QUESTION_PARAMS = {
  Algebra: {
    [DIFFICULTY_LEVELS.EASY]: { minNum: 1, maxNum: 5 },
    [DIFFICULTY_LEVELS.MEDIUM]: { minNum: 6, maxNum: 10 },
    [DIFFICULTY_LEVELS.HARD]: { minNum: 11, maxNum: 15 }
  },
  "Decimal Fractions": {
    [DIFFICULTY_LEVELS.EASY]: { range: 5, decimalPlaces: 1 },
    [DIFFICULTY_LEVELS.MEDIUM]: { range: 10, decimalPlaces: 2 },
    [DIFFICULTY_LEVELS.HARD]: { range: 20, decimalPlaces: 3 }
  },
  Statistics: {
    [DIFFICULTY_LEVELS.EASY]: { count: 3, maxNum: 20 },
    [DIFFICULTY_LEVELS.MEDIUM]: { count: 5, maxNum: 50 },
    [DIFFICULTY_LEVELS.HARD]: { count: 7, maxNum: 100 }
  },
  Ratios: {
    [DIFFICULTY_LEVELS.EASY]: { minNum: 10, maxNum: 30 },
    [DIFFICULTY_LEVELS.MEDIUM]: { minNum: 30, maxNum: 60 },
    [DIFFICULTY_LEVELS.HARD]: { minNum: 60, maxNum: 100 }
  }
};

const generateQuestion = (category, difficulty) => {
  const params = QUESTION_PARAMS[category][difficulty];
  let question = "";
  let answer = "";
  let options = [];

  switch (category) {
    case "Algebra":
      const num1 = Math.floor(Math.random() * (params.maxNum - params.minNum + 1)) + params.minNum;
      const num2 = Math.floor(Math.random() * (params.maxNum - params.minNum + 1)) + params.minNum;
      question = `Solve for x: ${num1}x = ${num1 * num2}`;
      answer = num2.toString();
      break;

    case "Decimal Fractions":
      const a = (Math.random() * params.range).toFixed(params.decimalPlaces);
      const b = (Math.random() * params.range).toFixed(params.decimalPlaces);
      question = `Multiply: ${a} × ${b}`;
      answer = (parseFloat(a) * parseFloat(b)).toFixed(params.decimalPlaces * 2);
      break;

    case "Statistics":
      const numbers = Array.from({ length: params.count }, () => 
        Math.floor(Math.random() * params.maxNum) + 1
      );
      question = `Find the mean of: ${numbers.join(", ")}`;
      answer = (numbers.reduce((acc, num) => acc + num, 0) / numbers.length).toFixed(2);
      break;

    case "Ratios":
      const n1 = Math.floor(Math.random() * (params.maxNum - params.minNum + 1)) + params.minNum;
      let n2 = Math.floor(Math.random() * (params.maxNum - params.minNum + 1)) + params.minNum;
      while (n2 === n1) { // Ensure different numbers
        n2 = Math.floor(Math.random() * (params.maxNum - params.minNum + 1)) + params.minNum;
      }
      const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
      const divisor = gcd(n1, n2);
      question = `Simplify the ratio: ${n1}:${n2}`;
      answer = `${n1 / divisor}:${n2 / divisor}`;
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