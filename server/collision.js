const roomDefs = require("./roomdefs");

// ----------------------
// EXIT CHECK
// ----------------------
function checkExit(player, roomName) {
  const room = roomDefs[roomName];
  if (!room || !room.exits) return null;

  for (const exit of room.exits) {
    const inside =
      player.x > exit.x &&
      player.x < exit.x + exit.w &&
      player.y > exit.y &&
      player.y < exit.y + exit.h;

    if (inside) {
      return exit.to;
    }
  }

  return null;
}

// ----------------------
// EXPORTS
// ----------------------
module.exports = {
  checkExit
};