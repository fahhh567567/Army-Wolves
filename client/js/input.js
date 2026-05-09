import { sendMove } from "./network.js";

document.addEventListener("click", (e) => {

  const game = document.getElementById("game");
  const rect = game.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  sendMove(x, y);
});