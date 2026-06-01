import { ui } from "./assets.js";
import { layoutUI } from "../ui/layout.js";

export function drawUI(ctx, canvas) {

  const layout =
    layoutUI(canvas);

  // ----------------------
  // DEBUG HUD BORDER
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
  ctx.drawImage(
    ui.toolbar,
    layout.toolbar.x,
    layout.toolbar.y,
    layout.toolbar.width,
    layout.toolbar.height
  );

  // ----------------------
  // TOOLBAR BUTTONS
  // ----------------------
  for (const button of layout.toolbarButtons) {

    const img =
      ui[button.id];

    if (!img) continue;

    ctx.drawImage(
      img,
      button.x,
      button.y,
      button.w,
      button.h
    );
  }

  // ----------------------
  // MAP BUTTON
  // ----------------------
  ctx.drawImage(
    ui.map,
    layout.mapButton.x,
    layout.mapButton.y,
    layout.mapButton.w,
    layout.mapButton.h
  );
}