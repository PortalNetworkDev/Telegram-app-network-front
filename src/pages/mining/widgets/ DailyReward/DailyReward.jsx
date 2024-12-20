import React, { useState } from "react";
import "./DailyReward.css";

const DailyReward = ({ btnFunc, setModalClose, bounding }) => {
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
  const days = [0, 0, 0, 0, 0, 0, 0];
  return (
    <div
      onClick={handleClose}
      className={`overlay ${isClose ? "overlayClose" : ""}`}
    >
      <div
        style={{
          width: `${bounding?.width}px`,
          left: `${bounding?.left}px`,
        }}
        onClick={stopPropagation}
        className={`modal rewardModal`}
      >
        <div className="battyry__collect modal__acceptBtn rewardModal__header gradientBorder">
          ЕЖЕДНЕВНАЯ НАГРАДА
        </div>
        <button
          onClick={handleClose}
          className="modal__closeBtn rewardModal__closeBtn"
        >
          <img src="/icon/cross.svg" alt="cross" />
        </button>
        <div className="modal__content rewardModal__content">
          {days.map((_, idx) => (
            <div
              key={idx}
              className={`rewardModal__item gradientBorder ${
                idx === 2 && "rewardModal__item_current"
              }`}
            >
              <div
                className={`rewardModal__itemHeader ${
                  idx === 2 && "rewardModal__itemHeader_current"
                }`}
              >
                <p className="rewardModal__dayText">1 День</p>
              </div>
              <p className="rewardModal__infoText">500 кВт•Ч</p>
            </div>
          ))}
          <button
            onClick={handleBtnClick}
            className="battyry__collect modal__acceptBtn rewardModal__acceptBtn"
          >
            {"забрать".toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DailyReward);
