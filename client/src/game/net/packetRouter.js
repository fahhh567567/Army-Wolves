// game/net/packetRouter.js

export class PacketRouter {
  constructor(handlers = {}) {
    this.handlers = handlers;
  }

  onPacket(packet) {
    const handler = this.handlers[packet.type];

    if (handler) handler(packet);
    else console.warn("[Router] Unknown:", packet.type);
  }
}