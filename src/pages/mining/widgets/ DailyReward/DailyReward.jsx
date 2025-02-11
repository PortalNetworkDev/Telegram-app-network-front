import React, { useState } from "react";
import "./DailyReward.css";
import {
  useCheckDailyGiftsQuery,
  useGetDailyGiftsQuery,
  useLazyClaimDailyGiftQuery,
  useMiningQuery,
} from "../../../../context/service/mining.service";

const DailyReward = ({ btnFunc, setModalClose, bounding }) => {
  const [isClose, setIsClose] = useState(false);
  const [claimGift] = useLazyClaimDailyGiftQuery();
  const { data: avaibleDailyGift = null, refetch: refetchDailyReward } =
    useCheckDailyGiftsQuery();
  const { data: mining = null, refetch: refetchMining } = useMiningQuery();
  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  const handleClose = () => {
    setIsClose(true);
    setTimeout(() => setModalClose(), 500);
  };
  const handleBtnClick = async () => {
    await claimGift();
    await refetchDailyReward();
    await refetchMining();
    setIsClose(true);
    setTimeout(() => setModalClose(), 500);
  };

  const { data: gifts = null } = useGetDailyGiftsQuery();

  return (
    <div
      onClick={handleClose}
      className={`overlay ${isClose ? "overlayClose" : ""}`}
    >
      <div
        style={{
          width: `${bounding?.width}px`,
          left: `${bounding?.left}px`,
        }}
        onClick={stopPropagation}
        className={`modal rewardModal`}
      >
        <div className="battyry__collect modal__acceptBtn rewardModal__header gradientBorder">
          ЕЖЕДНЕВНАЯ НАГРАДА
        </div>
        <button
          onClick={handleClose}
          className="modal__closeBtn rewardModal__closeBtn"
        >
          <img src="/icon/cross.svg" alt="cross" />
        </button>
        <div className="modal__content rewardModal__content">
          {gifts?.gifts.map((el, idx) => (
            <div
              key={el.id}
              className={`rewardModal__item gradientBorder ${
                el.isAbleToClaim && "rewardModal__item_current"
              }`}
            >
              <div
                className={`rewardModal__itemHeader ${
                  el.isAbleToClaim && "rewardModal__itemHeader_current"
                }`}
              >
                <p className="rewardModal__dayText">{`${el.day} День`}</p>
              </div>
              <p className="rewardModal__infoText">{`${el.gift}  Вт•Ч`}</p>
            </div>
          ))}
          <button
            onClick={handleBtnClick}
            className="battyry__collect modal__acceptBtn rewardModal__acceptBtn"
          >
            {"забрать".toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DailyReward);
