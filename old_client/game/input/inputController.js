import { getLastUILayout } from "../gameRender/drawUI.js";
import { uiRegistry } from "../ui/registry.js";
import { pointerState } from "./pointerState.js";

const game = document.getElementById("game");

let onMove = null;

// injected by GameClient
export function startInput({ onMove: moveHandler }) {
  onMove = moveHandler;
}

// ----------------------
// CLICK
// ----------------------
game.addEventListener("click", (e) => {
  const rect = game.getBoundingClientRect();

  const x = (e.clientX - rect.left) * (game.width / rect.width);
  const y = (e.clientY - rect.top) * (game.height / rect.height);

  pointerState.x = x;
  pointerState.y = y;

  const layout = getLastUILayout();

  // UI FIRST
  if (layout) {
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

        return;
      }
    }

    const map = layout.mapButton;

    if (
      x >= map.x &&
      x <= map.x + map.w &&
      y >= map.y &&
      y <= map.y + map.h
    ) {
      uiRegistry.map?.action?.();
      return;
    }
  }

  // GAME ACTION → ONLY forward intent
  onMove?.(x, y);
});

// ----------------------
// MOVE
// ----------------------
game.addEventListener("mousemove", (e) => {
  const rect = game.getBoundingClientRect();

  pointerState.x =
    (e.clientX - rect.left) * (game.width / rect.width);

  pointerState.y =
    (e.clientY - rect.top) * (game.height / rect.height);
});

game.addEventListener("mousedown", () => {
  pointerState.down = true;
});

game.addEventListener("mouseup", () => {
  pointerState.down = false;
});