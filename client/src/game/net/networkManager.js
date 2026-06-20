// game/net/networkManager.js

import { SocketClient } from "./socketClient.js";

export class NetworkManager {
  constructor(protocol) {
    this.socket = new SocketClient();
    this.protocol = protocol;

    this.connected = false;
    this.router = null;
  }

  connect(router, url = "ws://localhost:3000") {
    this.router = router;

    this.socket.connect(url);

    this.socket.on("open", () => {
      this.connected = true;
      console.log("[Network] connected");
    });

    this.socket.on("close", () => {
      this.connected = false;
      console.log("[Network] disconnected");
    });

    this.socket.on("message", (packet) => {
      this.route(packet);
    });
  }

  route(packet) {
    if (!packet?.type) {
      console.warn("[Network] packet missing type", packet);
      return;
    }

    if (!this.router) {
      console.warn("[Network] no router");
      return;
    }

    this.router.onPacket(packet);
  }

  send(type, data = {}) {
    const packet = {
      type,
      ...data
    };

    console.log("[Network] sending:", packet);

    this.socket.send(packet);
  }

  auth(token, server) {
    this.send(this.protocol.C2S.AUTH, {
      token,
      server
    });
  }

  move(x, y) {
    this.send(this.protocol.C2S.MOVE, {
      x,
      y
    });
  }

  chat(message) {
    this.send(this.protocol.C2S.CHAT, {
      message
    });
  }

  ping() {
    this.send(this.protocol.C2S.PING);
  }

  disconnect() {
    this.socket.disconnect();
    this.connected = false;
  }
}