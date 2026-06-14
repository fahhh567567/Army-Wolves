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