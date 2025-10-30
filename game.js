const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const restartBtn = document.getElementById("restartBtn");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

let bowlWidth = 100;
let bowlHeight = 30;
let bowlX = (canvas.width - bowlWidth) / 2;

let ballRadius = 10;
let ballX, ballY, ballSpeed;
let rightPressed = false;
let leftPressed = false;
let score = 0;
let gameOver = false;
let caughtBalls = [];

// ✅ Ensure keyboard events always work (focus window)
window.focus();

// ✅ Keyboard Controls (for desktop)
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === "Right") rightPressed = true;
  if (e.key === "ArrowLeft" || e.key === "Left") leftPressed = true;
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight" || e.key === "Right") rightPressed = false;
  if (e.key === "ArrowLeft" || e.key === "Left") leftPressed = false;
});

// ✅ Touch Controls (for mobile)
leftBtn.addEventListener("touchstart", () => (leftPressed = true));
leftBtn.addEventListener("touchend", () => (leftPressed = false));
rightBtn.addEventListener("touchstart", () => (rightPressed = true));
rightBtn.addEventListener("touchend", () => (rightPressed = false));

// ✅ Restart Button
restartBtn.addEventListener("click", restartGame);

function initGame() {
  score = 0;
  ballSpeed = 3;
  caughtBalls = [];
  gameOver = false;
  restartBtn.style.display = "none";
  document.getElementById("score").innerText = "Score: " + score;
  resetBall();
  draw();
}

function drawBowl() {
  ctx.beginPath();
  ctx.moveTo(bowlX, canvas.height - 15);
  ctx.quadraticCurveTo(
    bowlX + bowlWidth / 2,
    canvas.height - bowlHeight - 10,
    bowlX + bowlWidth,
    canvas.height - 15
  );
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#6fffe9";
  ctx.stroke();
  ctx.closePath();
}

function drawBall(x, y, color = "#f25f5c") {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function moveBall() {
  ballY += ballSpeed;

  if (ballY + ballRadius > canvas.height - 15) {
    if (ballX > bowlX && ballX < bowlX + bowlWidth) {
      score++;
      document.getElementById("score").innerText = "Score: " + score;
      caughtBalls.push({
        x: ballX,
        y: canvas.height - 25 - Math.random() * 10,
      });
      resetBall();
      ballSpeed += 0.2;
    } else {
      gameOver = true;
    }
  }
}

function resetBall() {
  ballX = Math.random() * (canvas.width - ballRadius * 2) + ballRadius;
  ballY = 0;
}

function moveBowl() {
  if (rightPressed && bowlX < canvas.width - bowlWidth) bowlX += 7;
  if (leftPressed && bowlX > 0) bowlX -= 7;
}

function draw() {
  if (gameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f25f5c";
    ctx.font = "28px Poppins";
    ctx.fillText("Game Over!", 120, 230);
    ctx.fillStyle = "#fff";
    ctx.font = "20px Poppins";
    ctx.fillText("Final Score: " + score, 140, 270);
    restartBtn.style.display = "inline-block";
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw caught balls in bowl
  caughtBalls.forEach((b) => drawBall(b.x, b.y, "#ffe66d"));

  drawBall(ballX, ballY);
  drawBowl();
  moveBall();
  moveBowl();

  requestAnimationFrame(draw);
}

function restartGame() {
  initGame();
}

initGame();
