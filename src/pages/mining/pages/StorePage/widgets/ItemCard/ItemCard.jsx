import React from "react";

import "./ItemCard.css";

const ItemCard = ({ own, pick, price, tab, agree }) => {
  return (
    <div
      onClick={() => agree && agree()}
      style={{
        aspectRatio:
          tab === "Генератор"
            ? "40/55"
            : tab === "Розыгрыш"
            ? "40/40"
            : " 40/38",
        width: tab === "Розыгрыш" && "30%",
      }}
      className={`item-card ${
        pick ? "item-card_pick" : own ? "item-card_own" : ""
      }`}
    >
      {tab === "Батарея" ? (
        <img src="/images/battery.png" alt="card" className="item-card__img" />
      ) : tab === "Генератор" ? (
        <img
          style={{ width: "65%" }}
          src="/images/generatorFromRotate.png"
          alt="card"
          className="item-card__img"
        />
      ) : (
        <img
          style={{ width: "70%" }}
          src="/images/generatorFromRotate.png"
          alt="card"
          className="item-card__img"
        />
      )}

      {tab !== "Розыгрыш" && (
        <>
          {" "}
          <div className="item-card__price">
            {!own && `${price?.toLocaleString("ru")} кВт•Ч`}
          </div>
          <button
            className={`item-card__btn ${
              pick ? "item-card__btn_pick" : own ? "item-card__btn_own" : ""
            }`}
          >
            {pick ? "ВЫБРАНО" : own ? "ВЫБРАТЬ" : "КУПИТЬ"}
          </button>
        </>
      )}
    </div>
  );
};

export default React.memo(ItemCard);
