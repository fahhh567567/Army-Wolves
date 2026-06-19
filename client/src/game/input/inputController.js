import { getLastUILayout } from "../gameRender/drawUI.js";
import { uiRegistry } from "../ui/registry.js";
import { pointerState } from "./pointerState.js";

let game = null;
let onMove = null;
let initialized = false;

export function initInput(canvas) {
  if (!canvas) {
    throw new Error("Canvas not provided to initInput");
  }

  if (initialized) return;

  game = canvas;

  game.addEventListener("click", handleClick);
  game.addEventListener("mousemove", handleMouseMove);
  game.addEventListener("mousedown", handleMouseDown);
  game.addEventListener("mouseup", handleMouseUp);

  initialized = true;
}

export function destroyInput() {
  if (!game) return;

  game.removeEventListener("click", handleClick);
  game.removeEventListener("mousemove", handleMouseMove);
  game.removeEventListener("mousedown", handleMouseDown);
  game.removeEventListener("mouseup", handleMouseUp);

  game = null;
  initialized = false;
}

export function startInput({ onMove: moveHandler }) {
  onMove = moveHandler;
}

function handleClick(e) {
  const rect = game.getBoundingClientRect();

  const x = (e.clientX - rect.left) * (game.width / rect.width);
  const y = (e.clientY - rect.top) * (game.height / rect.height);

  pointerState.x = x;
  pointerState.y = y;

  const layout = getLastUILayout();

  if (layout) {
    for (const button of layout.toolbarButtons || []) {
      if (
        x >= button.x &&
        x <= button.x + button.w &&
        y >= button.y &&
        y <= button.y + button.h
      ) {
        uiRegistry.toolbarButtons
          ?.find(b => b.id === button.id)
          ?.action?.();

        return;
      }
    }

    const map = layout.mapButton;

    if (
      map &&
      x >= map.x &&
      x <= map.x + map.w &&
      y >= map.y &&
      y <= map.y + map.h
    ) {
      uiRegistry.map?.action?.();
      return;
    }
  }

  onMove?.(x, y);
}

function handleMouseMove(e) {
  const rect = game.getBoundingClientRect();

  pointerState.x =
    (e.clientX - rect.left) * (game.width / rect.width);

  pointerState.y =
    (e.clientY - rect.top) * (game.height / rect.height);
}

function handleMouseDown() {
  pointerState.down = true;
}

function handleMouseUp() {
  pointerState.down = false;
}