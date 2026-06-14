// app/core/AppController.js

import { session } from "./session.js";

import { LoginScreen } from "../screens/LoginScreen.js";
import { ServerSelectScreen } from "../screens/ServerSelectScreen.js";
import { LoadingScreen } from "../screens/loadingScrean.js";
import { GameScreen } from "../screens/GameScreen.js";

import { GameClient } from "../../game/engine/gameClient.js";

export class AppController {
  constructor() {
    this.currentScreen = null;
    this.gameClient = null;
  }

  // ----------------------
  // BOOT
  // ----------------------
  start() {
    console.log("[App] Starting...");
    this.showLogin();
  }

  // ----------------------
  // SCREEN SYSTEM
  // ----------------------
  setScreen(screen) {
    this.currentScreen?.destroy?.();
    this.currentScreen = screen;
    this.currentScreen.render?.();
  }

  // ----------------------
  // LOGIN
  // ----------------------
  showLogin() {
    this.setScreen(
      new LoginScreen({
        onLoginSuccess: (data) => {
          session.set({
            playerId: data.user.id,
            token: null,
            server: "lobby"
          });

          this.showServerSelect();
        }
      })
    );
  }

  // ----------------------
  // SERVER SELECT
  // ----------------------
  showServerSelect() {
    this.setScreen(
      new ServerSelectScreen({
        onJoin: (server) => {
          session.set({
            ...session,
            server
          });

          this.showLoading();
        }
      })
    );
  }

  // ----------------------
  // LOADING (REAL FLOW)
  // ----------------------
  showLoading() {
    const loading = new LoadingScreen({
      message: "Connecting to server..."
    });

    this.setScreen(loading);

    this.gameClient = new GameClient(session, {
      onStatus: (msg) => {
        loading.setMessage(msg);
      },

      onReady: () => {
        this.setScreen(
          new GameScreen({
            gameClient: this.gameClient,
            session
          })
        );
      }
    });

    this.gameClient.start();
  }

  // ----------------------
  // STOP
  // ----------------------
  stop() {
    this.currentScreen?.destroy?.();
    this.gameClient?.stop?.();

    this.currentScreen = null;
    this.gameClient = null;
  }
}