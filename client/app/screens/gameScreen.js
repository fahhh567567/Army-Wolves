import { GameClient } from "../../game/engine/gameClient.js";

export class GameScreen {
  constructor({ session }) {
    this.session = session;
    this.client = null;
  }

  async enter() {
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    this.client = new GameClient(this.session, {
      canvas,
      ctx
    });

    await this.client.start();
  }

  update(dt) {
    this.client?.update?.(dt);
  }

  render(ctx) {
    this.client?.render?.(ctx);
  }

  destroy() {
    this.client?.stop?.();
    this.client = null;
  }
}