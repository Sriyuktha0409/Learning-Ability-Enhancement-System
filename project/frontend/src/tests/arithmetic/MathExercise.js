import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const categories = ["multiplication", "division", "fractions", "decimals", "geometry", "factors"];
const performance = categories.reduce((acc, cat) => {
    acc[cat] = { easy: 0, medium: 0, hard: 0 };
    return acc;
}, {});

const generateQuestion = (category, difficulty) => {
    let a, b, c, d;
    switch (category) {
        case "multiplication":
            a = Math.floor(Math.random() * 20) + 1;
            b = Math.floor(Math.random() * 20) + 1;
            return { question: `${a} x ${b} = ?`, answer: a * b };
        case "division":
            b = Math.floor(Math.random() * 20) + 1;
            a = b * (Math.floor(Math.random() * 20) + 1);
            return { question: `${a} / ${b} = ?`, answer: a / b };
        case "fractions":
            a = Math.floor(Math.random() * 10) + 1;
            b = Math.floor(Math.random() * 10) + 1;
            c = Math.floor(Math.random() * 10) + 1;
            d = Math.floor(Math.random() * 10) + 1;
            return { question: `${a}/${b} + ${c}/${d} = ?`, answer: `${(a * d + b * c)}/${b * d}` };
        case "decimals":
            a = (Math.random() * 10).toFixed(2);
            b = (Math.random() * 10).toFixed(2);
            return { question: `${a} + ${b} = ?`, answer: (parseFloat(a) + parseFloat(b)).toFixed(2) };
        case "geometry":
            return { question: "What is the number of sides in a hexagon?", answer: 6 };
        case "factors":
            a = Math.floor(Math.random() * 50) + 10;
            const factors = [...Array(a + 1).keys()].filter(i => i > 0 && a % i === 0);
            return { question: `What are the factors of ${a}?`, answer: factors.join(", ") };
        default:
            return { question: "", answer: "" };
    }
};

const MathExercise = () => {
    const [questionSet, setQuestionSet] = useState([]);
    const [showQuestions, setShowQuestions] = useState(false);
    
    const startExercise = () => {
        let questions = [];
        for (let i = 0; i < 10; i++) {
            let category = categories[Math.floor(Math.random() * categories.length)];
            let difficulty = "easy";
            if (performance[category].easy > 2) difficulty = "medium";
            if (performance[category].medium > 2) difficulty = "hard";
            questions.push(generateQuestion(category, difficulty));
        }
        setQuestionSet(questions);
        setShowQuestions(true);
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Math Learning & Reinforcement Exercise</h2>
            <p className="mb-2">Learn about multiplication, division, fractions, decimals, geometry, and factors.</p>
            <p className="mb-4">Reinforcement learning dynamically adjusts difficulty based on your performance.</p>
            {!showQuestions ? (
                <Button onClick={startExercise} className="bg-blue-500 text-white px-4 py-2 rounded">Take Exercise</Button>
            ) : (
                <div>
                    {questionSet.map((q, index) => (
                        <Card key={index} className="mb-4 p-4 shadow-lg">
                            <CardContent>
                                <p className="text-lg font-semibold">{q.question}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
            <Progress value={Math.min(Object.values(performance).reduce((acc, val) => acc + val.easy + val.medium + val.hard, 0) * 10, 100)} className="mt-4" />
        </div>
    );
};

export default MathExercise;
