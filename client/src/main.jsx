import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Global error logging
window.addEventListener("error", (e) => {
  console.error("[GLOBAL ERROR]", e.message, e.filename, e.lineno);
});

window.addEventListener("unhandledrejection", (e) => {
  console.error("[PROMISE ERROR]", e.reason);
});

// Render app (NO StrictMode)
ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);

console.log("main.jsx loaded");