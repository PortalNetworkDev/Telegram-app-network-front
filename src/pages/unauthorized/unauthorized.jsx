import React from "react";
import "./unauthorized.css";
import { Link } from "react-router-dom";

export const Unauthorized = () => {
  return (
    <div className="notfound animate__animated animate__fadeIn">
      <h1>Unauthorized</h1>
      <h2>Something wrong</h2>
      <p>If you see this, please create issue <a href="https://github.com/PortalNetworkDev/telegram_app_network_back/issues" target="_blank">here</a></p>
    </div>
  );
};
