import { sendMove } from "../state/network.js";
import { lastUILayout } from "../render/drawUI.js";
import { uiRegistry } from "../ui/registry.js";
import { mouseState } from "./mouseState.js";

const game = document.getElementById("game");

// ----------------------
// CLICK
// ----------------------
game.addEventListener("click", (e) => {

  const rect = game.getBoundingClientRect();

  const x = (e.clientX - rect.left) * (game.width / rect.width);
  const y = (e.clientY - rect.top) * (game.height / rect.height);

  mouseState.x = x;
  mouseState.y = y;

  const layout = lastUILayout;

  // -------------------------
  // UI HIT TEST FIRST
  // -------------------------
  if (layout) {

    // toolbar buttons
    for (const button of layout.toolbarButtons) {

      if (
        x >= button.x &&
        x <= button.x + button.w &&
        y >= button.y &&
        y <= button.y + button.h
      ) {
        uiRegistry.toolbarButtons
          .find(b => b.id === button.id)
          ?.action?.();

        return; // UI consumed click
      }
    }

    // map button
    const map = layout.mapButton;

    if (
      x >= map.x &&
      x <= map.x + map.w &&
      y >= map.y &&
      y <= map.y + map.h
    ) {
      uiRegistry.map?.action?.();
      return; // UI consumed click
    }
  }

  // -------------------------
  // FALLBACK: GAME CLICK
  // -------------------------
  sendMove(x, y);
});


// ----------------------
// MOUSE MOVE
// ----------------------
game.addEventListener("mousemove", (e) => {

  const rect = game.getBoundingClientRect();

  mouseState.x = (e.clientX - rect.left) * (game.width / rect.width);
  mouseState.y = (e.clientY - rect.top) * (game.height / rect.height);
});

game.addEventListener("mousedown", () => mouseState.down = true);
game.addEventListener("mouseup", () => mouseState.down = false);