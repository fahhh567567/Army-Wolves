import { ScreenManager } from "./screenManager.js";

import { LoginScreen } from "../screens/loginScreen.js";
import { ServerSelectScreen } from "../screens/serverSelectScreen.js";
import { LoadingScreen } from "../screens/loadingScrean.js";
import { GameScreen } from "../screens/gameScreen.js";

import { AppRenderer } from "../appRender/appRenderer.js";
import { GameClient } from "..//engine/gameClient.js";

// services
import { login } from "../services/authService.js";
import { session } from "./session.js";

// input
import { FormController } from "./formController.js";

export class AppController {
  constructor() {
    this.screenManager = new ScreenManager();

    this.canvas = document.getElementById("game");
    this.ctx = this.canvas.getContext("2d");

    this.appRenderer = new AppRenderer(this.ctx);

    this.gameClient = null;
    this.lastTime = 0;

    // use form controller directly
    this.formController = new FormController();

    this.bindInput();
  }

  start() {
    console.log("[App] Starting...");
    this.showLogin();
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(t) {
    const dt = t - this.lastTime;
    this.lastTime = t;

    const screen = this.screenManager.current;

    this.screenManager.update(dt);
    this.gameClient?.update?.(dt);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (!screen) {
      requestAnimationFrame(this.loop.bind(this));
      return;
    }

    if (screen.type === "game") {
      this.gameClient?.render(this.ctx);
    } else {
      this.appRenderer.render(screen);
    }

    requestAnimationFrame(this.loop.bind(this));
  }

  // ---------------- LOGIN FLOW ----------------

  showLogin() {
    this.screenManager.set(
      new LoginScreen({
        onLogin: (username, password) =>
          this.handleLogin(username, password)
      }),
      "LOGIN"
    );
  }

  async handleLogin(username, password) {
    try {
      const data = await login(username, password);

      session.set(data);

      console.log("[Auth] Login success:", data);

      this.showServerSelect();
    } catch (err) {
      console.error("[Auth] Login failed:", err);

      const screen = this.screenManager.current;
      if (screen) {
        screen.error = "Invalid username or password";
      }
    }
  }

  // ---------------- FLOW ----------------

  showServerSelect() {
    this.screenManager.set(
      new ServerSelectScreen({
        onJoin: () => this.showLoading()
      }),
      "SERVER_SELECT"
    );
  }

  showLoading() {
    this.screenManager.set(new LoadingScreen(), "LOADING");

    setTimeout(() => {
      this.showGame();
    }, 1000);
  }

  showGame() {
    this.screenManager.set(new GameScreen(), "GAME");

    this.gameClient = new GameClient();
    this.gameClient.start();
  }

  // ---------------- INPUT ----------------

  bindInput() {
    window.addEventListener("keydown", (e) => {
      const screen = this.screenManager.current;
      this.formController.keyDown(screen, e);
    });

    window.addEventListener("mousedown", (e) => {
      const rect = this.canvas.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const screen = this.screenManager.current;
      this.formController.pointerDown(screen, x, y);
    });
  }
}