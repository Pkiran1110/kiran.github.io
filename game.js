const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let paddleWidth = 80;
let paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;

let ballRadius = 10;
let ballX = Math.random() * (canvas.width - ballRadius * 2) + ballRadius;
let ballY = 0;
let ballSpeed = 3;

let rightPressed = false;
let leftPressed = false;
let score = 0;

// Controls
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
  if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
  if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
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
    } else {
      alert("Game Over! Your score: " + score);
      document.location.reload();
    }
  }
}

function resetBall() {
  ballX = Math.random() * (canvas.width - ballRadius * 2) + ballRadius;
  ballY = 0;
  ballSpeed += 0.2; // Make it harder
}

function movePaddle() {
  if (rightPressed && paddleX < canvas.width - paddleWidth) paddleX += 7;
  if (leftPressed && paddleX > 0) paddleX -= 7;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  drawBall();
  moveBall();
  movePaddle();
  requestAnimationFrame(draw);
}

draw();
