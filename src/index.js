import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./assets/scss/index.scss";
import App from "./App";
import { AppProvider } from "./context";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <AppProvider>
        <App />
      </AppProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
