import React from "react";
import ReactDOM from "react-dom/client";
import { check } from "@tauri-apps/plugin-updater";

import App from "./App";

// Check for updates in background (dialog handled natively via tauri.conf.json)
check().catch(console.error);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
