import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LearningModule.css";

const topics = [
    {
        title: "Nouns",
        content: (
            <div>
                <h2>📌 Nouns</h2>
                <p>A noun is a word that names a person, place, thing, or idea.</p>
                <h3>Types of Nouns:</h3>
                <ul>
                    <li><strong>Common Nouns</strong>: dog, city, book</li>
                    <li><strong>Proper Nouns</strong>: Charlie, New York, Harry Potter</li>
                    <li><strong>Singular Nouns</strong>: cat, tree, house</li>
                    <li><strong>Plural Nouns</strong>: cats, trees, houses</li>
                    <li><strong>Gender Nouns</strong>: actor (male), actress (female)</li>
                </ul>
                <h3>Examples:</h3>
                <p>1. The <strong>dog</strong> is barking loudly.</p>
                <p>2. <strong>Sarah</strong> loves reading books.</p>
                <p>3. There are many <strong>apples</strong> on the tree.</p>
            </div>
        ),
    },
    {
        title: "Pronouns",
        content: (
            <div>
                <h2>📌 Pronouns</h2>
                <p>Pronouns replace nouns to avoid repetition.</p>
                <ul>
                    <li><strong>Personal Pronouns</strong>: I, you, he, she, it, we, they</li>
                    <li><strong>Possessive Pronouns</strong>: mine, yours, his, hers, ours, theirs</li>
                    <li><strong>Demonstrative Pronouns</strong>: this, that, these, those</li>
                </ul>
                <h3>Examples:</h3>
                <p>1. <strong>She</strong> is my best friend.</p>
                <p>2. This book is <strong>mine</strong>.</p>
                <p>3. <strong>They</strong> are going to the park.</p>
            </div>
        ),
    },
    {
        title: "Verbs",
        content: (
            <div>
                <h2>📌 Verbs</h2>
                <p>Verbs show actions or states of being.</p>
                <h3>Types of Verbs:</h3>
                <ul>
                    <li><strong>Simple Present</strong>: run, eat, play</li>
                    <li><strong>Simple Past</strong>: ran, ate, played</li>
                </ul>
                <h3>Examples:</h3>
                <p>1. He <strong>runs</strong> every morning.</p>
                <p>2. She <strong>ate</strong> her lunch quickly.</p>
                <p>3. They <strong>played</strong> soccer yesterday.</p>
            </div>
        ),
    },
    {
        title: "Adjectives",
        content: (
            <div>
                <h2>📌 Adjectives</h2>
                <p>Adjectives describe nouns.</p>
                <ul>
                    <li><strong>Examples</strong>: big house, red apple, happy child</li>
                </ul>
                <h3>Examples:</h3>
                <p>1. The <strong>tall</strong> building is in the city.</p>
                <p>2. She has a <strong>beautiful</strong> dress.</p>
                <p>3. The <strong>angry</strong> dog barked loudly.</p>
            </div>
        ),
    },
    {
        title: "Sentences",
        content: (
            <div>
                <h2>📌 Sentences</h2>
                <p>A sentence is a group of words that expresses a complete thought.</p>
                <h3>Types of Sentences:</h3>
                <ul>
                    <li><strong>Declarative</strong>: I love pizza.</li>
                    <li><strong>Interrogative</strong>: Do you like pizza?</li>
                    <li><strong>Exclamatory</strong>: Wow! That pizza is amazing!</li>
                </ul>
                <h3>Examples:</h3>
                <p>1. The sun is shining brightly. (Declarative)</p>
                <p>2. Where is my book? (Interrogative)</p>
                <p>3. Oh no! I forgot my homework! (Exclamatory)</p>
            </div>
        ),
    },
    {
        title: "Punctuation",
        content: (
            <div>
                <h2>📌 Punctuation</h2>
                <p>Punctuation marks help us write clearly and correctly.</p>
                <ul>
                    <li><strong>Period (.)</strong>: Used at the end of a sentence.</li>
                    <li><strong>Question Mark (?)</strong>: Used in a question.</li>
                    <li><strong>Exclamation Mark (!)</strong>: Shows excitement or surprise.</li>
                    <li><strong>Comma (,)</strong>: Used to separate ideas.</li>
                </ul>
                <h3>Examples:</h3>
                <p>1. I like ice cream. (Period)</p>
                <p>2. Where are you going? (Question Mark)</p>
                <p>3. Wow! That was amazing! (Exclamation Mark)</p>
                <p>4. I bought apples, bananas, and oranges. (Comma)</p>
            </div>
        ),
    },
];

const LearningModule3 = () => {
    const [currentTopic, setCurrentTopic] = useState(0);
    const navigate = useNavigate();

    return (
        <div className="learning-container">
            <h1>📚 Learn English Grammar! 📚</h1>
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
                <button onClick={() => navigate("/exercise3")}>Take Test</button>
            </div>
        </div>
    );
};

export default LearningModule3;