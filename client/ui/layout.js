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
    width: 750 * 1.25,
    height: 225 * 1.25
  };

  toolbar.x = (hud.width - toolbar.width) / 2;
  toolbar.y = hud.y - 40;

  // ----------------------
  // BUTTONS
  // ----------------------
  const toolbarButtons = uiRegistry.toolbarButtons;

  const buttonWidth = 60;
  const buttonHeight = 60;

  // ----------------------
  // TWEAKABLE LAYOUT SETTINGS
  // ----------------------
  const leftBuffer = 0.011;
  const spacing = 0.07;
  const centerGap = 0.37;

  const yOffset = 0.51; // 👈 tweak this to move whole row up/down

  let x = toolbar.x + toolbar.width * leftBuffer;

  const centerY =
    toolbar.y +
    toolbar.height * yOffset -
    buttonHeight / 2;

  // ----------------------
  // LAYOUT LOOP
  // ----------------------
  for (let i = 0; i < toolbarButtons.length; i++) {

    const button = toolbarButtons[i];

    button.w = buttonWidth;
    button.h = buttonHeight;

    // center gap after 4 buttons
    if (i === 4) {
      x += toolbar.width * centerGap;
    }

    button.x = x;
    button.y = centerY;
    button.hover = false;
    button.pressed = false;

    x += toolbar.width * spacing;
  }

  // ----------------------
  // MAP BUTTON
  // ----------------------
  const mapButton = uiRegistry.map;

  mapButton.x = hud.width - 250;
  mapButton.y = hud.y + 20;
  mapButton.w = 120;
  mapButton.h = 144;

  return {
    hud,
    toolbar,
    toolbarButtons,
    mapButton
  };
}