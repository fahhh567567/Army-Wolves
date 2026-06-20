// game/gameRender/drawPlayers.js

import { avatars } from "../assets/assets.js";

const lastPositions = {};

let getPlayerId = null;

export function setPlayerIdGetter(fn) {
  getPlayerId = fn;
}

// ----------------------
// DRAW PLAYERS
// ----------------------
export function drawPlayers(ctx, players, localPlayerId) {
  if (!players) return;

  console.log("[RENDER PLAYERS]", players);

  const list = Array.isArray(players)
    ? players
    : Object.values(players);

  for (const p of list) {
    if (!p || p.x == null || p.y == null) continue;

    const id = p.id;
    if (!id) continue;

    let direction = "down";

    const last = lastPositions[id];

    if (last) {
      const dx = p.x - last.x;
      const dy = p.y - last.y;

      const moving = Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5;

      if (moving) {
        direction =
          Math.abs(dx) > Math.abs(dy)
            ? dx > 0 ? "right" : "left"
            : dy > 0 ? "down" : "up";
      }
    }

    lastPositions[id] = { x: p.x, y: p.y };

    const avatar = avatars[direction];

    // ALWAYS SAFE FALLBACK
    if (!avatar || !avatar.complete) {
      ctx.fillStyle = id === localPlayerId ? "blue" : "red";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 15, 0, Math.PI * 2);
      ctx.fill();
      continue;
    }

    const size = 130;
    const offsetY = -35;

    ctx.drawImage(
      avatar,
      p.x - size / 2,
      p.y - size / 2 + offsetY,
      size,
      size
    );
  }
}