import React from "react";
import "./Balance.css";
import LazyLoad from "react-lazyload";

const Balance = ({ balance, currency }) => {
  return (
    <div className="mining-main__balance">
      <div className="balance">
        <LazyLoad>
          <img
            className="balance__wallet"
            src="./icon/gradient-wallet.svg"
            alt="wallet"
          />
        </LazyLoad>
        <p className="balance__text">Баланс</p>
      </div>
      <div className="amount">
        <LazyLoad>
          <img
            className="amount__lightning"
            src="./icon/lightning-black.svg"
            alt="lightning"
          />
        </LazyLoad>
        <p className="amount__value">{balance.toLocaleString("ru")} POE</p>
        <p className="amount__currency">
          ≈ {currency.toLocaleString("ru")} USD
        </p>
      </div>
    </div>
  );
};

export default React.memo(Balance);
