console.log("SERVER FILE LOADED");

// ----------------------
// IMPORTS
// ----------------------
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const crypto = require("crypto");
const path = require("path");

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

/**
 * Serve ONLY public assets cleanly
 * (prevents leaking server folders + fixes asset resolution issues)
 */
app.use(express.static(path.join(__dirname, "../client/new_client/public")));

// ----------------------
// ROOT PAGE
// ----------------------
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/new_client/public/play.html")
  );
});

// ----------------------
// API ROUTES
// ----------------------
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
// SAFE ROOM INIT
// ----------------------
function ensureRoom(roomId) {
  if (!worldState[roomId]) {
    worldState[roomId] = {
      players: {},
      exits: []
    };
  }
  return worldState[roomId];
}

// ----------------------
// BROADCAST FUNCTION
// ----------------------
function broadcast() {
  wss.clients.forEach((client) => {
    if (client.readyState !== WebSocket.OPEN) return;

    const room = worldState[client.room];
    if (!room || !room.players) return;

    client.send(
      JSON.stringify({
        type: "state",
        time: Date.now(),
        players: room.players,
        room: client.room,
        exits: roomDefs?.[client.room]?.interactions || []
      })
    );
  });
}

// ----------------------
// WEBSOCKET CONNECTIONS
// ----------------------
wss.on("connection", (ws) => {
  const id = crypto.randomUUID();

  ws.id = id;
  ws.room = "lobby";

  // ensure room exists
  const room = ensureRoom("lobby");

  // create player
  const player = {
    id,
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    speed: 190
  };

  applySpawn(player, "lobby");

  room.players[id] = player;

  // ----------------------
  // IMPORTANT: FULL INIT PACKET (FIX)
  // ----------------------
  ws.send(
    JSON.stringify({
      type: "init",
      id,
      room: ws.room,
      players: room.players
    })
  );

  // ----------------------
  // MESSAGE HANDLER
  // ----------------------
  ws.on("message", (msg) => {
    let data;

    try {
      data = JSON.parse(msg);
    } catch {
      return;
    }

    const room = worldState[ws.room];
    if (!room) return;

    const player = room.players[ws.id];
    if (!player) return;

    // ----------------------
    // MOVE
    // ----------------------
    if (data.type === "move") {
      player.targetX = data.x;
      player.targetY = data.y;
    }
  });

  // ----------------------
  // CLEANUP
  // ----------------------
  ws.on("close", () => {
    const room = worldState[ws.room];
    if (!room || !room.players) return;

    delete room.players[ws.id];
  });
});

// ----------------------
// STARTUP FLOW
// ----------------------
async function start() {
  try {
    await initDB();

    server.listen(3000, () => {
      console.log(
        "HTTP + WS SERVER RUNNING ON http://localhost:3000"
      );
    });

    startEngine(wss, broadcast);

  } catch (err) {
    console.error("SERVER START FAILED:", err);
    process.exit(1);
  }
}

// ----------------------
// BOOT
// ----------------------
start();