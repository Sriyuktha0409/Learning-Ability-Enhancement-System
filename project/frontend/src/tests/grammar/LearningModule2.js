import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LearningModule.css";

const topics = [
    {
        title: "Nouns",
        content: (
            <div>
                <p><strong>What is a Noun?</strong></p>
                <p>A noun is a word that names a person, place, thing, or idea. 🏡👦📚</p>
                <img src="https://via.placeholder.com/300" alt="Noun Examples" />
                <p><strong>Examples:</strong></p>
                <ul>
                    <li><strong>Person:</strong> 👩‍🏫 Teacher, 👦 Boy, 👩‍⚕️ Doctor</li>
                    <li><strong>Place:</strong> 🏫 School, 🏡 Home, 🌎 Earth</li>
                    <li><strong>Thing:</strong> 📖 Book, 🏀 Ball, 🚗 Car</li>
                    <li><strong>Idea:</strong> 💡 Knowledge, 🕊️ Peace, ❤️ Love</li>
                </ul>
            </div>
        ),
    },
    {
        title: "Pronouns",
        content: (
            <div>
                <p><strong>What is a Pronoun?</strong></p>
                <p>A pronoun is a word that replaces a noun. It makes sentences shorter and easier to read. 🤩</p>
                <img src="https://via.placeholder.com/300" alt="Pronoun Examples" />
                <p><strong>Examples:</strong></p>
                <ul>
                    <li><strong>I</strong> am happy.</li>
                    <li><strong>You</strong> are my friend.</li>
                    <li><strong>He</strong> is a doctor.</li>
                    <li><strong>She</strong> loves to dance.</li>
                    <li><strong>It</strong> is a cat.</li>
                    <li><strong>They</strong> are playing football.</li>
                </ul>
            </div>
        ),
    },
    {
        title: "Verbs",
        content: (
            <div>
                <p><strong>What is a Verb?</strong></p>
                <p>A verb is a word that shows an action or a state of being. 🏃‍♂️🎤</p>
                <img src="https://via.placeholder.com/300" alt="Verb Examples" />
                <p><strong>Examples:</strong></p>
                <ul>
                    <li><strong>Action Verbs:</strong> Run 🏃, Jump 🤾, Sing 🎤, Eat 🍔</li>
                    <li><strong>State of Being Verbs:</strong> Am, Is, Are, Was, Were</li>
                </ul>
            </div>
        ),
    },
    {
        title: "Adjectives",
        content: (
            <div>
                <p><strong>What is an Adjective?</strong></p>
                <p>An adjective describes a noun or a pronoun. It tells us about quality, size, color, etc. 🎨✨</p>
                <img src="https://via.placeholder.com/300" alt="Adjective Examples" />
                <p><strong>Examples:</strong></p>
                <ul>
                    <li><strong>Big</strong> elephant 🐘</li>
                    <li><strong>Small</strong> mouse 🐭</li>
                    <li><strong>Beautiful</strong> butterfly 🦋</li>
                    <li><strong>Happy</strong> child 😀</li>
                </ul>
            </div>
        ),
    },
    {
        title: "Articles",
        content: (
            <div>
                <p><strong>What are Articles?</strong></p>
                <p>Articles are words that define a noun as specific or unspecific. They are: <strong>A, An, The</strong>.</p>
                <img src="https://via.placeholder.com/300" alt="Article Examples" />
                <p><strong>Examples:</strong></p>
                <ul>
                    <li><strong>A</strong> dog 🐶 (used before consonant sounds)</li>
                    <li><strong>An</strong> apple 🍏 (used before vowel sounds)</li>
                    <li><strong>The</strong> sun ☀️ (used for specific things)</li>
                </ul>
            </div>
        ),
    },
];

const LearningModule2 = () => {
    const [currentTopic, setCurrentTopic] = useState(0);
    const navigate = useNavigate();

    return (
        <div className="learning-container">
            <h1>📘 Learn Grammar Concepts! 📘</h1>
            <div className="topic-selector">
                {topics.map((topic, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentTopic(index)}
                        className={currentTopic === index ? "active" : ""}
                    >
                        {topic.title}
                    </button>
                ))}
            </div>
            <div className="topic-content">{topics[currentTopic].content}</div>

            {/* "Take Test" button */}
            <div className="test-button">
                <button onClick={() => navigate("/exercisee2")}>Take Test</button>
            </div>
        </div>
    );
};

export default LearningModule2;