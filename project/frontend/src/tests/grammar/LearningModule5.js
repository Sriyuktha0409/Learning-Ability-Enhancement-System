import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LearningModule.css";

const topics = [
    {
        title: "Nouns",
        content: (
            <div>
                <p>Nouns are words that name people, places, things, or ideas.</p>
                <p><strong>Types of Nouns:</strong></p>
                <ul>
                    <li><strong>Common Nouns</strong>: dog, city, car</li>
                    <li><strong>Proper Nouns</strong>: Max, New York, Toyota</li>
                    <li><strong>Singular & Plural</strong>: cat ➡️ cats, child ➡️ children</li>
                    <li><strong>Collective Nouns</strong>: team, herd, flock</li>
                    <li><strong>Abstract Nouns</strong>: happiness, bravery, freedom</li>
                </ul>
            </div>
        ),
    },
    {
        title: "Verbs",
        content: (
            <div>
                <p>Verbs show actions or states of being.</p>
                <p><strong>Examples:</strong></p>
                <ul>
                    <li>Action Verbs: run, jump, eat</li>
                    <li>Helping Verbs: is, am, are, was, were</li>
                    <li>Past & Present: walked, walks, will walk</li>
                    <li>Irregular Verbs: go ➡️ went, eat ➡️ ate</li>
                </ul>
            </div>
        ),
    },
    {
        title: "Adjectives & Adverbs",
        content: (
            <div>
                <p><strong>Adjectives</strong> describe nouns (size, color, quantity).</p>
                <p><strong>Adverbs</strong> describe verbs, adjectives, or other adverbs.</p>
                <p><strong>Examples:</strong></p>
                <ul>
                    <li>Adjective: The <strong>blue</strong> sky.</li>
                    <li>Adverb: She ran <strong>quickly</strong>.</li>
                    <li>Comparative Adjective: This book is <strong>better</strong> than that one.</li>
                    <li>Superlative Adverb: He runs <strong>fastest</strong> in the class.</li>
                </ul>
            </div>
        ),
    },
    {
        title: "Prepositions & Conjunctions",
        content: (
            <div>
                <p><strong>Prepositions</strong> show relationships between words.</p>
                <p><strong>Conjunctions</strong> join words or groups of words.</p>
                <p><strong>Examples:</strong></p>
                <ul>
                    <li>Prepositions: in, on, under, between, beside</li>
                    <li>Conjunctions: and, but, or, because, although</li>
                    <li>Prepositional Phrase: "The book is <strong>on the table</strong>." </li>
                </ul>
            </div>
        ),
    },
    {
        title: "Tenses & Sentence Structure",
        content: (
            <div>
                <p><strong>Tenses</strong> tell us when an action happens.</p>
                <p><strong>Sentence Structure</strong> is how we organize words in a sentence.</p>
                <p><strong>Examples:</strong></p>
                <ul>
                    <li>Past: She <strong>played</strong> outside.</li>
                    <li>Present: She <strong>plays</strong> outside.</li>
                    <li>Future: She <strong>will play</strong> outside.</li>
                    <li>Simple Sentence: "I love reading."</li>
                    <li>Compound Sentence: "I love reading, and I enjoy writing."</li>
                    <li>Complex Sentence: "Although I was tired, I finished my homework."</li>
                </ul>
            </div>
        ),
    },
    {
        title: "Punctuation",
        content: (
            <div>
                <p>Punctuation marks help structure sentences correctly.</p>
                <p><strong>Examples:</strong></p>
                <ul>
                    <li>Period (.): Ends a sentence.</li>
                    <li>Comma (,): Separates parts of a sentence.</li>
                    <li>Question Mark (?): Used for questions.</li>
                    <li>Exclamation Mark (!): Expresses strong emotion.</li>
                    <li>Quotation Marks (""): Used for direct speech.</li>
                </ul>
            </div>
        ),
    },
];

const LearningModule5 = () => {
    const [currentTopic, setCurrentTopic] = useState(0);
    const navigate = useNavigate();

    return (
        <div className="learning-container">
            <h1>📚 Learn Advanced English Grammar! 📚</h1>
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

            <div className="test-button">
                <button onClick={() => navigate("/exercise5")}>Take Test</button>
            </div>
        </div>
    );
};

export default LearningModule5;