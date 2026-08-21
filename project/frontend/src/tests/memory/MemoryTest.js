import React from "react";
import "./MemoryTest.css"; // Make sure to create this CSS file

const MemoryTest = () => {
    return (
        <div className="memory-test-container">
            
            
            <div className="memory-test-iframe-container">
                <iframe
                    src="/memory-test/index.html"
                    className="memory-test-iframe"
                    title="Memory Test"
                />
            </div>
        </div>
    );
};

export default MemoryTest;

