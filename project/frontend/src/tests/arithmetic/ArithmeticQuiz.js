import { useParams } from "react-router-dom";
import Quiz1 from "./Quiz1";
import Quiz2 from "./Quiz2";
import Quiz3 from "./Quiz3";
import Quiz4 from "./Quiz4";
import Quiz5 from "./Quiz5";
import Quiz6 from "./Quiz6";
import Quiz7 from "./Quiz7";

const ArithmeticQuiz = () => {
    const { grade } = useParams();

    const quizzes = {
        "1": <Quiz1 />,
        "2": <Quiz2 />,
        "3": <Quiz3 />,
        "4": <Quiz4 />,
        "5": <Quiz5 />,
        "6": <Quiz6 />,
        "7": <Quiz7 />
    };

    return quizzes[grade] || <h2>Invalid Grade</h2>;
};

export default ArithmeticQuiz;
