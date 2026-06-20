import { ui } from "../assets/assets.js";
import { layoutUI } from "../ui/layout.js";
import { pointerState } from "../input/pointerState.js";

let cachedLayout = null;
let lastCanvasW = 0;
let lastCanvasH = 0;
let layoutDirty = true;

let lastLayoutSnapshot = null;

export function getLastUILayout() {
  return lastLayoutSnapshot;
}

export function invalidateLayout() {
  layoutDirty = true;
}

// ----------------------
// SAFE DRAW HELPER
// ----------------------
function safeDrawImage(ctx, img, x, y, w, h) {
  if (!img) return;
  if (!img.complete) return;
  if (img.naturalWidth === 0) return;

  ctx.drawImage(img, x, y, w, h);
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
  // TOOLBAR HOVER (FIXED)
  // ----------------------
  for (const button of layout.toolbarButtons) {
    if (
      pointerState.x >= button.x &&
      pointerState.x <= button.x + button.w &&
      pointerState.y >= button.y &&
      pointerState.y <= button.y + button.h
    ) {
      button.hover = true;
    }
  }

  // ----------------------
  // MAP HOVER (FIXED)
  // ----------------------
  const map = layout.mapButton;

  map.hover =
    pointerState.x >= map.x &&
    pointerState.x <= map.x + map.w &&
    pointerState.y >= map.y &&
    pointerState.y <= map.y + map.h;

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
    safeDrawImage(
      ctx,
      ui.toolbar,
      layout.toolbar.x,
      layout.toolbar.y,
      layout.toolbar.width,
      layout.toolbar.height
    );
  }

  // ----------------------
  // TOOLTIP (ONLY ONCE)
  // ----------------------
  const hoveredButton = layout.toolbarButtons.find(b => b.hover);

  if (hoveredButton) {
    const text = hoveredButton.label || hoveredButton.id;

    ctx.font = "14px Arial";
    const padding = 6;

    const textWidth = ctx.measureText(text).width;

    const x = hoveredButton.x + hoveredButton.w / 2 - textWidth / 2;
    const y = hoveredButton.y - 25;

    ctx.fillStyle = "rgba(17, 105, 9, 0.7)";
    ctx.fillRect(
      x - padding,
      y - 18,
      textWidth + padding * 2,
      20
    );

    ctx.fillStyle = "white";
    ctx.fillText(text, x, y - 4);
  }

  // ----------------------
  // BUTTONS
  // ----------------------
  for (const button of layout.toolbarButtons) {
    const img = ui[button.id];
    if (!img) continue;

    const isHovered = button.hover;

    const isPressed =
      pointerState.down &&
      pointerState.pressedButton === button.id;

    if (isPressed) {
      ctx.globalAlpha = 0.5;
    } else if (isHovered) {
      ctx.globalAlpha = 0.7;
    } else {
      ctx.globalAlpha = 1;
    }

    safeDrawImage(
      ctx,
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

    safeDrawImage(
      ctx,
      ui.map,
      map.x,
      map.y,
      map.w,
      map.h
    );
  }

  ctx.globalAlpha = 1;
}