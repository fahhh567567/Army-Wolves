import { drawBackground } from "../appRender/drawBackground.js";
import { loginView } from "../views/loginScreenView.js";

export class AppRenderer {
  constructor(ctx) {
    this.ctx = ctx;
  }

  render(screen) {
    if (!screen) return;

    drawBackground(this.ctx);

    switch (screen.type) {
      case "login":
        this.renderLogin(screen);
        break;
    }
  }

  renderLogin(screen) {
    const ctx = this.ctx;
    const { width, height } = ctx.canvas;
    const v = loginView;

    const usernameValue = screen.form.fields.username.value;
    const passwordValue = screen.form.fields.password.value;

    // Panel position
    const panelX = (width - v.panel.width) / 2;
    const panelY = (height - v.panel.height) / 2;

    // Panel
    ctx.fillStyle = v.colors.panel;
    ctx.fillRect(panelX, panelY, v.panel.width, v.panel.height);

    ctx.strokeStyle = v.colors.border;
    ctx.strokeRect(panelX, panelY, v.panel.width, v.panel.height);

    // Title
    this.drawTitle(
      v.title.text,
      width * v.title.xRatio,
      panelY - v.title.yOffset,
      v
    );

    // Layout positions
    const inputX = panelX + v.panel.paddingX;
    const usernameY = panelY + v.layout.username.offsetY;
    const passwordY = panelY + v.layout.password.offsetY;
    const buttonY = panelY + v.layout.button.offsetY;

    // Inputs
    this.drawInput(
      usernameValue,
      inputX,
      usernameY,
      "Username",
      v.layout.username,
      v
    );

    this.drawInput(
      passwordValue ? "*".repeat(passwordValue.length) : "",
      inputX,
      passwordY,
      "Password",
      v.layout.password,
      v
    );

    // Button
    this.drawButton(
      "LOGIN",
      inputX,
      buttonY,
      v.layout.button,
      v
    );

    // Error
    if (screen.error) {
      ctx.fillStyle = v.error.color;
      ctx.font = v.error.font;
      ctx.fillText(
        screen.error,
        inputX,
        panelY + v.error.offsetY
      );
    }
  }

  drawTitle(text, x, y, v) {
    const ctx = this.ctx;

    ctx.fillStyle = v.title.color;
    ctx.font = v.title.font;
    ctx.textAlign = "center";
    ctx.fillText(text, x, y);
    ctx.textAlign = "left";
  }

  drawInput(value, x, y, placeholder, box, v) {
    const ctx = this.ctx;

    ctx.fillStyle = v.colors.panel;
    ctx.fillRect(x, y, box.width, box.height);

    ctx.strokeStyle = v.colors.border;
    ctx.strokeRect(x, y, box.width, box.height);

    ctx.fillStyle = value
      ? v.colors.inputText
      : v.colors.placeholder;

    ctx.font = "16px Arial";
    ctx.fillText(
      value || placeholder,
      x + v.style.inputPaddingX,
      y + v.style.textBaselineY
    );
  }

  drawButton(text, x, y, box, v) {
    const ctx = this.ctx;

    const g = ctx.createLinearGradient(
      x,
      y,
      x,
      y + box.height
    );

    g.addColorStop(0, v.colors.buttonTop);
    g.addColorStop(1, v.colors.buttonBottom);

    ctx.fillStyle = g;
    ctx.fillRect(x, y, box.width, box.height);

    ctx.fillStyle = v.colors.buttonText;
    ctx.font = "bold 18px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      text,
      x + box.width / 2,
      y + box.height / 2 + 6
    );
    ctx.textAlign = "left";
  }
}