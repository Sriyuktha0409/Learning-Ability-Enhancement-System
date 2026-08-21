import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LearningModule.css";

const topics = [
    {
        title: "Parts of Speech",
        content: (
            <div>
                <p>Parts of speech are the basic building blocks of English grammar. 🏗️</p>
                <ul>
                    <li><strong>Noun:</strong> Names a person, place, or thing.</li>
                    <p>Examples: <em>John, school, happiness, dog</em></p>
                    
                    <li><strong>Pronoun:</strong> Replaces a noun.</li>
                    <p>Examples: <em>he, she, they, it, we</em></p>
                    
                    <li><strong>Verb:</strong> Shows an action or state.</li>
                    <p>Examples: <em>run, is, jump, write</em></p>
                    
                    <li><strong>Adjective:</strong> Describes a noun.</li>
                    <p>Examples: <em>beautiful, large, smart, funny</em></p>
                    
                    <li><strong>Adverb:</strong> Describes a verb.</li>
                    <p>Examples: <em>quickly, loudly, softly, always</em></p>
                    
                    <li><strong>Preposition:</strong> Shows position or relation.</li>
                    <p>Examples: <em>on, in, under, beside</em></p>
                    
                    <li><strong>Conjunction:</strong> Joins words or sentences.</li>
                    <p>Examples: <em>and, but, or, so</em></p>
                    
                    <li><strong>Interjection:</strong> Expresses emotions.</li>
                    <p>Examples: <em>Wow! Oops! Oh no!</em></p>
                </ul>
            </div>
        ),
    },
    {
        title: "Sentence Structure",
        content: (
            <div>
                <p>Every sentence has a structure. Learn how to build correct sentences! 🏗️</p>
                <ul>
                    <li><strong>Subject:</strong> The person or thing doing the action.</li>
                    <li><strong>Predicate:</strong> The action being performed.</li>
                    <li><strong>Object:</strong> The thing receiving the action.</li>
                </ul>
                <p><strong>Examples:</strong></p>
                <p>1. <em>The cat (subject) sleeps (predicate).</em></p>
                <p>2. <em>Sarah (subject) reads (predicate) a book (object).</em></p>
                <p>3. <em>The teacher (subject) gave (predicate) the student (object) a prize.</em></p>
            </div>
        ),
    },
    {
        title: "Tenses",
        content: (
            <div>
                <p>Tenses tell us when an action happens! ⏳</p>
                <ul>
                    <li><strong>Past Tense:</strong> Action happened before.</li>
                    <p>Examples: <em>She <u>went</u> to the market. He <u>played</u> soccer.</em></p>
                    
                    <li><strong>Present Tense:</strong> Action happening now.</li>
                    <p>Examples: <em>She <u>goes</u> to school. He <u>plays</u> football.</em></p>
                    
                    <li><strong>Future Tense:</strong> Action will happen.</li>
                    <p>Examples: <em>She <u>will go</u> to the park. They <u>will study</u> tomorrow.</em></p>
                </ul>
            </div>
        ),
    },
    {
        title: "Active & Passive Voice",
        content: (
            <div>
                <p>Sentences can be written in two voices: Active and Passive. 🗣️</p>
                <ul>
                    <li><strong>Active Voice:</strong> The subject performs the action.</li>
                    <p>Examples:</p>
                    <p>1. <em>The chef (subject) cooked (verb) the meal (object).</em></p>
                    <p>2. <em>She (subject) writes (verb) a letter (object).</em></p>
                    
                    <li><strong>Passive Voice:</strong> The action is performed on the subject.</li>
                    <p>Examples:</p>
                    <p>1. <em>The meal (object) was cooked (verb) by the chef (subject).</em></p>
                    <p>2. <em>A letter (object) was written (verb) by her (subject).</em></p>
                </ul>
            </div>
        ),
    },
    {
        title: "Direct & Indirect Speech",
        content: (
            <div>
                <p>Direct and Indirect speech help us report what others say! 🗨️</p>
                <ul>
                    <li><strong>Direct Speech:</strong> Exact words within quotation marks.</li>
                    <p>Examples:</p>
                    <p>1. <em>John said, "I am hungry."</em></p>
                    <p>2. <em>She asked, "Can you help me?"</em></p>
                    
                    <li><strong>Indirect Speech:</strong> Reported words without quotes.</li>
                    <p>Examples:</p>
                    <p>1. <em>John said that he was hungry.</em></p>
                    <p>2. <em>She asked if I could help her.</em></p>
                </ul>
            </div>
        ),
    },
];

const LearningModule7 = () => {
    const [currentTopic, setCurrentTopic] = useState(0);
    const navigate = useNavigate();

    return (
        <div className="learning-container">
            <h1>📚 Learning Module 7 - Advanced Grammar 📚</h1>
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
                <button onClick={() => navigate("/exercise7")}>Take Test</button>
            </div>
        </div>
    );
};

export default LearningModule7;
