client/
│
├── app/                          🟦 UI LAYER (MENU SYSTEM)
│   ├── core/
│   │   └── AppController.js      ⭐ ONLY ENTRY POINT
│   │
│   ├── screens/
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── ServerSelect.js
│   │   ├── LoadingScreen.js
│   │
│   ├── services/
│   │   ├── authService.js        (HTTP login/register)
│   │   ├── apiClient.js
│
│
├── engine/                       🟩 GAME LAYER (REALTIME WORLD)
│   ├── core/
│   │   └── GameClient.js         ⭐ ONLY GAME ENTRY POINT
│   │
│   ├── net/
│   │   ├── socket.js             (creates WS ONLY)
│   │   ├── protocol.js           (packet types)
│   │
│   ├── world/
│   │   ├── state.js              (players, room, exits)
│   │   ├── buffer.js             (stateBuffer replacement)
│   │   ├── simulation.js
│   │
│   ├── render/
│   │   ├── renderer.js
│   │   ├── drawPlayers.js
│   │   ├── drawUI.js
│   │
│   ├── input/
│   │   ├── mouse.js              (ONLY input → intent)
│   │   ├── movement.js
│   │
│   ├── systems/
│   │   ├── interpolation.js
│   │   ├── camera.js
│
│
├── shared/                       🟨 SHARED HELPERS (KEEP SMALL)
│   ├── constants.js
│   ├── utils.js
│
│
├── assets/                       🟪 STATIC (UNCHANGED)
│   ├── player/
│   ├── ui/
│   ├── backgrounds/