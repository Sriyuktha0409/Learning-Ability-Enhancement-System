import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LearningModule.css";

const topics = [
    {
        title: "Nouns",
        symbol: "🔤",
        content: (
            <div>
                <p><strong>Nouns</strong> are words that name people, places, things, or ideas.</p>
                <ul>
                    <li><strong>Common Noun:</strong> dog, school, city, chair, car</li>
                    <li><strong>Proper Noun:</strong> Max, Harvard, Paris, Tesla, Amazon</li>
                    <li><strong>Singular Noun:</strong> apple, book, table</li>
                    <li><strong>Plural Noun:</strong> apples, books, tables</li>
                    <li><strong>Abstract Noun:</strong> love, happiness, courage</li>
                    <li><strong>Collective Noun:</strong> team, flock, bunch</li>
                </ul>
            </div>
        ),
    },
    {
        title: "Verbs",
        symbol: "🏃",
        content: (
            <div>
                <p><strong>Verbs</strong> show action or state of being.</p>
                <ul>
                    <li><strong>Action Verb:</strong> run, eat, write, jump, sing</li>
                    <li><strong>State Verb:</strong> is, am, was, were, seem</li>
                    <li><strong>Helping Verb:</strong> have, has, had, will</li>
                    <li><strong>Example Sentences:</strong></li>
                    <ul>
                        <li>She <strong>runs</strong> in the park.</li>
                        <li>They <strong>are</strong> happy today.</li>
                        <li>He <strong>was</strong> late for school.</li>
                    </ul>
                </ul>
            </div>
        ),
    },
    {
        title: "Adjectives",
        symbol: "🎨",
        content: (
            <div>
                <p><strong>Adjectives</strong> describe nouns and give more details.</p>
                <ul>
                    <li><strong>Example:</strong> big dog, red apple, tall building</li>
                    <li><strong>Comparative:</strong> bigger, faster, stronger</li>
                    <li><strong>Superlative:</strong> biggest, fastest, strongest</li>
                    <li><strong>Example Sentences:</strong></li>
                    <ul>
                        <li>The <strong>beautiful</strong> garden has many flowers.</li>
                        <li>This is a <strong>delicious</strong> cake.</li>
                        <li>The <strong>brave</strong> soldier saved the people.</li>
                    </ul>
                </ul>
            </div>
        ),
    },
    {
        title: "Pronouns",
        symbol: "🙋",
        content: (
            <div>
                <p><strong>Pronouns</strong> replace nouns to avoid repetition.</p>
                <ul>
                    <li><strong>Examples:</strong> he, she, they, it, we</li>
                    <li><strong>Sentence Example:</strong></li>
                    <ul>
                        <li><strong>John</strong> is my friend. <strong>He</strong> is very kind.</li>
                        <li><strong>Lisa and Tom</strong> are playing. <strong>They</strong> love football.</li>
                    </ul>
                </ul>
            </div>
        ),
    },
    {
        title: "Sentence Structure",
        symbol: "📖",
        content: (
            <div>
                <p>A sentence must have a subject and a verb.</p>
                <ul>
                    <li><strong>Example:</strong> The cat sleeps.</li>
                    <li><strong>Compound Sentence:</strong> I like tea, and she likes coffee.</li>
                    <li><strong>Complex Sentence:</strong> Although it was raining, they went outside.</li>
                </ul>
            </div>
        ),
    },
    {
        title: "Tenses",
        symbol: "⏳",
        content: (
            <div>
                <p><strong>Tenses</strong> show when an action happens.</p>
                <ul>
                    <li><strong>Present:</strong> I eat. (happening now)</li>
                    <li><strong>Past:</strong> I ate. (happened before)</li>
                    <li><strong>Future:</strong> I will eat. (will happen later)</li>
                    <li><strong>Example Sentences:</strong></li>
                    <ul>
                        <li>She <strong>studies</strong> every day. (Present)</li>
                        <li>They <strong>visited</strong> their grandmother. (Past)</li>
                        <li>We <strong>will travel</strong> next week. (Future)</li>
                    </ul>
                </ul>
            </div>
        ),
    },
    {
        title: "Punctuation",
        symbol: "🔣",
        content: (
            <div>
                <p>Punctuation marks help make writing clear.</p>
                <ul>
                    <li><strong>Period (.):</strong> Ends a sentence.</li>
                    <li><strong>Comma (,):</strong> Separates ideas.</li>
                    <li><strong>Question Mark (?):</strong> Shows a question.</li>
                    <li><strong>Exclamation Mark (!):</strong> Shows strong emotion.</li>
                    <li><strong>Example Sentences:</strong></li>
                    <ul>
                        <li>Where is my book<strong>?</strong></li>
                        <li>She is a great singer<strong>!</strong></li>
                        <li>We are going to the park<strong>.</strong></li>
                    </ul>
                </ul>
            </div>
        ),
    },
];

const LearningModule4 = () => {
    const [currentTopic, setCurrentTopic] = useState(0);
    const navigate = useNavigate();

    return (
        <div className="learning-container">
            <h1>📚 Learning Module 4 📚</h1>
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
            <div className="topic-content">
                <h2>{topics[currentTopic].symbol} {topics[currentTopic].title}</h2>
                {topics[currentTopic].content}
            </div>
            <div className="test-button">
                <button onClick={() => navigate("/exercise4")}>Take Test</button>
            </div>
        </div>
    );
};

export default LearningModule4;