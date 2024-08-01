import React from "react";
import "./UpBtn.css";

export const UpBtn = ({ onClick }) => {
  return (
    <button onClick={onClick} className="up-button">
      UP <img src="./icon/arrow-up.svg" alt="up" />
    </button>
  );
};
