let gridSize = 4;  // Default to Easy mode
let pattern = [];
let userSelections = [];
let difficulty = "";
let level = 1;  // Start from Level 1

function selectDifficulty(selectedDifficulty) {
    difficulty = selectedDifficulty;
    level = 1;  // Start from level 1 for all difficulties
    
    if (difficulty === "easy") {
        gridSize = 4;
    } else if (difficulty === "medium") {
        gridSize = 5;
    } else {
        gridSize = 6;
    }

    document.getElementById("difficulty-selection").style.display = "none";
    document.getElementById("game-section").style.display = "block";
    startTest();
}

function getPatternSize() {
    if (difficulty === "easy") return level;  // 1 to 10
    if (difficulty === "medium") return level + 2;  // 3 to 13
    return level + 4;  // 5 to 15
}

function generatePattern(size) {
    pattern = [];
    while (pattern.length < size) {
        let randomCell = Math.floor(Math.random() * (gridSize * gridSize));
        if (!pattern.includes(randomCell)) {
            pattern.push(randomCell);
        }
    }
}

function createGrid() {
    const gridContainer = document.getElementById("grid-container");
    gridContainer.innerHTML = "";
    gridContainer.style.display = "grid";
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 60px)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 60px)`;
    gridContainer.style.gap = "5px";

    for (let i = 0; i < gridSize * gridSize; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", () => toggleUserSelection(i));
        gridContainer.appendChild(cell);
    }
}

function toggleUserSelection(index) {
    const cell = document.querySelector(`.cell[data-index='${index}']`);
    if (userSelections.includes(index)) {
        userSelections = userSelections.filter(num => num !== index);
        cell.classList.remove("user-selected");
    } else {
        userSelections.push(index);
        cell.classList.add("user-selected");
    }
}

function startTest() {
    document.getElementById("result").innerText = "";
    document.getElementById("submit-button").style.display = "none";
    document.getElementById("next-button").style.display = "none";
    document.getElementById("retry-button").style.display = "none";
    userSelections = [];

    // Clear previous correct/incorrect classes
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('correct', 'incorrect', 'disabled');
    });

    document.getElementById("level-title").innerText = `Level ${level}`;
    generatePattern(getPatternSize());
    createGrid();

    // Disable cells during pattern display
    document.querySelectorAll(".cell").forEach(cell => {
        cell.classList.add("disabled");
    });

    pattern.forEach(index => {
        document.querySelector(`.cell[data-index='${index}']`).classList.add("active");
    });

    setTimeout(() => {
        document.querySelectorAll(".cell").forEach(cell => {
            cell.classList.remove("active", "disabled");
        });
        document.getElementById("submit-button").style.display = "block";
    }, 5000);
}

function checkPattern() {
    const sortedUserSelections = userSelections.slice().sort((a, b) => a - b);
    const sortedPattern = pattern.slice().sort((a, b) => a - b);
    
    // Disable all cells after submission
    document.querySelectorAll(".cell").forEach(cell => {
        cell.classList.add("disabled");
    });

    if (JSON.stringify(sortedUserSelections) === JSON.stringify(sortedPattern)) {
        document.getElementById("result").innerText = "✅ Correct!";
        // Mark all selected cells as correct
        userSelections.forEach(index => {
            document.querySelector(`.cell[data-index='${index}']`).classList.add("correct");
        });
        if (level < 10) {
            document.getElementById("next-button").style.display = "block";
        }
    } else {
        document.getElementById("result").innerText = `❌ Incorrect! Try again!`;
        document.getElementById("retry-button").style.display = "block";
        
        // Mark correct and incorrect selections
        userSelections.forEach(index => {
            const cell = document.querySelector(`.cell[data-index='${index}']`);
            if (pattern.includes(index)) {
                cell.classList.add("correct");
            } else {
                cell.classList.add("incorrect");
            }
        });
        
        // Show which correct cells were missed
        pattern.forEach(index => {
            if (!userSelections.includes(index)) {
                document.querySelector(`.cell[data-index='${index}']`).classList.add("correct");
            }
        });
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
