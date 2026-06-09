console.log("SERVER FILE LOADED");

// ----------------------
// IMPORTS
// ----------------------
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const crypto = require("crypto");

const authRoutes = require("./api/auth");
const { initDB } = require("./db/init");

const { worldState } = require("./worldState");
const { startEngine } = require("./engine");
const { applySpawn } = require("./spawnSystem");
const roomDefs = require("./roomdefs");

// ----------------------
// EXPRESS APP
// ----------------------
const app = express();
app.use(express.json());

// serve client
const path = require("path");

app.use(express.static(path.join(__dirname, "../client")));

// API routes
app.use("/api", authRoutes);

// ----------------------
// HTTP SERVER
// ----------------------
const server = http.createServer(app);

// ----------------------
// WEBSOCKET SERVER
// ----------------------
const wss = new WebSocket.Server({ server });

// ----------------------
// BROADCAST FUNCTION
// ----------------------
function broadcast() {
  wss.clients.forEach((client) => {
    if (client.readyState !== WebSocket.OPEN) return;

    const room = worldState[client.room];
    if (!room) return;

    client.send(JSON.stringify({
      type: "state",
      time: Date.now(),
      players: room.players,
      room: client.room,
      exits: roomDefs[client.room]?.interactions || []
    }));
  });
}

// ----------------------
// WEBSOCKET CONNECTIONS
// ----------------------
wss.on("connection", (ws) => {
  const id = crypto.randomUUID();

  ws.id = id;
  ws.room = "lobby";

  const player = {
    speed: 190
  };

  applySpawn(player, "lobby");

  worldState.lobby.players[id] = player;

  ws.send(JSON.stringify({
    type: "init",
    id
  }));

  ws.on("message", (msg) => {
    let data;
    try {
      data = JSON.parse(msg);
    } catch {
      return;
    }

    if (data.type === "move") {
      const room = worldState[ws.room];
      if (!room) return;

      const player = room.players[ws.id];
      if (!player) return;

      player.targetX = data.x;
      player.targetY = data.y;
    }
  });

  ws.on("close", () => {
    const room = worldState[ws.room];
    if (!room) return;

    delete room.players[ws.id];
  });
});

// ----------------------
// STARTUP FLOW (IMPORTANT)
// ----------------------
async function start() {
  try {
    await initDB();

    server.listen(3000, () => {
      console.log("HTTP + WS SERVER RUNNING ON http://localhost:3000");
    });

    startEngine(wss, broadcast);

  } catch (err) {
    console.error("SERVER START FAILED:", err);
    process.exit(1);
  }
}

// boot
start();