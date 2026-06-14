// app/screens/LoadingScreen.js

export class LoadingScreen {
  constructor({ message = "Loading..." } = {}) {
    this.message = message;
  }

  render() {
    document.getElementById("app").innerHTML = `
      <div class="loading-screen">
        <div class="panel">
          <h1>Loading</h1>
          <p id="loading-text">${this.message}</p>
        </div>
      </div>
    `;
  }

  setMessage(msg) {
    const el = document.getElementById("loading-text");
    if (el) el.textContent = msg;
  }

  destroy() {
    document.getElementById("app").innerHTML = "";
  }
}