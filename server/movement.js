function movePlayer(p) {
  let dx = p.targetX - p.x;
  let dy = p.targetY - p.y;

  const dist = Math.hypot(dx, dy);

  const speed = p.speed || 160;
  const STEP = 0.05;

  const moveAmount = speed * STEP;

  // ✅ prevent overshoot
  if (dist <= moveAmount) {
    p.x = p.targetX;
    p.y = p.targetY;
    return;
  }

  dx /= dist;
  dy /= dist;

  p.x += dx * moveAmount;
  p.y += dy * moveAmount;
}

module.exports = {
  movePlayer
};