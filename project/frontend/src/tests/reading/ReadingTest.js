import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ReadingTest.css";

const ReadingTest = () => {
    const { grade } = useParams();
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [error, setError] = useState(null);

    const readingTests = {
        "1": "/reading-test/speechtest1.html",
        "2": "/reading-test/speechtest2.html",
        "3": "/reading-test/speechtest3.html",
        "4": "/reading-test/speechtest4.html",
        "5": "/reading-test/speechtest5.html",
        "6": "/reading-test/speechtest6.html",
        "7": "/reading-test/speechtest7.html",
    };

    // Validate grade and default to 1 if invalid
    const validatedGrade = Object.keys(readingTests).includes(grade) ? grade : "1";
    const testUrl = readingTests[validatedGrade];

    useEffect(() => {
        // Verify the file exists
        fetch(testUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Test file not found at ${testUrl}`);
                }
            })
            .catch(err => {
                setError(err.message);
                console.error(err);
            });
    }, [testUrl]);

    if (error) {
        return (
            <div className="error-message">
                <h2>Reading Test for Grade {validatedGrade}</h2>
                <p>Could not load the test: {error}</p>
                <p>Please check that the test files exist at the specified location.</p>
            </div>
        );
    }

    return (
        <div className="reading-test-container">
            <h2 align='center'>Reading Test for Grade {validatedGrade}</h2>
            
            {!iframeLoaded && !error && (
                <div className="loading-message">
                    Loading reading test...
                </div>
            )}

            <iframe 
                src={testUrl}
                width="100%"
                height="600px"
                title={`Reading Test Grade ${validatedGrade}`}
                onLoad={() => setIframeLoaded(true)}
                onError={() => setError(`Failed to load content from ${testUrl}`)}
                style={{ display: iframeLoaded ? "block" : "none" }}
                sandbox="allow-scripts allow-same-origin"
            />
        </div>
    );
};

export default ReadingTest;