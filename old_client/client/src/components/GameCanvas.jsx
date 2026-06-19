import { useEffect, useRef } from "react";
import { initInput, destroyInput } from "../game/input/inputController.js";

export default function GameCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    initInput(canvasRef.current);

    return () => destroyInput();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="game"
      width="1520"
      height="960"
    />
  );
}