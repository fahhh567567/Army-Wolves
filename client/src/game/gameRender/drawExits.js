let mouseX = 0;
let mouseY = 0;

// --------------------------------------------------
// MOUSE POSITION INJECTION (from input system)
// --------------------------------------------------
export function setMouse(posX, posY) {
  mouseX = posX;
  mouseY = posY;
}

// --------------------------------------------------
// DRAW EXITS (PURE RENDER FUNCTION)
// --------------------------------------------------
export function drawExits(ctx, exits = []) {
  let hovering = false;

  for (const exit of exits) {
    const hovered =
      mouseX > exit.x &&
      mouseX < exit.x + exit.w &&
      mouseY > exit.y &&
      mouseY < exit.y + exit.h;

    if (hovered) hovering = true;

    const pulse = 0.6 + Math.sin(Date.now() * 0.005) * 0.2;

    ctx.shadowColor = "rgba(255,220,120,1)";
    ctx.shadowBlur = hovered ? 50 : 0;

    ctx.fillStyle = hovered
      ? `rgba(255,240,180,${pulse})`
      : "rgba(255,220,140,0.4)";

    ctx.fillRect(exit.x, exit.y, exit.w, exit.h);

    ctx.strokeStyle = hovered
      ? "white"
      : "rgba(255,240,180,0.5)";

    ctx.lineWidth = hovered ? 3 : 2;
    ctx.strokeRect(exit.x, exit.y, exit.w, exit.h);

    ctx.shadowBlur = 0;
  }

  return hovering;
}