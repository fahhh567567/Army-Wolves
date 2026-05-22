import "./input.js";

import { render } from "./renderer.js";

// ----------------------
// CLIENT UPDATE LOOP
// ----------------------
function update() {
  // later:
  // prediction
  // interpolation
  // client-side movement
}

setInterval(update, 1000 / 20);

// ----------------------
// RENDER LOOP
// ----------------------
function loop() {

  console.log("LOOP");

  try {

    render();

  } catch (err) {

    console.error("RENDER ERROR:", err);
  }

  requestAnimationFrame(loop);
}

loop();

console.log("loop running");