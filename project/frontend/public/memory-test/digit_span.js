let sequence = [];
let difficulty = "";
let level = 1;

function selectDifficulty(selectedDifficulty) {
    difficulty = selectedDifficulty;
    level = 1;
    document.getElementById("difficulty-selection").style.display = "none";
    document.getElementById("game-section").style.display = "block";
    startTest();
}

function generateSequence(length) {
    sequence = [];
    let min = 0, max = 9;

    if (difficulty === "medium") {
        min = 10; max = 99; // Double-digit numbers
    } else if (difficulty === "hard") {
        min = 100; max = 999; // 2-digit numbers with increasing length
    }

    for (let i = 0; i < length; i++) {
        sequence.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return sequence;
}

function startTest() {
    document.getElementById("result").innerText = "";
    document.getElementById("user-input").value = "";
    document.getElementById("input-container").style.display = "none";
    document.getElementById("start-button").style.display = "none";
    document.getElementById("retry-button").style.display = "none";
    document.getElementById("next-button").style.display = "none";

    document.getElementById("level-title").innerText = `Level ${level}`;
    document.getElementById("sequence-container").innerText = generateSequence(level).join(" ");

    setTimeout(() => {
        document.getElementById("sequence-container").innerText = "";
        document.getElementById("input-container").style.display = "block";
    }, 3000);
}

function checkSequence() {
    let userInput = document.getElementById("user-input").value.trim();
    let userSequence = userInput.split(" ").map(Number);
    
    const resultElement = document.getElementById("result");
    
    if (JSON.stringify(userSequence) === JSON.stringify(sequence)) {
        resultElement.innerText = "✅ Correct! Moving to the next level.";
        resultElement.className = "correct-message";
        document.getElementById("next-button").style.display = "block";
    } else {
        resultElement.innerText = `❌ Incorrect! The correct sequence was ${sequence.join(" ")}. Try again!`;
        resultElement.className = "incorrect-message";
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
