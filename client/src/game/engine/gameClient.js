import { NetworkManager } from "../net/networkManager.js";
import { PacketRouter } from "../net/packetRouter.js";

import { worldState } from "../state/worldState.js";
import { stateBuffer } from "../state/stateBuffer.js";

import { startRenderer } from "../gameRender/gameRenderer.js";
import { startInput } from "../input/inputController.js";

export class GameClient {
  constructor(session) {
    this.session = session;

    this.running = false;
    this.lastUpdateTime = 0;
    this.tickRate = 1000 / 60;

    this.network = new NetworkManager(session);

    this.router = new PacketRouter({
      init: (p) => this.onInit(p),
      state: (p) => this.onState(p),
      player_join: (p) => this.onPlayerJoin(p),
      player_leave: (p) => this.onPlayerLeave(p),
      chat: (p) => this.onChat(p),
    });
  }

  // ----------------------
  // START
  // ----------------------
  async start() {
    console.log("[GameClient] Starting...");

    this.running = true;

    this.initWorld();
    this.initInput();
    this.initRender();
    this.connect();
  }

  // ----------------------
  // WORLD INIT
  // ----------------------
  initWorld() {
    worldState.players = {};
    worldState.playerId = this.session.playerId;
    worldState.room = this.session.server || "lobby";
    worldState.exits = [];

    console.log("[GameClient] World:", worldState.room);
  }

  // ----------------------
  // INPUT
  // ----------------------
  initInput() {
    startInput({
      onMove: (x, y) => this.sendMove(x, y),
    });
  }

  // ----------------------
  // RENDER
  // ----------------------
  initRender() {
    startRenderer({
      getState: () => worldState,
    });
  }

  // ----------------------
  // CONNECT
  // ----------------------
  connect() {
    this.network.connect(this.router);

    this.network.socket.on("open", () => {
      console.log("[GameClient] WS connected");
      this.authenticate();
    });

    this.network.socket.on("close", () => {
      console.warn("[GameClient] WS disconnected");
      this.running = false;
    });
  }

  authenticate() {
    this.network.send("auth", {
      token: this.session.token,
      server: this.session.server,
    });
  }

  // ----------------------
  // PACKETS
  // ----------------------
  onInit(packet) {
    console.log("[GameClient] INIT");

    this.session.playerId = packet.id;

    worldState.players = { ...packet.players };
    worldState.room = packet.room;
    worldState.exits = packet.exits || [];

    this.startLoop();
  }

  onState(packet) {
    // ✅ FIX: ROOM MUST UPDATE HERE (THIS WAS YOUR BUG)
    if (packet.room && packet.room !== worldState.room) {
      console.log("[ROOM SWITCH]", worldState.room, "→", packet.room);
      worldState.room = packet.room;

      // optional: clear interpolation when switching rooms
      stateBuffer.clear();
    }

    stateBuffer.push({
      time: packet.time,
      players: packet.players,
    });

    worldState.exits = packet.exits || [];
  }

  onPlayerJoin(packet) {
    worldState.players[packet.id] = packet.player;
  }

  onPlayerLeave(packet) {
    delete worldState.players[packet.id];
  }

  onChat(packet) {
    console.log("[CHAT]", packet.message);
  }

  // ----------------------
  // LOOP
  // ----------------------
  startLoop() {
    const loop = (time) => {
      if (!this.running) return;

      const delta = time - this.lastUpdateTime;

      if (delta >= this.tickRate) {
        this.update();
        this.lastUpdateTime = time;
      }

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  update() {
    this.interpolate();
  }

  // ----------------------
  // INTERPOLATION
  // ----------------------
  interpolate() {
    if (!stateBuffer.buffer.length) return;

    const latest = stateBuffer.buffer[stateBuffer.buffer.length - 1];
    if (!latest?.players) return;

    for (const id in latest.players) {
      worldState.players[id] = {
        ...worldState.players[id],
        ...latest.players[id],
      };
    }
  }

  // ----------------------
  // MOVE
  // ----------------------
  sendMove(x, y) {
    this.network.send("move", { x, y });
  }

  stop() {
    this.running = false;
    this.network.disconnect();
  }
}