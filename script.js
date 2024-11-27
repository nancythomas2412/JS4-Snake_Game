// Game Initialization
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.7;
const gridSize = 20;
let snake = [{ x: 100, y: 100 }];
let direction = { x: 1, y: 0 };
let food = spawnFood();
let score = 0;
let gameLoop;
let playerName = prompt("Enter your name:") || "Player";

function drawGrid() {
    ctx.strokeStyle = '#c0c0c0'; // Light gray color for the grid
    ctx.lineWidth = 1; // Thickness of the grid lines
    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(); // Draw the grid first

    ctx.fillStyle = '#4a4a4a';// Color for the food
    ctx.font = '20px Arial';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Draw the snake as a series of blocks
    // ctx.fillStyle = 'green'; // You can change this color as needed
    // for (let i = 0; i < snake.length; i++) {
    //     ctx.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);
    // }

    // Draw the snake using the player's name as the pattern
    ctx.fillStyle = 'green'; // Color of the snake's body
    ctx.font = '20px Arial'; // Adjust size to fit in the segments
    for (let i = 0; i < snake.length; i++) {
        ctx.fillText(playerName[i % playerName.length], snake[i].x + gridSize / 4, snake[i].y + gridSize / 1.5);
    }
}



function update() {
    const head = { x: snake[0].x + direction.x * gridSize, y: snake[0].y + direction.y * gridSize };

    // Check for collisions
    if (
        head.x < 0 || head.y < 0 ||
        head.x >= canvas.width || head.y >= canvas.height ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        clearInterval(gameLoop);
        document.getElementById('gameOverMessage').textContent = `Game Over! Final Score: ${score}`;
        document.getElementById('gameOverPopup').style.display = 'block';
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreDisplay.textContent = score;
        food = spawnFood();
    } else {
        snake.pop();
    }
}


function spawnFood() {
    const x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    const y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
    return { x, y };
}

// Event listeners for keyboard input
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

// Button controls
document.getElementById('up').addEventListener('click', () => {
    if (direction.y === 0) direction = { x: 0, y: -1 };
});

document.getElementById('down').addEventListener('click', () => {
    if (direction.y === 0) direction = { x: 0, y: 1 };
});

document.getElementById('left').addEventListener('click', () => {
    if (direction.x === 0) direction = { x: -1, y: 0 };
});

document.getElementById('right').addEventListener('click', () => {
    if (direction.x === 0) direction = { x: 1, y: 0 };
});

// Restart button click event
document.getElementById('restart').addEventListener('click', () => {
    clearInterval(gameLoop);
    snake = [{ x: 100, y: 100 }];
    direction = { x: 1, y: 0 };
    score = 0;
    scoreDisplay.textContent = score;
    food = spawnFood();
    document.getElementById('gameOverPopup').style.display = 'none';
    gameLoop = setInterval(game, 100);
});



function game() {
    update();
    draw();
}

gameLoop = setInterval(game, 100);