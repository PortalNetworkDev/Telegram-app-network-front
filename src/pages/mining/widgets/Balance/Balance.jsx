import React from "react";
import "./Balance.css";
import LazyLoad from "react-lazyload";
import {
  useMeQuery,
  useStaticQuery,
} from "../../../../context/service/me.service";

const Balance = ({ balance, currency }) => {
  const { data: me = null } = useMeQuery();
  const lang = me?.language_code === "en" ? "en" : "ru";
  const { data: staticData = null } = useStaticQuery(lang);
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
        <p className="balance__text">{staticData?.your_balance}</p>
      </div>
      <div className="amount">
        <LazyLoad>
          <img
            className="amount__lightning"
            src="./icon/lightning-black.svg"
            alt="lightning"
          />
        </LazyLoad>
        <p className="amount__value">{balance?.toLocaleString("ru")} POE</p>
        <p className="amount__currency">
          {currency && `≈ ${(+currency?.toFixed(2)).toLocaleString("ru")} USD`}
        </p>
      </div>
    </div>
  );
};

export default React.memo(Balance);
