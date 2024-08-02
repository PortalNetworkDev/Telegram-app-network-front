import React from "react";
import "./PreviewPage.css";

export const PreviewPage = () => {
  return (
    <div className="mining-loader">
      <img
        src="./icon/lightning.svg"
        alt="lightning"
        className="mining-info__lightning"
      />
      <img
        className="mining-info__logo"
        src="./images/logoFromMining.svg"
        alt="logo"
      />
      <div className="mininf-info__text info-text">
        <h1 className="info-text__title">
          Покупайте и храните POE — получайте Вт•Ч
        </h1>
        <p className="info-text__desc"> 1 POE = 5 000 Вт</p>
      </div>
    </div>
  );
};
