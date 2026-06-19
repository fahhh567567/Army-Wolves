client/

├── app/
│   │
│   ├── core/
│   │   ├── AppController.js
│   │   └── session.js
│   │
│   ├── screens/
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── ServerSelect.js
│   │   ├── LoadingScreen.js
│   │   └── SettingsScreen.js
│   │
│   └── services/
│       ├── apiClient.js
│       └── authService.js
│
├── engine/
│   ├── core/
│   │   └── GameClient.js
│   │
│   ├── net/
│   │   ├── socket.js
│   │   └── protocol.js
│   │
│   ├── state/
│   │   ├── worldState.js
│   │   └── stateBuffer.js
│   │
│   ├── simulation/
│   │   ├── movementSystem.js
│   │   └── roomTransitionSystem.js
│   │
│   ├── render/
│   │   ├── renderer.js
│   │   ├── drawBackground.js
│   │   ├── drawPlayers.js
│   │   ├── drawExits.js
│   │   └── drawUI.js
│   │
│   ├── input/
│   │   ├── mouse.js
│   │   ├── mouseState.js
│   │   └── movement.js
│   │
│   ├── systems/
│   │   ├── camera.js
│   │   └── interpolation.js
│   │
│   └── features/
│       ├── chat/
│       ├── emotes/
│       ├── friends/
│       ├── inventory/
│       ├── map/
│       └── moderation/
│
├── shared/
│   ├── constants.js
│   └── utils.js
│
├── assets/
├── css/
├── html/
│
└── main.js











client/
│
├── main.js
│
├── app/
│
├── game/
│   ├── engine/
│   ├── net/
│   ├── state/
│   ├── render/
│   ├── input/
│   ├── systems/
│   └── ui/
│
├── features/
│   ├── chat/
│   ├── emotes/
│   ├── inventory/
│   ├── friends/
│   └── map/
│
├── shared/
├── assets/
├── css/
└── html/




react archi
ui/src
├── components
│   ├── LoginForm.jsx
│   ├── ServerSelect.jsx
│   └── GameCanvas.jsx
├── screens
│   ├── LoginPage.jsx
│   ├── LoadingPage.jsx
│   └── GamePage.jsx
├── services
│   └── authService.js
├── App.jsx
└── main.jsx


ui/
  app/
    screens/
      LoginPage.jsx
      ServerSelect.jsx
      LoadingPage.jsx
    services/
      authService.js   ← HTTP (Express API ONLY)

  components/
    GameCanvas.jsx    ← React mounts canvas ONLY


game/
  engine/
    startGame.js      ← entry point (called by React)
    bootstrap.js      ← wires systems together
    renderer.js       ← canvas render loop

    net/
      websocket.js    ← WS client (movement/chat/state sync)

    state/
      worldState.js   ← client-side game state

    systems/
      movement.js
      interpolation.js
      input.js
      camera.js

  ui/
    overlays/
      Chat.jsx
      Inventory.jsx
      Friends.jsx
      HUD.jsx


server/
  api/
    auth.js           ← Express login/register, accounts

  ws/
    world.js          ← authoritative game simulation
    rooms.js
    players.js