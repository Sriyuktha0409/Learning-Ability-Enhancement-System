const wordLists = {
    easy: ["bus", "car", "cat", "dog", "ant", "ox", "bat", "cow", "cup", "pen"],
    medium: ["apple", "banana", "chair", "dog", "elephant", "flower", "guitar", "house", "ice", "jacket"],
    hard: ["kangaroo", "lemon", "monkey", "notebook", "ocean", "pencil", "quartz", "rocket", "stadium", "tiger"]
};

let difficulty = "";
let level = 1;

function selectDifficulty(selectedDifficulty) {
    difficulty = selectedDifficulty;
    level = 1;
    document.getElementById("difficulty-selection").style.display = "none";
    document.getElementById("game-section").style.display = "block";
    startTest();
}

function startTest() {
    document.getElementById("result").innerText = "";
    document.getElementById("user-inputs").innerHTML = "";
    document.getElementById("submit-button").style.display = "none";
    document.getElementById("recall-button").style.display = "none";
    document.getElementById("next-button").style.display = "none";
    document.getElementById("retry-button").style.display = "none";

    // Update level title
    document.getElementById("level-title").innerText = `Level ${level}`;

    // Get words based on level
    const maxWords = wordLists[difficulty].length;
    const numWords = Math.min(level, maxWords);
    const selectedWords = wordLists[difficulty].slice(0, numWords);

    // Display words
    document.getElementById("word-list").innerText = selectedWords.join(", ");
    document.getElementById("start-button").style.display = "none";

    // Hide words after 5 seconds
    setTimeout(() => {
        document.getElementById("word-list").innerText = "";
        document.getElementById("recall-button").style.display = "block";
    }, 5000);
}

function startRecallPhase() {
    document.getElementById("recall-button").style.display = "none";
    document.getElementById("submit-button").style.display = "block";

    let inputContainer = document.getElementById("user-inputs");
    inputContainer.innerHTML = "";

    const numWords = Math.min(level, wordLists[difficulty].length);
    for (let i = 0; i < numWords; i++) {
        let inputBox = document.createElement("input");
        inputBox.type = "text";
        inputBox.classList.add("word-box");
        inputContainer.appendChild(inputBox);
    }
}

function checkRecall() {
    let userInputs = document.querySelectorAll(".word-box");
    const numWords = Math.min(level, wordLists[difficulty].length);
    const correctWords = wordLists[difficulty].slice(0, numWords);

    let correctCount = 0;
    userInputs.forEach((input, index) => {
        if (correctWords.includes(input.value.toLowerCase().trim())) {
            correctCount++;
            input.classList.add("correct");
            input.classList.remove("incorrect");
        } else {
            input.classList.add("incorrect");
            input.classList.remove("correct");
        }
    });

    const resultElement = document.getElementById("result");
    resultElement.textContent = `You recalled ${correctCount} out of ${numWords} words correctly.`;
    resultElement.className = correctCount === numWords ? "success" : "error";

    if (correctCount === numWords && level < 10) {
        document.getElementById("next-button").style.display = "block";
    } else {
        document.getElementById("retry-button").style.display = "block";
    }
}

function nextLevel() {
    level++;
    document.getElementById("next-button").style.display = "none";
    startTest();
}

function retryLevel() {
    document.getElementById("retry-button").style.display = "none";
    startTest();
}
