import "./input.js";
import { render } from "./renderer.js";

function loop() {
  render();
  requestAnimationFrame(loop);
}

loop();
console.log("loop running");