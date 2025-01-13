import React from "react";
import "./ItemCard.css";

import LazyLoad from "react-lazyload";

const ItemCard = ({ img, value, agree, id, type, preview = false }) => {
  const baseUrl = process.env.REACT_APP_MINIAPPAPI;

  return (
    <div
      onClick={() => agree && agree(id)}
      style={{
        aspectRatio: "40/40",
      }}
      className={`item-card gradientBorder 
      }`}
    >
      <LazyLoad style={{ width: "100%", height: "100%" }}>
        {preview ? (
          <img
            src={`${baseUrl}/static/skins/batteries/defaultButtery.png`}
            alt="card"
            className="item-card__img"
          />
        ) : (
          <img
            src={`${baseUrl}/static/shopLottery/${img}`}
            alt="card"
            className="item-card__img"
          />
        )}
      </LazyLoad>

      <>
        {type && (
          <div className="item-card__price">
            {type === "lose"
              ? "НИЧЕГО"
              : type === "nft"
              ? "NFT"
              : `${value} кВт•Ч`}
          </div>
        )}
      </>
    </div>
  );
};

export default React.memo(ItemCard);
