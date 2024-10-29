// script.js

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let gameMode = "player"; // Default to player vs player

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Set game mode
function setGameMode(mode) {
    gameMode = mode;
    resetGame();
}

// Handle user click
function handleClick(cellIndex) {
    if (!gameActive || board[cellIndex] !== "") return;

    board[cellIndex] = currentPlayer;
    document.querySelectorAll(".cell")[cellIndex].textContent = currentPlayer;

    if (checkWin()) {
        document.getElementById("message").textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== "")) {
        document.getElementById("message").textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (gameMode === "computer" && currentPlayer === "O") {
        setTimeout(makeComputerMove, 500);
    }
}

// Check for win conditions
function checkWin() {
    return winConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
}

// Computer makes a move
function makeComputerMove() {
    let availableCells = board.map((val, idx) => (val === "" ? idx : null)).filter(val => val !== null);

    if (availableCells.length > 0) {
        let randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
        handleClick(randomCell);
    }
}

// Reset the game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    document.getElementById("message").textContent = "";
    document.querySelectorAll(".cell").forEach(cell => (cell.textContent = ""));
}
