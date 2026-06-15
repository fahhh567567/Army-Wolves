import { ui } from "../assets/assets.js";
import { layoutUI } from "../ui/layout.js";

let cachedLayout = null;
let lastCanvasW = 0;
let lastCanvasH = 0;
let layoutDirty = true;

// instead of exporting raw global state
let lastLayoutSnapshot = null;

export function getLastUILayout() {
  return lastLayoutSnapshot;
}

export function invalidateLayout() {
  layoutDirty = true;
}

export function drawUI(ctx, canvas, inputState) {
  const mouse = inputState?.mouse;

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
    lastLayoutSnapshot = cachedLayout;
  }

  const layout = cachedLayout;

  // ----------------------
  // RESET HOVER
  // ----------------------
  for (const button of layout.toolbarButtons) {
    button.hover = false;
  }

  // ----------------------
  // TOOLBAR HOVER
  // ----------------------
  for (const button of layout.toolbarButtons) {
    if (
      mouse?.x >= button.x &&
      mouse?.x <= button.x + button.w &&
      mouse?.y >= button.y &&
      mouse?.y <= button.y + button.h
    ) {
      button.hover = true;
    }
  }

  // ----------------------
  // MAP HOVER
  // ----------------------
  const map = layout.mapButton;

  map.hover =
    mouse?.x >= map.x &&
    mouse?.x <= map.x + map.w &&
    mouse?.y >= map.y &&
    mouse?.y <= map.y + map.h;

  // ----------------------
  // HUD DEBUG
  // ----------------------
  ctx.strokeStyle = "red";
  ctx.strokeRect(
    layout.hud.x,
    layout.hud.y,
    layout.hud.width,
    layout.hud.height
  );

  // ----------------------
  // TOOLBAR
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
  // BUTTONS
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
  // MAP
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