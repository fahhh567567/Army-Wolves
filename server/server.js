console.log("SERVER FILE LOADED");

const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3000 });

const { movePlayer } = require("./movement");

const { createPlayer } = require("./players");

const { checkExit } = require("./collision");

const {
  world,
  movePlayerToRoom
} = require("./rooms");


// ----------------------
// CONNECTION
// ----------------------
wss.on("connection", (ws) => {
  const id = Math.random().toString(36).slice(2);

  ws.id = id;
  ws.room = "lobby";

  world.lobby.players[id] = createPlayer();

  ws.send(JSON.stringify({
    type: "init",
    id
  }));

  ws.on("message", (msg) => {
    const data = JSON.parse(msg);

    if (data.type === "move") {
      const p = world[ws.room].players[ws.id];
      if (!p) return;

      p.targetX = data.x;
      p.targetY = data.y;
    }

    if (data.type === "joinRoom") {
      const newRoom = data.room;
      if (!world[newRoom]) return;

      movePlayerToRoom(ws, ws.id, ws.room, newRoom);
    }
  });

  ws.on("close", () => {
    delete world[ws.room].players[ws.id];
  });
});

// ----------------------
// WORLD UPDATE LOOP
// ----------------------
function updateWorld() {
  for (const roomName in world) {
    const room = world[roomName];

    for (const id in room.players) {
      const p = room.players[id];

      movePlayer(p);

      const newRoom = checkExit(p, roomName);

      if (newRoom && newRoom !== roomName) {
        const client = [...wss.clients].find(c => c.id === id);
        if (client) movePlayerToRoom(client, id, roomName, newRoom);
        break;
      }
    }
  }
}
// ----------------------
// BROADCAST LOOP
// ----------------------
setInterval(() => {
  updateWorld();

  wss.clients.forEach(client => {
    if (client.readyState !== WebSocket.OPEN) return;

    const room = world[client.room];
    if (!room) return;

    console.log("SENDING STATE", Object.keys(room.players));

    client.send(JSON.stringify({
  type: "state",
  time: Date.now(),
  players: structuredClone(room.players)
}));

  });

}, 50);

console.log("Server running on ws://localhost:3000");