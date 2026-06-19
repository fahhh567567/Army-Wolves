import { SocketClient } from "../net/socket.js";

import { worldState } from "../state/worldState.js";
import { stateBuffer } from "../state/stateBuffer.js";

import { startRenderer } from "../gameRender/gameRenderer.js";
import { startInput } from "../input/inputController.js";

export class GameClient {
  constructor(session) {
    this.session = session;

    this.socket = new SocketClient();
    this.running = false;

    this.lastUpdateTime = 0;
    this.tickRate = 1000 / 60;
  }

  // --------------------------------------------------
  // START
  // --------------------------------------------------
  async start() {
    console.log("[GameClient] Starting...");

    this.running = true;

    this.initWorld();
    this.initInput();
    this.initRender();
    this.connect();
  }

  // --------------------------------------------------
  // WORLD
  // --------------------------------------------------
  initWorld() {
    worldState.players = {};
    worldState.playerId = this.session.playerId;
    worldState.room = this.session.server || "lobby";

    console.log("[GameClient] World:", worldState.room);
  }

  // --------------------------------------------------
  // INPUT
  // --------------------------------------------------
  initInput() {
    startInput({
      onMove: (x, y) => this.sendMove(x, y)
    });
  }

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------
  initRender() {
    startRenderer({
      getState: () => worldState
    });
  }

  // --------------------------------------------------
  // SOCKET CONNECTION
  // --------------------------------------------------
  connect() {
    this.socket.connect();

    // connection events
    this.socket.on("open", () => {
      console.log("[GameClient] WS connected");
      this.authenticate();
    });

    this.socket.on("close", () => {
      console.warn("[GameClient] WS disconnected");
      this.running = false;
    });

    // packet handler
    this.socket.on("message", (packet) => {
      this.handlePacket(packet);
    });
  }

  // --------------------------------------------------
  // AUTH
  // --------------------------------------------------
  authenticate() {
    this.socket.send("auth", {
      token: this.session.token,
      server: this.session.server
    });
  }

  // --------------------------------------------------
  // PACKET ROUTING
  // --------------------------------------------------
  handlePacket(packet) {
    switch (packet.type) {

      case "init": {
        console.log("[GameClient] INIT");

        this.session.playerId = packet.id;

        worldState.players = { ...packet.players };
        worldState.room = packet.room;

        this.startLoop();
        break;
      }

      case "state": {
        stateBuffer.push({
          time: packet.time,
          players: packet.players
        });
        break;
      }

      case "player_join": {
        worldState.players[packet.id] = packet.player;
        break;
      }

      case "player_leave": {
        delete worldState.players[packet.id];
        break;
      }

      case "chat": {
        console.log("[CHAT]", packet.message);
        break;
      }

      default:
        console.warn("[GameClient] Unknown packet:", packet.type);
    }
  }

  // --------------------------------------------------
  // LOOP
  // --------------------------------------------------
  startLoop() {
    const loop = (time) => {
      if (!this.running) return;

      const delta = time - this.lastUpdateTime;

      if (delta >= this.tickRate) {
        this.update(delta);
        this.lastUpdateTime = time;
      }

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  // --------------------------------------------------
  // UPDATE
  // --------------------------------------------------
  update(delta) {
    this.interpolate();
    this.updateSystems(delta);
  }

  // --------------------------------------------------
  // INTERPOLATION (safe version)
  // --------------------------------------------------
  interpolate() {
    if (stateBuffer.length < 1) return;

    const latest = stateBuffer[stateBuffer.length - 1];
    if (!latest?.players) return;

    for (const id in latest.players) {
      worldState.players[id] = {
        ...worldState.players[id],
        ...latest.players[id]
      };
    }
  }

  // --------------------------------------------------
  // SYSTEMS
  // --------------------------------------------------
  updateSystems(delta) {
    // camera, animations, particles later
  }

  // --------------------------------------------------
  // MOVE
  // --------------------------------------------------
  sendMove(x, y) {
    this.socket.send("move", { x, y });
  }

  // --------------------------------------------------
  // STOP
  // --------------------------------------------------
  stop() {
    this.running = false;
    this.socket.disconnect();
  }
}