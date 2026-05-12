import { stateBuffer, playerId } from "./network.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// ----------------------
// BACKGROUND
// ----------------------
const bg = new Image();
bg.src = "assets/bg.png";

// ----------------------
// DPI SAFE RESIZE
// ----------------------
function resize() {
  const dpr = window.devicePixelRatio || 1;

  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
}

resize();
window.addEventListener("resize", resize);

// ----------------------
// FIND SNAPSHOTS FOR INTERPOLATION
// ----------------------
function getSnapshots(renderTime) {
  let a = null;
  let b = null;

  for (let i = 0; i < stateBuffer.length - 1; i++) {
    const s1 = stateBuffer[i];
    const s2 = stateBuffer[i + 1];

    if (s1.time <= renderTime && renderTime <= s2.time) {
      a = s1;
      b = s2;
      break;
    }
  }

  return { a, b };
}

// ----------------------
// RENDER LOOP
// ----------------------
export function render() {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;

  ctx.clearRect(0, 0, w, h);

  // draw background
  if (bg.complete) {
    ctx.drawImage(bg, 0, 0, w, h);
  }

  const renderTime = Date.now() - 100;

  const { a, b } = getSnapshots(renderTime);

  // ----------------------
  // FALLBACK (VERY IMPORTANT)
  // ----------------------
  if (!a || !b) {
    const latest = stateBuffer[stateBuffer.length - 1];
    if (!latest) return;

    drawPlayers(latest.players);
    return;
  }

  const alpha = (renderTime - a.time) / (b.time - a.time);

  const interpolated = {};

  for (const id in a.players) {
    const p1 = a.players[id];
    const p2 = b.players[id];

    if (!p1 || !p2) continue;

    interpolated[id] = {
      x: p1.x + (p2.x - p1.x) * alpha,
      y: p1.y + (p2.y - p1.y) * alpha
    };
  }

  drawPlayers(interpolated);
}

// ----------------------
// DRAW HELPERS
// ----------------------
function drawPlayers(players) {
  for (const id in players) {
    const p = players[id];

    ctx.fillStyle = id === playerId ? "blue" : "red";

    ctx.beginPath();
    ctx.arc(p.x, p.y, 15, 0, Math.PI * 2);
    ctx.fill();
  }
}