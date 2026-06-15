import { ScreenManager } from "./screenManager.js";

import { LoginScreen } from "../screens/loginScreen.js";
import { ServerSelectScreen } from "../screens/serverSelectScreen.js";
import { LoadingScreen } from "../screens/loadingScrean.js";
import { GameScreen } from "../screens/gameScreen.js";

export class AppController {
  constructor() {
    this.screenManager = new ScreenManager();

    this.canvas = document.getElementById("game");
    this.ctx = this.canvas.getContext("2d");

    this.lastTime = 0;

    this._bindInput();
  }

  start() {
    console.log("[App] Starting...");

    this.showLogin();
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(t) {
    const dt = t - this.lastTime;
    this.lastTime = t;

    this.screenManager.update(dt);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.screenManager.render(this.ctx);

    requestAnimationFrame(this.loop.bind(this));
  }

  // ---------------- screens ----------------

  showLogin() {
    this.screenManager.set(
      new LoginScreen({
        onLoginSuccess: (data) => {
          this.showServerSelect();
        }
      }),
      "LOGIN"
    );
  }

  showServerSelect() {
    this.screenManager.set(
      new ServerSelectScreen({
        onJoin: (server) => {
          this.showLoading();
        }
      }),
      "SERVER_SELECT"
    );
  }

  showLoading() {
    this.screenManager.set(
      new LoadingScreen(),
      "LOADING"
    );

    // later:
    setTimeout(() => {
      this.showGame();
    }, 1000);
  }

  showGame() {
    this.screenManager.set(
      new GameScreen(),
      "GAME"
    );
  }

  // ---------------- input ----------------

  _bindInput() {
    window.addEventListener("keydown", (e) => {
      this.screenManager.keyDown(e);
    });

    window.addEventListener("mousedown", (e) => {
      const rect = this.canvas.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      this.screenManager.pointerDown(x, y);
    });
  }
}