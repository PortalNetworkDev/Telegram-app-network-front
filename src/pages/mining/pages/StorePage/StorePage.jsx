import React, { useState } from "react";

import "./StorePage.css";
import { useMeQuery } from "../../../../context/service/me.service";
import ItemCard from "./widgets/ItemCard/ItemCard";
import HelpBtn from "../../ui/HelpBtn/HelpBtn";
import Modal from "../../widgets/Modal/Modal";
import { useModal } from "../../helpers/useModal";
import useBounding from "../../helpers/useBounding";

const StorePage = () => {
  const storeTab = ["Генератор", "Батарея", "Розыгрыш"];
  const { data: me = null } = useMeQuery();

  const [activeTab, setActiveTab] = useState(storeTab[0]);
  const [isAgreeModalVisible, setIsAgreeModalVisible] = useState(false);

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

  const battery = [
    { own: true, pick: true, price: null },
    { own: false, pick: false, price: 5000 },
    { own: false, pick: false, price: 5000 },
    { own: false, pick: false, price: 5000 },
    { own: true, pick: false, price: 5000 },
    { own: false, pick: false, price: 5000 },
    { own: false, pick: false, price: 5000 },
    { own: false, pick: false, price: 5000 },
    { own: false, pick: false, price: 5000 },
    { own: false, pick: false, price: 5000 },
  ];

  const generator = [
    { own: true, pick: true, price: null },
    { own: false, pick: false, price: 5000 },
    { own: false, pick: false, price: 5000 },
    { own: false, pick: false, price: 5000 },
    { own: true, pick: false, price: 5000 },
    { own: false, pick: false, price: 5000 },
    { own: false, pick: false, price: 5000 },
    { own: false, pick: false, price: 5000 },
    { own: false, pick: false, price: 5000 },
    { own: false, pick: false, price: 5000 },
  ];

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
              onClick={() => setActiveTab(el)}
              className={`tab__btn gradientBorder ${activeTab === el && "tab__btn_active"}`}
            >
              <span className="tab__btnText">{el}</span>
            </button>
          );
        })}
      </div>
      <div className={`store__balance ${!me && "store-loading-div"}`}>
        Ваш баланс: <span> {me?.balance} </span> кВт•Ч
      </div>
      {activeTab === "Розыгрыш" && (
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
      <div
        style={{ display: activeTab === "Батарея" ? "flex" : "none" }}
        className="cards-container"
      >
        {battery.map((el, idx) => (
          <ItemCard
            own={el.own}
            pick={el.pick}
            price={el.price}
            tab={activeTab}
            key={idx}
          />
        ))}
      </div>

      <div
        style={{ display: activeTab === "Генератор" ? "flex" : "none" }}
        className="cards-container"
      >
        {generator.map((el, idx) => (
          <ItemCard
            own={el.own}
            pick={el.pick}
            price={el.price}
            tab={activeTab}
            key={idx}
          />
        ))}
      </div>
      <div
        style={{ display: activeTab === "Розыгрыш" ? "flex" : "none" }}
        className="cards-container"
      >
        {gift.map((el, idx) => (
          <ItemCard
            own={el.own}
            pick={el.pick}
            price={el.price}
            tab={activeTab}
            key={idx}
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
