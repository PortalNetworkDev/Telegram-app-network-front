import React, { useEffect, useRef, useState } from "react";
import "./MiningPage.css";
import Balance from "../../widgets/Balance/Balance";
import TextString from "../../ui/TextSrting/TextString";
import Power from "../../widgets/Power/Power";
import LazyLoad from "react-lazyload";
import Battery from "../../widgets/Battery/Battery";
import Generator from "../../widgets/Generator/Generator";
import Modal from "../../widgets/Modal/Modal";

export const MiningPage = ({ opacity }) => {
  const [isModalVisible, setIsModalVivible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");

  const handleOpenModal = (title, text) => {
    setIsModalVivible(true);
    setModalTitle(title);
    setModalText(text);
  };

  const miningRef = useRef(null);
  const minigBounding = useRef(null);

  useEffect(() => {
    if (miningRef.current) {
      minigBounding.current = miningRef.current?.getBoundingClientRect();
    }
  }, []);

  window.addEventListener("resize", (e) => {
    e.preventDefault();
    minigBounding.current = miningRef.current?.getBoundingClientRect();
  });

  return (
    <>
      <div ref={miningRef} style={{ opacity: opacity }} className="mining-main">
        <LazyLoad>
          <img
            className="mining-main__background"
            src="./images/mining-main.png"
            alt="background"
          />
        </LazyLoad>
        <Balance balance={100000000} currency={1000} />
        <Power
          onClick={() =>
            handleOpenModal(
              "POE — ваш генератор с мощностью 1 POE = 5 000 Вт",
              "Каждый час копите Вт•Ч, в дальнейшем их можно будет использовать"
            )
          }
        />
        <div className="battery-power">
          <img
            className="battery-power__lightning lightning-with-back"
            src="./images/lightningWithBackground.png"
            alt="lightning"
          />
          <TextString
            secondSmall={"кВт•Ч"}
            big={5000000}
            bigFontSize={"32px"}
          />
        </div>
        <Battery
          onClick={() =>
            handleOpenModal(
              "POE — ваш генератор с мощностью 1 POE = 5 000 Вт",
              "Каждый час копите Вт•Ч, в дальнейшем их можно будет использовать"
            )
          }
        />
        <Generator
          onClick={() =>
            handleOpenModal(
              "POE — ваш генератор с мощностью 1 POE = 5 000 Вт",
              "Каждый час копите Вт•Ч, в дальнейшем их можно будет использовать"
            )
          }
        />
        {isModalVisible && (
          <Modal
            title={modalTitle}
            text={modalText}
            setModalClose={() => setIsModalVivible(false)}
            bounding={minigBounding}
          />
        )}
      </div>
    </>
  );
};
