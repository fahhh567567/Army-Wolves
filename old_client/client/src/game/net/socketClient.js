import { S2C } from "./protocol.js";

export class SocketClient {
  constructor() {
    this.ws = null;
    this.connected = false;

    this.listeners = {
      open: [],
      close: [],
      message: []
    };
  }

  // --------------------------------------------------
  // CONNECT (SAFE)
  // --------------------------------------------------
  connect(url = "ws://localhost:3000") {
    // 🚨 prevent duplicate sockets
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      console.warn("[Socket] already connected");
      return;
    }

    if (this.ws) {
      this.disconnect();
    }

    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      this.connected = true;
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
      this.connected = false;
      console.log("[Socket] disconnected");
      this.emit("close");
    };

    this.ws.onerror = (err) => {
      console.error("[Socket] error", err);
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
  // CLOSE (CLEAN)
  // --------------------------------------------------
  disconnect() {
    if (!this.ws) return;

    // 🚨 remove handlers first (prevents ghost events)
    this.ws.onopen = null;
    this.ws.onmessage = null;
    this.ws.onclose = null;
    this.ws.onerror = null;

    if (
      this.ws.readyState === WebSocket.OPEN ||
      this.ws.readyState === WebSocket.CONNECTING
    ) {
      this.ws.close();
    }

    this.ws = null;
    this.connected = false;

    console.log("[Socket] fully cleaned");
  }
}