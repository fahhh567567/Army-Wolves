const roomDefs =
  require("./roomdefs");

function applySpawn(
  player,
  roomName
) {

  const room =
    roomDefs[roomName];

  if (!room) return;

  const spawn =
    room.spawn;

  player.x = spawn.x;
  player.y = spawn.y;

  player.targetX = spawn.x;
  player.targetY = spawn.y;
}

module.exports = {
  applySpawn
};