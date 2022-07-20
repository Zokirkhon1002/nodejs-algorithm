// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

console.warn = function(){};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
