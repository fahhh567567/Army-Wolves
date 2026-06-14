import { GameClient } from "../../game/engine/gameClient.js";

export class GameScreen {
  constructor({ session }) {
    this.session = session;
    this.client = null;
  }

  async render() {
    document.getElementById("app").innerHTML = `
      <canvas id="game"></canvas>
    `;

    this.client = new GameClient(this.session);
    await this.client.start();
  }

  destroy() {
    this.client?.stop?.();
    this.client = null;
  }
}