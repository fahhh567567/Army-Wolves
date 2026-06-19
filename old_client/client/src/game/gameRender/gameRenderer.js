import { backgrounds } from "../assets/assets.js";
import { drawBackground } from "./drawBackground.js";
import { drawPlayers, setPlayerIdGetter } from "./drawPlayers.js";
import { drawExits } from "./drawExits.js";
import { drawUI } from "./drawUI.js";

let canvas = null;
let ctx = null;
let getState = null;

let running = false;

// ----------------------
// INIT
// ----------------------
export function startRenderer({ getState: stateGetter }) {
  canvas = document.getElementById("game");

  if (!canvas) {
    throw new Error("[Renderer] Canvas #game not found");
  }

  ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  // optional fixed size (you can later make responsive)
  canvas.width = 1520;
  canvas.height = 960;

  getState = stateGetter;

  setPlayerIdGetter(() => stateGetter().playerId);

  running = true;

  requestAnimationFrame(loop);
}

// ----------------------
// LOOP
// ----------------------
function loop() {
  if (!running) return;

  render();
  requestAnimationFrame(loop);
}

// ----------------------
// RENDER
// ----------------------
export function render() {
  if (!ctx || !canvas) return;

  const W = canvas.width;
  const H = canvas.height;

  ctx.clearRect(0, 0, W, H);

  const state = getState?.();
  if (!state) return;

  const room = state.room || "lobby";

  drawBackground(ctx, room, backgrounds);

  if (state.players) {
    drawExits(ctx, state.exits || []);
    drawPlayers(ctx, state.players);
  }

  // IMPORTANT: now safe
  drawUI(ctx, canvas, state.inputState);
}

// ----------------------
// STOP
// ----------------------
export function stopRenderer() {
  running = false;
}