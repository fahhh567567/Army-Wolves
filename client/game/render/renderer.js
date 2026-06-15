import { backgrounds } from "../assets/assets.js";
import { drawBackground } from "./drawBackground.js";
import { drawPlayers } from "./drawPlayers.js";
import { setPlayerIdGetter } from "./drawPlayers.js";
import { drawExits } from "./drawExits.js";
import { drawUI } from "./drawUI.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;

canvas.width = 1520;
canvas.height = 960;

let getState = null;

// ----------------------
// INIT
// ----------------------
export function startRenderer({ getState: stateGetter }) {
  getState = stateGetter;
  setPlayerIdGetter(() => stateGetter().playerId);
  requestAnimationFrame(loop);
}

// ----------------------
// LOOP
// ----------------------
function loop() {
  render();
  requestAnimationFrame(loop);
}

// ----------------------
// RENDER
// ----------------------
export function render() {
  const W = canvas.width;
  const H = canvas.height;

  ctx.clearRect(0, 0, W, H);

  const state = getState?.();
  if (!state) return;

  const room = state.room || "lobby";

  drawBackground(ctx, room, backgrounds);

  // WORLD
  if (state.players) {
    drawExits(ctx, state.exits || []);
    drawPlayers(ctx, state.players);
  }

  // UI LAST
  drawUI(ctx, canvas);
}