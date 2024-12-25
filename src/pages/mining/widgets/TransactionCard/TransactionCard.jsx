import React from "react";

import "./TransactionCard.css";

const TransactionCard = () => {
  return (
    <div className="power transaction-card">
      <div className="transaction-card__cont">
        <div className="transaction-card__img-cont">
          <img
            className="transaction-card__img"
            alt="arrow"
            src="/icon/arrow-up.svg"
          />
        </div>
        <div className="transaction-card__status-cont">
          <p className="transaction-card__mainText">Status</p>
          <p className="transaction-card__subText">@user</p>
        </div>
      </div>
      <div className="transaction-card__info-cont">
        <p className="transaction-card__mainText">-4 400 кВт•Ч </p>
        <p className="transaction-card__subText">06.09.24r</p>
      </div>
    </div>
  );
};

export default React.memo(TransactionCard);
