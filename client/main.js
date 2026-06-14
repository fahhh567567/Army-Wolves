// client/main.js

import { AppController } from "./app/core/AppController.js";

console.log("[Main] booting app...");

const app = new AppController();
app.start();

// optional debug
window.__APP__ = app;