import { useEffect, useRef } from "react";
import GameCanvas from "../../components/GameCanvas.jsx";
import { GameClient } from "../../game/engine/gameClient.js";

export default function GamePage() {
  const clientRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    console.log("[GamePage] mounted");

    // 🚨 prevents double init (StrictMode protection)
    if (startedRef.current) return;
    startedRef.current = true;

    const session = {
      token: "test",
      server: "lobby",
      playerId: null
    };

    console.log("[GamePage] creating GameClient");

    const client = new GameClient(session);
    clientRef.current = client;

    console.log("[GamePage] starting client");

    client.start().catch((err) => {
      console.error("[GameClient] FAILED START:", err);
    });

    return () => {
      console.log("[GamePage] cleanup");

      startedRef.current = false;

      if (clientRef.current) {
        clientRef.current.stop?.();
        clientRef.current = null;
      }
    };
  }, []);

  return <GameCanvas />;
}