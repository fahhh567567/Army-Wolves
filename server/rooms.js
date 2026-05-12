const roomDefs = require("./roomdefs");

const world = {};

for (const roomName in roomDefs) {
  world[roomName] = {
    ...roomDefs[roomName],
    players: {}
  };
}

function movePlayerToRoom(client, id, fromRoom, toRoom) {
  const player = world[fromRoom].players[id];
  if (!player) return;

  delete world[fromRoom].players[id];

  world[toRoom].players[id] = player;
  client.room = toRoom;

  player.x = 200;
  player.y = 200;
  player.targetX = 200;
  player.targetY = 200;
}

module.exports = {
  world,
  movePlayerToRoom
};