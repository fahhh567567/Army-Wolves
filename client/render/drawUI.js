import { ui } from "./assets.js";
import { layoutUI } from "../ui/layout.js";
import { mouseState } from "../input/mouseState.js";

let cachedLayout = null;
let lastCanvasW = 0;
let lastCanvasH = 0;
let layoutDirty = true;

// Exposed to input system
export let lastUILayout = null;

export function invalidateLayout() {
  layoutDirty = true;
}

export function drawUI(ctx, canvas) {

  const shouldRebuild =
    layoutDirty ||
    !cachedLayout ||
    canvas.width !== lastCanvasW ||
    canvas.height !== lastCanvasH;

  if (shouldRebuild) {
    cachedLayout = layoutUI(canvas);

    lastCanvasW = canvas.width;
    lastCanvasH = canvas.height;

    layoutDirty = false;
    lastUILayout = cachedLayout;
  }

  const layout = cachedLayout;

  // ----------------------
  // RESET HOVER STATE
  // ----------------------
  for (const button of layout.toolbarButtons) {
    button.hover = false;
  }

  // ----------------------
  // TOOLBAR HOVER DETECTION
  // ----------------------
  for (const button of layout.toolbarButtons) {
    if (
      mouseState.x >= button.x &&
      mouseState.x <= button.x + button.w &&
      mouseState.y >= button.y &&
      mouseState.y <= button.y + button.h
    ) {
      button.hover = true;
    }
  }

  // ----------------------
  // MAP HOVER DETECTION
  // ----------------------
  const map = layout.mapButton;

  map.hover =
    mouseState.x >= map.x &&
    mouseState.x <= map.x + map.w &&
    mouseState.y >= map.y &&
    mouseState.y <= map.y + map.h;

  // ----------------------
  // HUD DEBUG BORDER
  // ----------------------
  ctx.strokeStyle = "red";

  ctx.strokeRect(
    layout.hud.x,
    layout.hud.y,
    layout.hud.width,
    layout.hud.height
  );

  // ----------------------
  // TOOLBAR BACKGROUND
  // ----------------------
  if (ui.toolbar) {
    ctx.drawImage(
      ui.toolbar,
      layout.toolbar.x,
      layout.toolbar.y,
      layout.toolbar.width,
      layout.toolbar.height
    );
  }

  // ----------------------
  // TOOLBAR BUTTONS
  // ----------------------
  for (const button of layout.toolbarButtons) {

    const img = ui[button.id];

    if (!img) continue;

    ctx.globalAlpha = button.hover ? 0.7 : 1;

    ctx.drawImage(
      img,
      button.x,
      button.y,
      button.w,
      button.h
    );
  }

  ctx.globalAlpha = 1;

  // ----------------------
  // MAP BUTTON
  // ----------------------
  if (ui.map) {

    ctx.globalAlpha = map.hover ? 0.7 : 1;

    ctx.drawImage(
      ui.map,
      map.x,
      map.y,
      map.w,
      map.h
    );
  }

  ctx.globalAlpha = 1;
}