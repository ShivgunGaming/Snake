// Get canvas element and set context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 400;
canvas.height = 400;

// Set the size of each tile
const tileSize = 20;

// Set initial snake position
let snake = [{ x: 10, y: 10 }];

// Set initial direction
let dx = 0;
let dy = 0;

// Set initial apple position
let apple = {
  x: Math.floor(Math.random() * (canvas.width / tileSize)),
  y: Math.floor(Math.random() * (canvas.height / tileSize)),
};

// Flag to track game over state
let gameOver = false;

// Variable to track whether the game loop is running
let gameRunning = false;

// Main game loop
function gameLoop() {
  gameRunning = true;
  clearCanvas();
  updateSnake();
  drawSnake();
  drawApple();
  // Continue the game loop only if the game is not over
  if (!gameOver) {
    setTimeout(gameLoop, 100);
  } else {
    gameRunning = false;
  }
}

// Function to clear canvas
function clearCanvas() {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Function to update snake position
function updateSnake() {
  if (gameOver) return; // Stop updating if the game is over
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  // Check for collision with itself or hitting the border
  if (checkCollision(head)) {
    endGame();
    return;
  }
  snake.unshift(head);
  if (head.x === apple.x && head.y === apple.y) {
    generateApple();
  } else {
    snake.pop();
  }
}

// Function to check collision with itself or border
function checkCollision(head) {
  // Check if head hits border
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvas.width / tileSize ||
    head.y >= canvas.height / tileSize
  ) {
    return true;
  }
  // Check if head hits itself
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

// Define points variable
let points = 0;

// Function to update snake position
function updateSnake() {
  if (gameOver) return; // Stop updating if the game is over
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  // Check for collision with itself or hitting the border
  if (checkCollision(head)) {
    endGame();
    return;
  }
  snake.unshift(head);
  if (head.x === apple.x && head.y === apple.y) {
    points++; // Increase points when snake eats apple
    document.getElementById("score-value").textContent = points; // Update score display
    generateApple();
  } else {
    snake.pop();
  }
}

// Function to draw snake
function drawSnake() {
  ctx.fillStyle = "#00ff00";
  snake.forEach((segment) => {
    ctx.fillRect(
      segment.x * tileSize,
      segment.y * tileSize,
      tileSize,
      tileSize
    );
  });
}

// Function to generate new apple
function generateApple() {
  apple = {
    x: Math.floor(Math.random() * (canvas.width / tileSize)),
    y: Math.floor(Math.random() * (canvas.height / tileSize)),
  };
}

// Function to draw apple
function drawApple() {
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(apple.x * tileSize, apple.y * tileSize, tileSize, tileSize);
}

// Function to end the game
function endGame() {
  gameOver = true;
  alert("Game Over! Press OK to restart.");
  // Reset snake position and direction
  snake = [{ x: 10, y: 10 }];
  dx = 0;
  dy = 0;
  // Reset points to 0
  points = 0;
  document.getElementById("score-value").textContent = points; // Update score display
  // Restart the game loop
  gameOver = false; // Reset game over state
  if (!gameRunning) {
    gameLoop();
  }
}

// Listen for arrow key presses to change snake direction
document.addEventListener("keydown", function (event) {
  if (!gameOver) {
    // Check if the game is not over
    if (event.key === "ArrowUp" && dy !== 1) {
      dx = 0;
      dy = -1;
    } else if (event.key === "ArrowDown" && dy !== -1) {
      dx = 0;
      dy = 1;
    } else if (event.key === "ArrowLeft" && dx !== 1) {
      dx = -1;
      dy = 0;
    } else if (event.key === "ArrowRight" && dx !== -1) {
      dx = 1;
      dy = 0;
    }
  } else {
    // If game is over, allow restarting only if Enter key is pressed
    if (event.key === "Enter") {
      gameOver = false;
      gameLoop(); // Start the game loop again
    }
  }
});

// Start the game loop
gameLoop();
