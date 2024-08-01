import React from "react";
import "./Balance.css";

export const Balance = ({ balance, currency }) => {
  return (
    <div className="mining-main__balance">
    <div className="balance">
      <img
        className="balance__wallet"
        src="./icon/gradient-wallet.svg"
        alt="wallet"
      />
      <p className="balance__text">Баланс</p>
    </div>
    <div className="amount">
      <img
        className="amount__lightning"
        src="./icon/lightning-black.svg"
        alt="lightning"
      />
      <p className="amount__value">
        {(balance).toLocaleString("ru")} POE
      </p>
      <p className="amount__currency">
        ≈ {(currency).toLocaleString("ru")} USD
      </p>
    </div>
  </div>
  );
};
