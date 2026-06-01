import { uiRegistry } from "./registry.js";

export function layoutUI(canvas) {

  // ----------------------
  // HUD
  // ----------------------
  const hudHeight = 140;

  const hud = {
    x: 0,
    y: canvas.height - hudHeight,
    width: canvas.width,
    height: hudHeight
  };

  // ----------------------
  // TOOLBAR
  // ----------------------
  const toolbar = {
    width: 750,
    height: 225
  };

  toolbar.x =
    hud.x +
    hud.width / 2 -
    toolbar.width / 2;

  toolbar.y =
    hud.y;

// ----------------------
// TOOLBAR BUTTONS
// ----------------------
const toolbarButtons =
  uiRegistry.toolbarButtons;

const buttonWidth = 300;
const buttonHeight = 115;

const leftPadding = 27;

const normalGap = -350;
const chatGap = 120;

let x =
  toolbar.x + leftPadding;

toolbarButtons.forEach((button, i) => {

  button.x = x;

  button.y =
    toolbar.y + 25;

  button.w = buttonWidth;
  button.h = buttonHeight;

  x += buttonWidth;

  if (i === 3) {
    x += chatGap;
  } else {
    x += normalGap;
  }
});
  // ----------------------
  // MAP BUTTON
  // ----------------------
  const mapButton =
    uiRegistry.map;

  mapButton.x =
    hud.width - 270;

  mapButton.y =
    hud.y + 35;

  mapButton.w = 100;
  mapButton.h = 120;

  // ----------------------
  // RETURN LAYOUT
  // ----------------------
  return {
    hud,
    toolbar,
    toolbarButtons,
    mapButton
  };
}