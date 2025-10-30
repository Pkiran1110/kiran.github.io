const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const restartBtn = document.getElementById("restartBtn");

let paddleWidth = 80;
let paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;

let ballRadius = 10;
let ballX, ballY, ballSpeed;
let rightPressed = false;
let leftPressed = false;
let score = 0;
let gameOver = false;

// Controls
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
restartBtn.addEventListener("click", restartGame);

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
  if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
  if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
}

function initGame() {
  score = 0;
  ballSpeed = 3;
  gameOver = false;
  restartBtn.style.display = "none";
  document.getElementById("score").innerText = "Score: " + score;
  resetBall();
  draw();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
  ctx.fillStyle = "#00ffcc";
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#ff4081";
  ctx.fill();
  ctx.closePath();
}

function moveBall() {
  ballY += ballSpeed;

  if (ballY + ballRadius > canvas.height) {
    if (ballX > paddleX && ballX < paddleX + paddleWidth) {
      score++;
      document.getElementById("score").innerText = "Score: " + score;
      resetBall();
      ballSpeed += 0.2; // increase difficulty
    } else {
      gameOver = true;
    }
  }
}

function resetBall() {
  ballX = Math.random() * (canvas.width - ballRadius * 2) + ballRadius;
  ballY = 0;
}

function movePaddle() {
  if (rightPressed && paddleX < canvas.width - paddleWidth) paddleX += 7;
  if (leftPressed && paddleX > 0) paddleX -= 7;
}

function draw() {
  if (gameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ff4081";
    ctx.font = "28px Arial";
    ctx.fillText("Game Over!", 120, 230);
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.fillText("Final Score: " + score, 140, 270);
    restartBtn.style.display = "inline-block";
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  drawBall();
  moveBall();
  movePaddle();
  requestAnimationFrame(draw);
}

function restartGame() {
  initGame();
}

// Start game on load
initGame();
