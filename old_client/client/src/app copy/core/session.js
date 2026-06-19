export const session = {
  token: null,
  playerId: null,
  server: "lobby",

  set(data) {
    this.token = data.token;
    this.server = data.server;
    this.playerId = data.playerId || null;
  },

  clear() {
    this.token = null;
    this.playerId = null;
    this.server = "lobby";
  }
};