import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

// scss
import "./assets/scss/index.scss";


import App from "./App";
import { AppProvider } from "./context";

ReactDOM.render(
  <BrowserRouter>
    <AppProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AppProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
