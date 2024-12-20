import React, { useEffect, useState } from "react";

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
import { useGetItemsQuery } from "../../../../context/service/mining.service";
import { useDispatch, useSelector } from "react-redux";
import { setPreviewAction } from "../../../../context/mining";

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

  // Запрос данных в зависимости от активной вкладки
  const { data: generatorItems } = useGetItemsQuery("generator", {
    skip: activeTab.name !== "Генератор",
  });
  const { data: batteryItems, isLoading } = useGetItemsQuery("battery", {
    skip: activeTab.name !== "Батарея",
  });

  useEffect(() => {
    dispatch(setPreviewAction(false));
  }, [dispatch]);

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

  const handleCloseAgreeModal = () => {
    setIsClose(true);
    setTimeout(() => setIsAgreeModalVisible(false), 500);
  };

  const handleOpenAgreeModal = () => {
    setIsClose(false);
    setIsAgreeModalVisible(true);
  };

  const gift = [
    { own: null, pick: null, price: null },
    { own: null, pick: null, price: null },
    { own: null, pick: null, price: null },
    { own: null, pick: null, price: null },
    { own: null, pick: null, price: null },
    { own: null, pick: null, price: null },
    { own: null, pick: null, price: null },
    { own: null, pick: null, price: null },
    { own: null, pick: null, price: null },
    { own: null, pick: null, price: null },
    { own: null, pick: null, price: null },
    { own: null, pick: null, price: null },
  ];

  return (
    <div className="store" ref={pageRef}>
      <div className="store__back"></div>
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
      <div className={`store__balance ${!me && "store-loading-div"}`}>
        {`${staticData?.your_balance}:`}{" "}
        <span> {miningStore?.power_balance} </span> кВт•Ч
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
        {activeTab.key === "batteries"
          ? batteryItems?.items.map((el) => (
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
          : activeTab.key === "generators"
          ? generatorItems?.items.map((el) => (
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
          : gift.map((el, idx) => (
              <ItemCard
                img={el.imageUrl}
                own={el.isPurchased}
                pick={el.isSelected}
                price={el.price}
                tab={activeTab.key}
                key={idx}
                id={el.id}
                agree={handleOpenAgreeModal}
              />
            ))}
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
              Вы действительно хотите выбрать эту карточку?
            </p>
            <div className="agree-modal__btn-container">
              <button
                onClick={handleCloseAgreeModal}
                className="battyry__collect modal__acceptBtn agree-modal__btn"
              >
                Отмена
              </button>
              <button
                onClick={handleCloseAgreeModal}
                className="battyry__collect modal__acceptBtn agree-modal__btn"
              >
                Выбрать
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(StorePage);
