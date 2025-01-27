import React from "react";

import "./TransactionCard.css";

const TransactionCard = ({ isSend, nickname, amount, date }) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();

  const formattedDate = `${String(day).padStart(2, "0")}.${String(
    month
  ).padStart(2, "0")}.${year - 2000}`;

  return (
    <div className="power transaction-card">
      <div className="transaction-card__cont">
        <div className="transaction-card__img-cont">
          <img
            style={{ transform: !isSend && "rotate(180deg)" }}
            className="transaction-card__img"
            alt="arrow"
            src="/icon/arrow-up.svg"
          />
        </div>
        <div className="transaction-card__status-cont">
          <p className="transaction-card__mainText">
            {isSend ? "Отправлено" : "Получено"}
          </p>
          <p className="transaction-card__subText">{`@${nickname}`}</p>
        </div>
      </div>
      <div className="transaction-card__info-cont">
        <p className="transaction-card__mainText">
          {isSend
            ? `-${amount?.toLocaleString("ru")} Вт•Ч`
            : `+${amount?.toLocaleString("ru")} Вт•Ч`}
        </p>
        <p className="transaction-card__subText">{formattedDate}</p>
      </div>
    </div>
  );
};

export default React.memo(TransactionCard);
