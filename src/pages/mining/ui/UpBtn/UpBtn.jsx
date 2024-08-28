import React from "react";
import "./UpBtn.css";

const UpBtn = ({ onClick, multitab }) => {
  return (
    <button onClick={onClick} className="up-button">
      {multitab ? (
        <>
          {multitab} <img src="./icon/arrow-up.svg" alt="up" />
        </>
      ) : (
        <>
          UP <img src="./icon/arrow-up.svg" alt="up" />
        </>
      )}
    </button>
  );
};

export default React.memo(UpBtn);
