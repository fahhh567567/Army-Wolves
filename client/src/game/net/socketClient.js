// game/net/socketClient.js

export class SocketClient {
  constructor() {
    this.ws = null;
    this.listeners = {};
  }

  connect(url = "ws://localhost:3000") {
    if (this.ws) {
      this.disconnect();
    }

    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      console.log("[Socket] connected");
      this.emit("open");
    };

    this.ws.onclose = () => {
      console.log("[Socket] disconnected");
      this.emit("close");
    };

    this.ws.onerror = (err) => {
      console.error("[Socket] error", err);
    };

    this.ws.onmessage = (event) => {
      try {
        const packet = JSON.parse(event.data);
        this.emit("message", packet);
      } catch (e) {
        console.error("[Socket] bad packet", e);
      }
    };
  }

  send(packet) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn("[Socket] send failed: socket not open");
      return;
    }

    console.log("[Socket] sending:", packet);

    this.ws.send(JSON.stringify(packet));
  }

  on(event, cb) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(cb);
  }

  emit(event, data) {
    (this.listeners[event] || []).forEach(cb => cb(data));
  }

  disconnect() {
    if (!this.ws) return;

    this.ws.close();
    this.ws = null;
  }
}