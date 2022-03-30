import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import CoreLayout from "./common/layouts/CoreLayout";
import "./styles/_main.scss";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";

initializeIcons();

ReactDOM.render(
  <React.StrictMode>
    <CoreLayout>
      <Routes />
    </CoreLayout>
  </React.StrictMode>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
