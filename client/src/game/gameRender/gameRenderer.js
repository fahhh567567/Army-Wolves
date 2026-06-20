import { backgrounds } from "../assets/assets.js";
import { drawBackground } from "./drawBackground.js";
import { drawPlayers } from "./drawPlayers.js";
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

  canvas.width = 1520;
  canvas.height = 960;

  getState = stateGetter;

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

  const state = getState?.();
  if (!state) return;

  // SAFE LOG (no crash)
  console.log("[RENDER ROOM]", state.room);

  const room = state.room || "lobby";
  const players = state.players || {};
  const exits = state.exits || [];

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // BACKGROUND
  drawBackground(ctx, room, backgrounds);

  // EXITS
  if (exits.length) {
    drawExits(ctx, exits);
  }

  // PLAYERS (always safe)
  drawPlayers(ctx, players, state.playerId);

  // UI
  if (state.inputState || state.ui) {
    drawUI(ctx, canvas, state.inputState || state.ui);
  }
}

// ----------------------
// STOP
// ----------------------
export function stopRenderer() {
  running = false;
}