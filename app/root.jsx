require("./manifest.json");

import * as OfflinePluginRuntime from "offline-plugin/runtime";
OfflinePluginRuntime.install({
  onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
  onUpdated: () => window.swUpdate = true
});

import React from "react";
import ReactDOM from "react-dom";

import App from "components/App";

ReactDOM.render(
  <App />,
  document.getElementById("app")
); // ReactDOM.render
