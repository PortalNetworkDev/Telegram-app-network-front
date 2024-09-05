import React, { useState } from "react";
import "./Modal.css";

const Modal = ({
  title,
  text,
  secondText,
  btnText,
  btnFunc,
  setModalClose,
  bounding,
  upInfo,
}) => {
  const [isClose, setIsClose] = useState(false);

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleClose = () => {
    setIsClose(true);
    setTimeout(() => setModalClose(), 500);
  };

  const handleBtnClick = () => {
    setIsClose(true);
    setTimeout(() => btnFunc(), 500);
  };

  return (
    <div
      onClick={handleClose}
      className={`overlay ${isClose ? "overlayClose" : ""}`}
    >
      <div
        style={{
          width: `calc(${bounding.current?.width}px)`,
          left: `calc(${bounding.current?.left}px)`,
        }}
        onClick={stopPropagation}
        className={`modal ${isClose ? "modalClose" : ""}`}
      >
        <button onClick={handleClose} className="modal__closeBtn">
          <img src="./icon/cross.svg" alt="cross" />
        </button>
        <div className="modal__content">
          {upInfo === "battery" ? (
            <img
              className="modal__img modal__battery"
              src="./images/batteryFromModal.png"
              alt="lightning"
            />
          ) : upInfo === "generator" ? (
            <img
              className="modal__img modal__generator"
              src="./images/generatorFromRotate.png"
              alt="lightning"
            />
          ) : upInfo === "multitab" ? (
            <img
              className="modal__img modal__multitab"
              src="./images/multitab.png"
              alt="lightning"
            />
          ) : (
            <img
              className="modal__img"
              src="./images/lightningWithBackground.png"
              alt="lightning"
            />
          )}

          <h1 className="modal__title">{title}</h1>
          <p className="modal__text">{text}</p>
          {upInfo ? (
            <div className="upContainer">
              <img
                style={{ width: "10%", margin: 0 }}
                className="modal__img"
                src="./images/lightningWithBackground.png"
                alt="lightning"
              />
              <p className="modal__text modal__text_up">{secondText}</p>
            </div>
          ) : (
            <p className="modal__text">{secondText}</p>
          )}
          <button
            onClick={handleBtnClick}
            className="battyry__collect modal__acceptBtn"
          >
            {btnText?.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Modal);
