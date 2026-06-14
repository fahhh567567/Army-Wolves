// game/net/socket.js

import { S2C } from "./protocol.js";

export class SocketClient {
  constructor() {
    this.ws = null;

    // event listeners (external system hooks into this)
    this.listeners = {
      open: [],
      close: [],
      message: []
    };
  }

  // --------------------------------------------------
  // CONNECT
  // --------------------------------------------------
  connect(url = "ws://localhost:3000") {
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      console.log("[Socket] connected");
      this.emit("open");
    };

    this.ws.onmessage = (event) => {
      try {
        const packet = JSON.parse(event.data);
        this.emit("message", packet);
      } catch (err) {
        console.error("[Socket] invalid packet", err);
      }
    };

    this.ws.onclose = () => {
      console.log("[Socket] disconnected");
      this.emit("close");
    };
  }

  // --------------------------------------------------
  // SEND
  // --------------------------------------------------
  send(type, data = {}) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

    this.ws.send(
      JSON.stringify({
        type,
        ...data
      })
    );
  }

  // --------------------------------------------------
  // EVENT SYSTEM
  // --------------------------------------------------
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  emit(event, data) {
    const list = this.listeners[event];
    if (!list) return;

    for (const cb of list) {
      cb(data);
    }
  }

  // --------------------------------------------------
  // CLOSE
  // --------------------------------------------------
  disconnect() {
    if (this.ws) this.ws.close();
  }
}