import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import UserForm from "./components/UserForm";
import Homepage from './components/Homepage';
import CategoriesPage from "./components/CategoriesPage";
import ArithmeticQuiz from "./tests/arithmetic/ArithmeticQuiz";
import GrammarQuiz from "./tests/grammar/GrammarQuiz";
import ReadingTest from "./tests/reading/ReadingTest";
import MemoryTest from "./tests/memory/MemoryTest";

import Quiz1 from "./tests/arithmetic/Quiz1";
import Quiz2 from "./tests/arithmetic/Quiz2";
import Quiz3 from "./tests/arithmetic/Quiz3";
import Quiz4 from "./tests/arithmetic/Quiz4";
import Quiz5 from "./tests/arithmetic/Quiz5";
import Quiz6 from "./tests/arithmetic/Quiz6";
import Quiz7 from "./tests/arithmetic/Quiz7";
import MathTheory from "./tests/arithmetic/MathTheory";
import MathTheory6 from "./tests/arithmetic/MathTheory6";
import MathTheory3 from "./tests/arithmetic/MathTheory3";
import MathTheory4 from "./tests/arithmetic/MathTheory4";
import MathTheory7 from "./tests/arithmetic/MathTheory7";
import Theory1 from "./tests/arithmetic/Theory1";
import Theory2 from "./tests/arithmetic/Theory2"; // New MathTheory6 page
import Exercise from "./tests/arithmetic/Exercise";
import Exercise2 from "./tests/arithmetic/Exercise2";
import Exercise4 from "./tests/arithmetic/Exercise4";
import ExerciseTest from "./tests/arithmetic/ExerciseTest";
import ExerciseTest3 from "./tests/arithmetic/ExerciseTest3";
import ExerciseTest6 from "./tests/arithmetic/ExerciseTest6";
import ExerciseTest7 from "./tests/arithmetic/ExerciseTest7"; // Added ExerciseTest6 for MathTheory6
import GQuiz1 from "./tests/grammar/Quiz1";
import GQuiz2 from "./tests/grammar/Quiz2";
import GQuiz3 from "./tests/grammar/Quiz3";
import GQuiz4 from "./tests/grammar/Quiz4";
import GQuiz5 from "./tests/grammar/Quiz5";
import GQuiz6 from "./tests/grammar/Quiz6";
import GQuiz7 from "./tests/grammar/Quiz7";
import LearningModule from "./tests/grammar/LearningModule";
import LearningModule2 from "./tests/grammar/LearningModule2";
import LearningModule3 from "./tests/grammar/LearningModule3";
import LearningModule4 from "./tests/grammar/LearningModule4";
import LearningModule5 from "./tests/grammar/LearningModule5";
import LearningModule6 from "./tests/grammar/LearningModule6";
import LearningModule7 from "./tests/grammar/LearningModule7";
import GExercise from "./tests/grammar/Exercise";
import GExercise2 from "./tests/grammar/Exercisee2";
import GExercise3 from "./tests/grammar/Exercise3";
import GExercise4 from "./tests/grammar/Exercise4";
import GExercise5 from "./tests/grammar/Exercise5";
import GExercise6 from "./tests/grammar/Exercise6";
import GExercise7 from "./tests/grammar/Exercise7";
function App() {
  const navigate = useNavigate();

  useEffect(() => {
      // Handle initial hash-based routing
      const handleHashChange = () => {
          const path = window.location.hash.substring(1);
          if (path) {
              navigate(path);
          }
      };

      window.addEventListener('hashchange', handleHashChange);
      handleHashChange(); // Check initial hash

      return () => {
          window.removeEventListener('hashchange', handleHashChange);
      };
  }, [navigate]);
  

    return (
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/userform" element={<UserForm />} />
                <Route path="/test/arithmetic/:grade" element={<ArithmeticQuiz />} />
                <Route path="/test/grammar/:grade" element={<GrammarQuiz />} />
                <Route path="/reading/:grade" element={<ReadingTest />} />
                <Route path="/tests" element={<CategoriesPage />} />
                <Route path="/memory" element={<MemoryTest />} />
                <Route path="/arithmetic/1" element={<Quiz1 />} />
                <Route path="/arithmetic/2" element={<Quiz2 />} />
                <Route path="/arithmetic/3" element={<Quiz3 />} />
                <Route path="/arithmetic/4" element={<Quiz4 />} />
                <Route path="/arithmetic/5" element={<Quiz5 />} />
                <Route path="/arithmetic/6" element={<Quiz6 />} />
                <Route path="/arithmetic/7" element={<Quiz7 />} />
                <Route path="/exercise" element={<Exercise />} />
                <Route path="/maththeory" element={<MathTheory />} />
                <Route path="/maththeory6" element={<MathTheory6 />} /> {/* Added MathTheory6 route */}
                <Route path="/theory1" element={<Theory1 />} />
                <Route path="/theory2" element={<Theory2 />} />
                <Route path="/exercise/3" element={<ExerciseTest3 />} />
                <Route path="/exercise/4" element={<Exercise4 />} />
                <Route path="/maththeory3" element={<MathTheory3 />} />
                <Route path="/maththeory4" element={<MathTheory4 />} />
                <Route path="/maththeory7" element={<MathTheory7 />} />

                {/* Exercise Test Routes */}
                <Route path="/exercise-test" element={<ExerciseTest />} />
                <Route path="/exercise-test6" element={<ExerciseTest6 />} /> 
                <Route path="/exercise-test7" element={<ExerciseTest7 />} />{/* Added new route */}
                <Route path="/exercise" element={<Exercise />} />
                <Route path="/exercise2" element={<Exercise2 />} /> 
                <Route path="/grammar/1" element={<GQuiz1 />} />
                <Route path="/grammar/2" element={<GQuiz2 />} />
                <Route path="/grammar/3" element={<GQuiz3 />} />
                <Route path="/grammar/4" element={<GQuiz4 />} />
                <Route path="/grammar/5" element={<GQuiz5 />} />
                <Route path="/grammar/6" element={<GQuiz6 />} />
                <Route path="/grammar/7" element={<GQuiz7 />} />   
                <Route path="/learning-module" element={<LearningModule />} />
                <Route path="/learning-module2" element={<LearningModule2 />} />
                <Route path="/learning-module3" element={<LearningModule3 />} />
                <Route path="/learning-module4" element={<LearningModule4 />} />
                <Route path="/learning-module5" element={<LearningModule5 />} />
                <Route path="/learning-module6" element={<LearningModule6 />} />
                <Route path="/learning-module7" element={<LearningModule7 />} />
                <Route path="/exercise1" element={<GExercise />} />
                <Route path="/exercisee2" element={<GExercise2 />} />
                <Route path="/exercise3" element={<GExercise3 />} />
                <Route path="/exercise4" element={<GExercise4 />} />
                <Route path="/exercise5" element={<GExercise5 />} />
                <Route path="/exercise6" element={<GExercise6 />} />
                <Route path="/exercise7" element={<GExercise7 />} />    
                <Route path="*" element={<Homepage />} />                       
            </Routes>
    );
}

export default App;
