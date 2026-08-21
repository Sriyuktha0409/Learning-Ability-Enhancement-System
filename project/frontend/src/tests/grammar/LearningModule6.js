import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LearningModule.css";

const topics = [
    {
        title: "Nouns",
        content: (
            <div>
                <p>Nouns are words that name people, places, things, or ideas. 📖</p>
                <ul>
                    <li><strong>Common Noun:</strong> city, dog, book, river, mountain</li>
                    <li><strong>Proper Noun:</strong> London, Charlie, Amazon, Nile, Everest</li>
                    <li><strong>Singular Noun:</strong> apple, child, computer, chair, elephant</li>
                    <li><strong>Plural Noun:</strong> apples, children, computers, chairs, elephants</li>
                    <li><strong>Gender Noun:</strong> actor/actress, king/queen, waiter/waitress, hero/heroine</li>
                    <li><strong>Abstract Noun:</strong> love, happiness, bravery, wisdom, fear</li>
                    <li><strong>Collective Noun:</strong> a flock of birds, a bunch of grapes, a team of players</li>
                </ul>
            </div>
        ),
    },
    {
        title: "Verbs",
        content: (
            <div>
                <p>Verbs are action words. They tell us what someone or something is doing. 🏃</p>
                <ul>
                    <li><strong>Simple Present:</strong> run, eat, play, read, jump</li>
                    <li><strong>Simple Past:</strong> ran, ate, played, read, jumped</li>
                    <li><strong>Present Continuous:</strong> running, eating, playing, reading, jumping</li>
                    <li><strong>Helping Verbs:</strong> is, am, are, was, were, has, have</li>
                    <li><strong>Irregular Verbs:</strong> go → went, buy → bought, write → wrote</li>
                </ul>
            </div>
        ),
    },
    {
        title: "Adjectives & Adverbs",
        content: (
            <div>
                <p>Adjectives describe nouns, while adverbs describe verbs. 🌟</p>
                <ul>
                    <li><strong>Adjectives:</strong> beautiful, tall, bright, happy, lazy</li>
                    <li><strong>Comparative Adjectives:</strong> taller, brighter, happier, lazier</li>
                    <li><strong>Superlative Adjectives:</strong> tallest, brightest, happiest, laziest</li>
                    <li><strong>Adverbs:</strong> quickly, softly, happily, loudly, carefully</li>
                    <li><strong>Adverbs of Frequency:</strong> always, usually, often, sometimes, rarely, never</li>
                </ul>
            </div>
        ),
    },
    {
        title: "Punctuation",
        content: (
            <div>
                <p>Punctuation marks help us structure sentences correctly. ✍️</p>
                <ul>
                    <li><strong>Period (.)</strong> - Ends a sentence.  
                        <br/> Example: I love reading books.</li>
                    <li><strong>Comma (,)</strong> - Separates ideas or items in a list.  
                        <br/> Example: I bought apples, bananas, oranges, and grapes.</li>
                    <li><strong>Question Mark (?)</strong> - Used for questions.  
                        <br/> Example: Where are you going?</li>
                    <li><strong>Exclamation Mark (!)</strong> - Shows excitement.  
                        <br/> Example: Wow! That was amazing!</li>
                    <li><strong>Quotation Marks (" ")</strong> - Used to indicate speech.  
                        <br/> Example: She said, "I love learning grammar."</li>
                    <li><strong>Apostrophe (')</strong> - Used for contractions and possession.  
                        <br/> Example: It's a beautiful day. / This is John's book.</li>
                </ul>
            </div>
        ),
    },
];

const LearningModule6 = () => {
    const [currentTopic, setCurrentTopic] = useState(0);
    const navigate = useNavigate();

    return (
        <div className="learning-container">
            <h1>📚 Learn English - Advanced Concepts! 📚</h1>
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
                <button onClick={() => navigate("/exercise6")}>Take Test</button>
            </div>
        </div>
    );
};

export default LearningModule6;
