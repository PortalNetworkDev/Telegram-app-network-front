import React, { useEffect } from "react";
import "./ItemCard.css";
import {
  useBuySkinMutation,
  useMiningQuery,
  useSelectSkinMutation,
} from "../../../../../../context/service/mining.service";
import { updateData } from "../../../../../../context/mining";
import { useDispatch } from "react-redux";
import { useMeQuery } from "../../../../../../context/service/me.service";
import LazyLoad from "react-lazyload";

const ItemCard = ({ img, own, pick, price, tab, id }) => {
  const baseUrl = process.env.REACT_APP_MINIAPPAPI;

  const dispatch = useDispatch();
  const { data: mining = null, refetch: refetchMining } = useMiningQuery();
  const { refetch: refetchMe } = useMeQuery();
  const [buySkin] = useBuySkinMutation();
  const [selectSkin] = useSelectSkinMutation();

  useEffect(() => {
    dispatch(updateData(mining));
  }, [mining, dispatch]);

  return (
    <div
      style={{
        aspectRatio: tab === "generators" ? "40/55" : " 40/38",
        width: tab === "Розыгрыш" && "30%",
        height: tab === "Батарея" && "25vh",
      }}
      className={`item-card gradientBorder ${
        pick ? "item-card_pick" : own ? "item-card_own" : ""
      }`}
    >
      <LazyLoad style={{ width: "100%", height: "100%" }}>
        <img
          src={`${baseUrl}/static/skins/${tab}/${img}`}
          alt="card"
          className="item-card__img"
        />
      </LazyLoad>

      <>
        {" "}
        <div className="item-card__price">
          {!own && `${price?.toLocaleString("ru")} кВт•Ч`}
        </div>
        <button
          onClick={async () => {
            if (!own) {
              await buySkin({
                skinId: id,
                skinType: tab === "generators" ? "generator" : "battery",
              });
              await refetchMining();
            }
            if (own && !pick) {
              await selectSkin({
                skinId: id,
                skinType: tab === "generators" ? "generator" : "battery",
              });
              await refetchMining();
              await refetchMe();
            } else {
              return;
            }
          }}
          className={`item-card__btn ${
            pick ? "item-card__btn_pick" : own ? "item-card__btn_own" : ""
          }`}
        >
          {pick ? "ВЫБРАНО" : own ? "ВЫБРАТЬ" : "КУПИТЬ"}
        </button>
      </>
    </div>
  );
};

export default React.memo(ItemCard);
