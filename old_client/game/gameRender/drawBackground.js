export function drawBackground(ctx, room, getBackground) {
  const bg = getBackground(room);

  const canvas = ctx.canvas;
  const W = canvas.width;
  const H = canvas.height;

  if (!bg || !bg.complete) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, W, H);
    return;
  }

  ctx.drawImage(bg, 0, 0, W, H);
}