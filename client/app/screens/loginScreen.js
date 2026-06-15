export class LoginScreen {
  constructor({ onLoginSuccess }) {
    this.onLoginSuccess = onLoginSuccess;

    this.username = "";
    this.password = "";

    this.focus = "username"; // or "password"

    // UI layout
    this.usernameBox = { x: 350, y: 220, w: 300, h: 40 };
    this.passwordBox = { x: 350, y: 280, w: 300, h: 40 };
    this.buttonBox   = { x: 350, y: 350, w: 300, h: 50 };

    this.error = "";
  }

  enter() {}

  update() {}

  render(ctx) {
    const { width, height } = ctx.canvas;

    // background
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);

    // title
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText("Army Wolves", 360, 140);

    // username box
    this.drawInput(ctx, this.usernameBox, this.username, this.focus === "username");

    // password box
    this.drawInput(ctx, this.passwordBox, "*".repeat(this.password.length), this.focus === "password");

    // login button
    this.drawButton(ctx, this.buttonBox, "Login");

    // error
    ctx.fillStyle = "red";
    ctx.font = "18px Arial";
    ctx.fillText(this.error, 350, 440);
  }

  drawInput(ctx, box, value, active) {
    ctx.strokeStyle = active ? "yellow" : "white";
    ctx.strokeRect(box.x, box.y, box.w, box.h);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(value, box.x + 10, box.y + 25);
  }

  drawButton(ctx, box, text) {
    ctx.strokeStyle = "white";
    ctx.strokeRect(box.x, box.y, box.w, box.h);

    ctx.fillStyle = "white";
    ctx.font = "22px Arial";
    ctx.fillText(text, box.x + 120, box.y + 32);
  }

  pointerDown(x, y) {
    if (this.hit(x, y, this.usernameBox)) {
      this.focus = "username";
      return;
    }

    if (this.hit(x, y, this.passwordBox)) {
      this.focus = "password";
      return;
    }

    if (this.hit(x, y, this.buttonBox)) {
      this.submit();
    }
  }

  keyDown(e) {
    if (e.key === "Backspace") {
      this[this.focus] = this[this.focus].slice(0, -1);
      return;
    }

    if (e.key.length === 1) {
      this[this.focus] += e.key;
    }
  }

  hit(x, y, box) {
    return (
      x >= box.x &&
      x <= box.x + box.w &&
      y >= box.y &&
      y <= box.y + box.h
    );
  }

  submit() {
    this.error = "";

    if (!this.username || !this.password) {
      this.error = "Enter username and password";
      return;
    }

    // fake login success for now
    this.onLoginSuccess?.({
      user: {
        id: this.username
      }
    });
  }

  destroy() {}
}