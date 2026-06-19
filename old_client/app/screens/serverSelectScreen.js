export class ServerSelectScreen {
  constructor({ onJoin }) {
    this.onJoin = onJoin;

    this.servers = [
      { id: "lobby", name: "Lobby Server", x: 350, y: 220, w: 300, h: 50 },
      { id: "room1", name: "Room 1", x: 350, y: 300, w: 300, h: 50 },
    ];
  }

  enter() {}

  update() {}

  render(ctx) {
    const { width, height } = ctx.canvas;

    // background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    // title
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText("Select Server", 380, 120);

    // server buttons
    for (const s of this.servers) {
      this.drawServer(ctx, s);
    }
  }

  drawServer(ctx, s) {
    ctx.strokeStyle = "white";
    ctx.strokeRect(s.x, s.y, s.w, s.h);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(s.name, s.x + 20, s.y + 32);
  }

  pointerDown(x, y) {
    for (const s of this.servers) {
      if (this.hit(x, y, s)) {
        this.onJoin?.(s.id);
      }
    }
  }

  hit(x, y, b) {
    return (
      x >= b.x &&
      x <= b.x + b.w &&
      y >= b.y &&
      y <= b.y + b.h
    );
  }

  destroy() {}
}