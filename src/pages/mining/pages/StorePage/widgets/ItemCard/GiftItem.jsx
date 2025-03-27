import React from "react";
import "./ItemCard.css";

import LazyLoad from "react-lazyload";

const GiftItemCard = ({
  img,
  value,
  agree,
  id,
  type,
  isReward,
  preview = false,
}) => {
  const baseUrl = process.env.REACT_APP_MINIAPPAPI;

  return (
    <div
      onClick={() => agree && agree(id)}
      style={{
        aspectRatio: "40/40",
        width: "32%",
        background:
          isReward &&
          "linear-gradient(0deg, rgb(0, 193, 255, 45%), rgb(100, 252, 215, 45%))",
      }}
      className={"item-card gradientBorder"}
    >
      <LazyLoad style={{ width: "100%", height: "100%" }}>
        {preview ? (
          <img
            src={`../images/giftBag${img}.png`}
            alt="card"
            className="item-card__img"
          />
        ) : (
          <img
            src={`${baseUrl}/shopLottery/${img}`}
            alt="card"
            className="item-card__img"
          />
        )}
      </LazyLoad>

      <>
        {type && (
          <div className="item-card__price" style={{ bottom: 15 }}>
            {type === "lose"
              ? "НИЧЕГО"
              : type === "nft"
              ? "NFT"
              : type === "poe"
              ? `${value} POE`
              : `${value} Вт•Ч`}
          </div>
        )}
      </>
    </div>
  );
};

export default React.memo(GiftItemCard);
