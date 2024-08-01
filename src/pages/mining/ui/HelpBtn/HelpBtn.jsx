import React from "react";
import "./HelpBtn.css";

export const HelpBtn = ({ onClick }) => {
  return (
    <button onClick={onClick} className="power__help help">
      <img className="help__icon" src="./icon/help.svg" alt="help" />
    </button>
  );
};
