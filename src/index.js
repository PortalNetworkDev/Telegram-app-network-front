import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/global.css";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import "animate.css";
document.documentElement.style.setProperty("--animate-duration", ".45s");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);
