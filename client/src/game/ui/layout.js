import { uiRegistry } from "./registry.js";

export function layoutUI(canvas) {

  const hudHeight = 80;

  const hud = {
    x: 0,
    y: canvas.height - hudHeight,
    width: canvas.width,
    height: hudHeight
  };

  const toolbar = {
    width: 750 * 1.25,
    height: 225 * 1.25,
    x: (canvas.width - 750 * 1.25) / 2,
    y: hud.y -95
  };

  const buttonWidth = 55;
  const buttonHeight = 55;

  const leftBuffer = 0.0159;
  const spacing = 0.0658;
  const centerGap = 0.38;
  const yOffset = 0.51;

  let x = toolbar.x + toolbar.width * leftBuffer;

  const centerY =
    toolbar.y +
    toolbar.height * yOffset -
    buttonHeight / 2;

  const toolbarButtons = uiRegistry.toolbarButtons.map((btn, i) => {

    if (i === 4) {
      x += toolbar.width * centerGap;
    }

    const layoutBtn = {
      id: btn.id,
      x,
      y: centerY,
      w: buttonWidth,
      h: buttonHeight,
      hover: false,
      pressed: false
    };

    x += toolbar.width * spacing;

    return layoutBtn;
  });

  const mapButton = {
    id: "map",
    x: canvas.width - 250,
    y: hud.y -40,
    w: 120,
    h: 144,
    hover: false
  };

  return {
    hud,
    toolbar,
    toolbarButtons,
    mapButton
  };
}