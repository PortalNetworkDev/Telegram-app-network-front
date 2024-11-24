import React, { useEffect, useRef, useState } from "react";
import Navigation from "../../widgets/Navigation/Navigation";
import "./StorePage.css";
import { useMeQuery } from "../../../../context/service/me.service";
import ItemCard from "./widgets/ItemCard/ItemCard";
import HelpBtn from "../../ui/HelpBtn/HelpBtn";
import Modal from "../../widgets/Modal/Modal";
import { useModal } from "../../helpers/useModal";

const StorePage = () => {
  const storeTab = ["Генератор", "Батарея", "Розыгрыш"];
  const { data: me = null } = useMeQuery();

  const [activeTab, setActiveTab] = useState(storeTab[0]);

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

  const storeRef = useRef(null);
  const storeBounding = useRef(null);

  useEffect(() => {
    if (storeRef.current) {
      storeBounding.current = storeRef.current?.getBoundingClientRect();
    }
  }, []);

  window.addEventListener("resize", (e) => {
    e.preventDefault();
    storeBounding.current = storeRef.current?.getBoundingClientRect();
  });

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
    <div className="store" ref={storeRef}>
      <h1 className="store__header">МАГАЗИН</h1>
      <div className="store__tabContainer tab">
        {storeTab.map((el) => {
          return (
            <button
              onClick={() => setActiveTab(el)}
              class={`tab__btn ${activeTab === el && "tab__btn_active"}`}
            >
              <span className="tab__btnText">{el}</span>
            </button>
          );
        })}
      </div>
      <div className="store__balance">
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
          />
        ))}
      </div>
      <Navigation />
      {isModalVisible && (
        <Modal
          title={modalTitle}
          text={modalText}
          secondText={secondModalText}
          btnText={modalBtnText}
          btnFunc={modalBtnFunc.current}
          setModalClose={handleCloseModal}
          bounding={storeBounding}
          upInfo={upInfo}
        />
      )}
    </div>
  );
};

export default React.memo(StorePage);
