AOS.init();

// Floating Hearts Background
const canvas = document.getElementById('hearts-bg');
const ctx = canvas.getContext('2d');
let hearts = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function createHeart() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + 20,
    size: Math.random() * 8 + 2,
    speed: Math.random() * 1 + 0.5,
    opacity: Math.random() * 0.5 + 0.5
  };
}

function drawHeart(h) {
  ctx.globalAlpha = h.opacity;
  ctx.fillStyle = "#ff6f91";
  ctx.beginPath();
  ctx.moveTo(h.x, h.y);
  ctx.bezierCurveTo(h.x + h.size / 2, h.y - h.size,
                    h.x + h.size * 2, h.y + h.size,
                    h.x, h.y + h.size * 2);
  ctx.bezierCurveTo(h.x - h.size * 2, h.y + h.size,
                    h.x - h.size / 2, h.y - h.size,
                    h.x, h.y);
  ctx.fill();
  ctx.globalAlpha = 1;
}

function animateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (hearts.length < 100) {
    hearts.push(createHeart());
  }

  for (let i = 0; i < hearts.length; i++) {
    let h = hearts[i];
    h.y -= h.speed;
    drawHeart(h);
    if (h.y < -20) hearts.splice(i, 1);
  }

  requestAnimationFrame(animateHearts);
}
animateHearts();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Typing Effect & Envelope Toggle
let typedAlready = false;
let typingInProgress = false;
let skipTypingFlag = false;

function openEnvelope() {
  const letter = document.getElementById("letter");
  letter.classList.toggle("show");

  if (letter.classList.contains("show") && !typedAlready) {
    typeWriterEffect("typewriter-text");
    typedAlready = true;
  }
}

function typeWriterEffect(id) {
  const element = document.getElementById(id);
  const fullText = element.textContent.trim();
  element.textContent = "";
  let i = 0;
  typingInProgress = true;
  skipTypingFlag = false;

  function type() {
    if (skipTypingFlag) {
      element.textContent = fullText;
      typingInProgress = false;
      return;
    }

    if (i < fullText.length) {
      element.textContent += fullText.charAt(i);
      i++;
      setTimeout(type, 15);
    } else {
      typingInProgress = false;
    }
  }

  type();
}

function skipTyping() {
  if (typingInProgress) {
    skipTypingFlag = true;
  }
}

// Fullscreen toggle
function toggleFullscreen() {
  const letter = document.getElementById("letter");
  letter.classList.toggle("fullscreen");
}
function createPetals() {
  const container = document.getElementById("petal-container");

  for (let i = 0; i < 30; i++) {
    const petal = document.createElement("div");
    petal.classList.add("petal");

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = 5 + Math.random() * 5 + "s";
    petal.style.animationDelay = Math.random() * 5 + "s";

    container.appendChild(petal);

    // Reset petals after animation ends
    setTimeout(() => container.removeChild(petal), 11000);
  }
}

// Generate petals continuously
setInterval(createPetals, 1500);
