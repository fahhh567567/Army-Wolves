export function drawBackground(ctx) {
  const { width, height } = ctx.canvas;

  const g = ctx.createLinearGradient(0, 0, 0, height);
  g.addColorStop(0, "#1d2614");
  g.addColorStop(1, "#0e140a");

  ctx.fillStyle = g;
  ctx.fillRect(0, 0, width, height);
}