import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
window.addEventListener("error", (e) => {
  console.error("[GLOBAL ERROR]", e.message, e.filename, e.lineno);
});

window.addEventListener("unhandledrejection", (e) => {
  console.error("[PROMISE ERROR]", e.reason);
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log("main.jsx loaded");