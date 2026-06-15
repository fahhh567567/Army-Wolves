export class LoadingScreen {
  constructor({ message = "Loading..." } = {}) {
    this.message = message;
  }

  enter() {}

  setMessage(msg) {
    this.message = msg;
  }

  update() {}

  render(ctx) {
    // background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // title
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText("Loading", 420, 200);

    // message
    ctx.font = "20px Arial";
    ctx.fillText(this.message, 400, 280);
  }

  destroy() {
    // nothing to clean up (no DOM)
  }
}