import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LearningModule.css";

const topics = [
    {
        title: "Alphabets",
        content: (
            <div>
                <p>The English alphabet has 26 letters from A to Z. 🅰️➡️🔤</p>
                <p>Here are all the letters with examples:</p>
                <h2>A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</h2>
                <p><strong>Examples for Each Letter:</strong></p>
                <ul>
                    {[
                        ["A", "🍎 Apple"],
                        ["B", "🏀 Ball"],
                        ["C", "🐱 Cat"],
                        ["D", "🐶 Dog"],
                        ["E", "🥚 Egg"],
                        ["F", "🐸 Frog"],
                        ["G", "🍇 Grapes"],
                        ["H", "🏡 House"],
                        ["I", "🍦 Ice Cream"],
                        ["J", "🍊 Juice"],
                        ["K", "🦘 Kangaroo"],
                        ["L", "🦁 Lion"],
                        ["M", "🎶 Music"],
                        ["N", "🌃 Night"],
                        ["O", "🐙 Octopus"],
                        ["P", "🎁 Present"],
                        ["Q", "👑 Queen"],
                        ["R", "🌈 Rainbow"],
                        ["S", "☀️ Sun"],
                        ["T", "🌳 Tree"],
                        ["U", "☔ Umbrella"],
                        ["V", "🎻 Violin"],
                        ["W", "🍉 Watermelon"],
                        ["X", "🎵 Xylophone"],
                        ["Y", "🍋 Yellow Lemon"],
                        ["Z", "🦓 Zebra"],
                    ].map(([letter, example]) => (
                        <li key={letter}>
                            <strong>{letter}</strong> - {example}
                        </li>
                    ))}
                </ul>
            </div>
        ),
    },
    {
        title: "Vowels",
        content: (
            <div>
                <p>There are 5 vowels in the English alphabet: A, E, I, O, U. 🔤</p>
                <p>Vowels help us form words and make sounds.</p>
                <p><strong>Examples:</strong></p>
                <ul>
                    {[
                        ["A", "🍏 Apple"],
                        ["E", "🥚 Egg"],
                        ["I", "🍦 Ice Cream"],
                        ["O", "🍊 Orange"],
                        ["U", "☔ Umbrella"],
                    ].map(([letter, example]) => (
                        <li key={letter}>
                            <strong>{letter}</strong> - {example}
                        </li>
                    ))}
                </ul>
            </div>
        ),
    },
    {
        title: "Consonants",
        content: (
            <div>
                <p>All the other letters in the alphabet, except vowels, are called consonants. 🔤</p>
                <p>There are 21 consonants: B, C, D, F, G, H, J, K, L, M, N, P, Q, R, S, T, V, W, X, Y, Z.</p>
                <p><strong>Examples:</strong></p>
                <ul>
                    {[
                        ["B", "🏀 Ball"],
                        ["C", "🐈 Cat"],
                        ["D", "🐶 Dog"],
                        ["T", "🌳 Tree"],
                    ].map(([letter, example]) => (
                        <li key={letter}>
                            <strong>{letter}</strong> - {example}
                        </li>
                    ))}
                </ul>
            </div>
        ),
    },
    {
        title: "Singular & Plural",
        content: (
            <div>
                <p>Singular means one, while plural means more than one. ➕</p>
                <p>
                    To make a noun plural, we usually add <strong>-s</strong> or <strong>-es</strong>, but some words
                    change completely!
                </p>
                <p><strong>Examples:</strong></p>
                <ul>
                    {[
                        ["Cat", "Cats 🐱"],
                        ["Dog", "Dogs 🐶"],
                        ["Bus", "Buses 🚌"],
                        ["Child", "Children 👦👧"],
                        ["Mouse", "Mice 🐭"],
                        ["Leaf", "Leaves 🍂"],
                        ["Goose", "Geese 🦢"],
                        ["Tooth", "Teeth 😁"],
                    ].map(([singular, plural]) => (
                        <li key={singular}>
                            <strong>{singular}</strong> ➡️ <strong>{plural}</strong>
                        </li>
                    ))}
                </ul>
            </div>
        ),
    },
];

const LearningModule = () => {
    const [currentTopic, setCurrentTopic] = useState(0);
    const navigate = useNavigate(); // Hook for navigation

    return (
        <div className="learning-container">
            <h1>📚 Learn English Basics! 📚</h1>

            {/* Topic Selection */}
            <div className="topic-selector">
                {topics.map((topic, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentTopic(index)}
                        className={currentTopic === index ? "active" : ""}
                        aria-label={`Learn about ${topic.title}`}
                    >
                        {topic.title}
                    </button>
                ))}
            </div>

            {/* Topic Content */}
            <div className="topic-content">{topics[currentTopic].content}</div>

            {/* "Take Test" button */}
            <div className="test-button">
            <button onClick={() => navigate("/exercise1")}>Take Test</button>

            </div>
        </div>
    );
};

export default LearningModule;
