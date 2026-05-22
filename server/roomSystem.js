const { worldState } =
  require("./worldState");

const { applySpawn } =
  require("./spawnSystem");

function movePlayerToRoom(
  client,
  id,
  fromRoom,
  toRoom
) {

  const player =
    worldState[fromRoom]
      .players[id];

  if (!player) return;

  // remove from old room
  delete worldState[fromRoom]
    .players[id];

  // apply room spawn
  applySpawn(player, toRoom);

  // add to new room
  worldState[toRoom]
    .players[id] = player;

  // update socket room
  client.room = toRoom;
}

module.exports = {
  movePlayerToRoom
};