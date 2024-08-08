import React, { useState } from "react";
import "./Modal.css";

const Modal = ({ title, text, setModalClose }) => {
  const [isClose, setIsClose] = useState(false);

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleClose = () => {
    setIsClose(true);
    setTimeout(() => setModalClose(), 400);
  };

  return (
    <div
      onClick={handleClose}
      className={`overlay ${isClose ? "overlayClose" : ""}`}
    >
      <div
        onClick={stopPropagation}
        className={`modal ${isClose ? "modalClose" : ""}`}
      >
        <button onClick={handleClose} className="modal__closeBtn">
          <img src="./icon/cross.svg" alt="cross" />
        </button>
        <div className="modal__content">
          <img
            className="modal__img"
            src="./icon/lightningWithBackground.svg"
            alt="lightning"
          />
          <h1 className="modal__title">{title}</h1>
          <p className="modal__text">{text}</p>
          <button
            onClick={handleClose}
            className="battyry__collect modal__acceptBtn"
          >
            ПОНЯТНО
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Modal);
