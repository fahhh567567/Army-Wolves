export class LoadingScreen {
  constructor({ message = "Loading..." } = {}) {
    this.type = "loading";
    this.message = message;
  }

  enter() {}

  setMessage(msg) {
    this.message = msg;
  }

  update() {}

  destroy() {}
}