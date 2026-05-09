const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3000 });

const players = {};

function updateWorld() {
  Object.values(players).forEach(player => {
    let dx = player.targetX - player.x;
    let dy = player.targetY - player.y;

    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 2) {
      dx /= dist;
      dy /= dist;

      player.x += dx * player.speed;
      player.y += dy * player.speed;
    }
  });
}

setInterval(() => {
  updateWorld();

  const payload = JSON.stringify({
    type: "state",
    players
  });

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });

}, 1000 / 60);

wss.on("connection", (ws) => {

  const id = Math.random().toString(36).slice(2);

  players[id] = {
    x: 200,
    y: 200,
    targetX: 200,
    targetY: 200,
    speed: 5
  };

  ws.send(JSON.stringify({
    type: "init",
    id
  }));

  ws.on("message", (msg) => {
    const data = JSON.parse(msg);

    if (data.type === "move") {
      players[id].targetX = data.x;
      players[id].targetY = data.y;
    }
  });

  ws.on("close", () => {
    delete players[id];
  });
});

console.log("Server running on ws://localhost:3000");