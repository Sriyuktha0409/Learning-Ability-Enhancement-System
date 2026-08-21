const images = ["🍎", "🍌", "🍇", "🍉", "🍒", "🥑", "🥕", "🍕", "🍩", "🍔", "🎸", "🎲", "📷", "🎧", "🚗", "🛸", "🎈", "🏀", "🎹" ,"🐘", "🦜", "🦋","🌈", "⭐"];
let category, level, boardColumns, boardRows, selectedImages, shuffledCards, flippedCards, matchedPairs;
let startTime, timerInterval;

const levelSizes = {
    easy: [ [2,2], [3,2], [4,2], [5,2], [6,2] ],
    medium: [ [4,3], [4,4], [3,6], [4,5], [6,4] ],
    hard: [ [6,5], [8,4], [6,6], [8,5], [7,6] ]
};

function selectCategory(selectedCategory) {
    category = selectedCategory;
    document.getElementById("menu").style.display = "none";
    document.getElementById("level-menu").style.display = "block";
}

function startGame(selectedLevel) {
    level = selectedLevel;
    document.getElementById("level-menu").style.display = "none";
    document.getElementById("game-section").style.display = "block";
    document.getElementById("level-number").innerText = `Level ${level}`;
    document.getElementById("retry-btn").style.display = "none";
    document.getElementById("next-level").style.display = "none";
    
    flippedCards = [];
    matchedPairs = 0;
    
    [boardColumns, boardRows] = levelSizes[category][level - 1];
    
    selectedImages = images.slice(0, (boardColumns * boardRows) / 2);
    shuffledCards = [...selectedImages, ...selectedImages].sort(() => Math.random() - 0.5);
    
    generateBoard();
    startTimer();
}

function generateBoard() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";
    gameBoard.style.gridTemplateColumns = `repeat(${boardColumns}, 100px)`;
    gameBoard.style.gridTemplateRows = `repeat(${boardRows}, 100px)`;
    
    shuffledCards.forEach((emoji, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.index = index;
        card.dataset.value = emoji;
        
        const back = document.createElement("div");
        back.classList.add("back");
        
        const content = document.createElement("div");
        content.classList.add("content");
        content.textContent = emoji;
        
        card.appendChild(back);
        card.appendChild(content);
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (this.classList.contains("flipped") || this.classList.contains("matched")) {
        return;
    }
    
    if (flippedCards.length >= 2) {
        return;
    }
    
    this.classList.add("flipped");
    flippedCards.push(this);
    
    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 600);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairs++;
        
        if (matchedPairs === selectedImages.length) {
            clearInterval(timerInterval);
            document.getElementById("next-level").style.display = "block";
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
        }, 1000);
    }
    
    flippedCards = [];
}

function startTimer() {
    startTime = Date.now();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById("timer").innerText = `Time: ${elapsedTime}s`;
}

function restartGame() {
    startGame(level);
}

function nextLevel() {
    if (level < 5) {
        startGame(level + 1);
    } else {
        alert("🎉 Congratulations! You completed all levels!");
        window.location.reload();
    }
}