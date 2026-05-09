import { worldState, playerId } from "./network.js";

const playerDivs = {};

export function render() {
  const world = document.getElementById("world");

  Object.keys(worldState).forEach(id => {

    const p = worldState[id];

    let el = playerDivs[id];

    if (!el) {
      el = document.createElement("div");

      el.style.position = "absolute";
      el.style.width = "30px";
      el.style.height = "30px";

      el.style.background =
        id === playerId ? "blue" : "red";

      world.appendChild(el);

      playerDivs[id] = el;
    }

    el.style.left = p.x + "px";
    el.style.top = p.y + "px";
  });
}