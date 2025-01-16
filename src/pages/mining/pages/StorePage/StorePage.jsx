import React, { useEffect, useMemo, useState } from "react";

import "./StorePage.css";
import {
  useMeQuery,
  useStaticQuery,
} from "../../../../context/service/me.service";
import ItemCard from "./widgets/ItemCard/ItemCard";
import HelpBtn from "../../ui/HelpBtn/HelpBtn";
import Modal from "../../widgets/Modal/Modal";
import { useModal } from "../../helpers/useModal";
import useBounding from "../../helpers/useBounding";
import {
  useGetItemsQuery,
  useLazyLotteryRollQuery,
} from "../../../../context/service/mining.service";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../../../context/mining";
import GiftItem from "./widgets/ItemCard/GiftItem";

const StorePage = () => {
  const dispatch = useDispatch();
  const storeTab = [
    { key: "generators", name: "Генератор" },
    { key: "batteries", name: "Батарея" },
    { key: "gift", name: "Розыгрыш" },
  ];
  const { data: me = null } = useMeQuery();
  const miningStore = useSelector((store) => store.mining);

  const lang = me?.language_code === "en" ? "en" : "ru";
  const { data: staticData = null } = useStaticQuery(lang);

  const [activeTab, setActiveTab] = useState(storeTab[0]);
  const [isAgreeModalVisible, setIsAgreeModalVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  // Запрос данных в зависимости от активной вкладки
  const { data: generatorItems } = useGetItemsQuery("generator", {
    skip: activeTab.name !== "Генератор",
  });
  const { data: batteryItems, isLoading } = useGetItemsQuery("battery", {
    skip: activeTab.name !== "Батарея",
  });

  //Лотерея
  const [lotteryRoll, lotteryRollResult] = useLazyLotteryRollQuery();

  const {
    isModalVisible,
    modalTitle,
    modalText,
    secondModalText,
    modalBtnText,
    modalBtnFunc,
    upInfo,
    handleOpenModal,
    handleCloseModal,
  } = useModal();

  const { pageRef, pageBounding } = useBounding();

  //функции для модалки подтверждения
  const [isClose, setIsClose] = useState(false);
  const [pickCardIdx, setPickCardIdx] = useState(null);

  const handleCloseAgreeModal = () => {
    setIsClose(true);
    setTimeout(() => setIsAgreeModalVisible(false), 500);
  };

  const handleOpenAgreeModal = (idx) => {
    setIsClose(false);
    setPickCardIdx(idx);
    setIsAgreeModalVisible(true);
  };

  const gift = useMemo(() => {
    return new Array(15).fill(null).map(() => ({
      own: null,
      pick: null,
      price: null,
      imageUrl: (Math.random() * (4 - 1) + 1).toFixed(0),
    }));
  }, []);

  return (
    <div className="store" ref={pageRef}>
      <h1 className="store__header">МАГАЗИН</h1>

      <div className="store__tabContainer tab">
        {storeTab.map((el, idx) => {
          return (
            <button
              key={idx}
              onClick={() => {
                setActiveTab(el);
              }}
              className={`tab__btn gradientBorder ${
                activeTab.key === el.key && "tab__btn_active"
              }`}
            >
              <span className="tab__btnText">{el.name}</span>
            </button>
          );
        })}
      </div>

      <div
        style={{ height: 45 }}
        className={`store__balance ${
          !me && !staticData && "store-loading-div"
        }`}
      >
        {me &&
          staticData &&
          miningStore.power_balance &&
          `${`${staticData?.your_balance}:    ${miningStore?.power_balance}    кВт•Ч`}`}
      </div>

      {activeTab.name === "Розыгрыш" && (
        <div className="giftInfo">
          <p className="giftInfo__text">1 карточка - 1000 кВт•Ч</p>
          <HelpBtn
            onClick={() => {
              handleOpenModal(
                [
                  "Вы можете испытать свою удачу и выиграть POE, кВт•Ч, NFT и многое другое",
                  "Призы обновляются каждый день",
                  "",
                  "",
                ],
                () => handleCloseModal(),
                "gift"
              );
            }}
          />
        </div>
      )}

      <div className="cards-container">
        {activeTab.key === "batteries" ? (
          batteryItems ? (
            batteryItems?.items.map((el) => (
              <ItemCard
                img={el.imageUrl}
                own={el.isPurchased}
                pick={el.isSelected}
                price={el.price}
                tab={activeTab.key}
                key={el.id}
                id={el.id}
                isLoading={isLoading}
              />
            ))
          ) : (
            <div className="store-loading-div"></div>
          )
        ) : activeTab.key === "generators" ? (
          generatorItems ? (
            generatorItems?.items.map((el) => (
              <ItemCard
                img={el.imageUrl}
                own={el.isPurchased}
                pick={el.isSelected}
                price={el.price}
                tab={activeTab.key}
                key={el.id}
                id={el.id}
              />
            ))
          ) : (
            <div className="store-loading-div"></div>
          )
        ) : gift && !lotteryRollResult.data ? (
          gift.map((el, idx) => (
            <GiftItem
              preview={true}
              key={idx}
              id={idx}
              agree={handleOpenAgreeModal}
              img={el.imageUrl}
            />
          ))
        ) : gift && lotteryRollResult.data ? (
          lotteryRollResult.data.lots.map((el, idx) => (
            <GiftItem
              type={el.type}
              img={el.imageUrl}
              value={el.value}
              key={idx}
              id={idx}
            />
          ))
        ) : (
          <div className="store-loading-div"></div>
        )}
      </div>

      {isModalVisible && (
        <Modal
          title={modalTitle}
          text={modalText}
          secondText={secondModalText}
          btnText={modalBtnText}
          btnFunc={modalBtnFunc.current}
          setModalClose={handleCloseModal}
          bounding={pageBounding}
          upInfo={upInfo}
        />
      )}
      {isAgreeModalVisible && (
        <div
          className={`overlay ${isClose ? "overlayClose" : ""}`}
          onClick={handleCloseAgreeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="agree-modal"
            style={{
              width: `${pageBounding.width}px`,
              left: `${pageBounding.left}px`,
            }}
          >
            <p className="modal__title">
              {me?.power_balance > 1000
                ? "Вы действительно хотите выбрать эту карточку?"
                : "Недостаточно средств"}
            </p>
            <div className="agree-modal__btn-container">
              <button
                onClick={handleCloseAgreeModal}
                className="battyry__collect modal__acceptBtn agree-modal__btn"
              >
                Отмена
              </button>

              {me?.power_balance > 1000 && (
                <button
                  onClick={async () => {
                    await lotteryRoll(pickCardIdx);
                    dispatch(
                      updateData({
                        power_balance: miningStore.power_balance - 1000,
                      })
                    );
                    handleCloseAgreeModal();
                  }}
                  className="battyry__collect modal__acceptBtn agree-modal__btn"
                >
                  Выбрать
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(StorePage);
