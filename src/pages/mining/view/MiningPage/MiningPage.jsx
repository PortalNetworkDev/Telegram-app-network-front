import React, { useEffect, useRef, useState } from "react";
import "./MiningPage.css";
import Balance from "../../widgets/Balance/Balance";
import TextString from "../../ui/TextSrting/TextString";
import Power from "../../widgets/Power/Power";
import LazyLoad from "react-lazyload";
import Battery from "../../widgets/Battery/Battery";
import Generator from "../../widgets/Generator/Generator";
import Modal from "../../widgets/Modal/Modal";
import {
  useMeQuery,
  useStaticQuery,
} from "../../../../context/service/me.service";
import { useMiningQuery } from "../../../../context/service/mining.service";

export const MiningPage = ({ opacity }) => {
  const [isModalVisible, setIsModalVivible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const [secondModalText, setSecondModalText] = useState("");
  const [modalBtnText, setModalBtnText] = useState("");
  const modalBtnFunc = useRef(null);
  const { data: me = null } = useMeQuery();
  const lang = me?.language_code === "en" ? "en" : "ru";
  const { data: mining = null } = useMiningQuery();
  const { data: staticData = null } = useStaticQuery(lang);
  console.log(me, staticData, mining);

  const handleOpenModal = (title, text, secondText, btnText, btnFunc) => {
    setIsModalVivible(true);
    setModalTitle(title);
    setModalText(text);
    setSecondModalText(secondText);
    setModalBtnText(btnText);
    modalBtnFunc.current = btnFunc;
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
        <Balance balance={me?.balance} currency={1000} />
        <Power
          onClick={() =>
            handleOpenModal(
              staticData?.PoePowerDisc1,
              staticData?.PoePowerDisc2,
              "",
              staticData?.PoePowerDiscButton,
              () => setIsModalVivible(false)
            )
          }
          upBtnAction={() => {
            handleOpenModal(
              staticData?.PoePowerUp1,
              staticData?.PoePowerUp2,
              "",
              staticData?.PoePowerUpButton,
              () => {
                setIsModalVivible(false);
                window.location.href =
                  "https://app.ston.fi/swap?chartVisible=false&ft=TON&tt=POE";
              }
            );
          }}
        />
        <div className="battery-power">
          <img
            className="battery-power__lightning lightning-with-back"
            src="./images/lightningWithBackground.png"
            alt="lightning"
          />
          <TextString
            secondSmall={"кВт•Ч"}
            big={me?.power_balance}
            bigFontSize={"32px"}
          />
        </div>
        <Battery
          onClick={() =>
            handleOpenModal(
              `${staticData?.BatteryDisc1}`,
              `${staticData?.BatteryDisc2}`,
              "",
              staticData?.BatteryDiscButton,
              () => setIsModalVivible(false)
            )
          }
          upBtnAction={() => {
            handleOpenModal(
              staticData?.BatteryUp1,
              `${staticData?.BatteryUp2} ${mining?.power_rize_battery}`,
              `${staticData?.BatteryUp3} ${mining?.price_rize_battery}`,
              staticData?.BatteryUpButton,
              () => {
                setIsModalVivible(false);
              }
            );
          }}
        />
        <Generator
          onClick={() =>
            handleOpenModal(
              `${staticData?.GeneratorDisc1}`,
              `${staticData?.GeneratorDisc2}`,
              "",
              staticData?.GeneratorDiscButton,
              () => setIsModalVivible(false)
            )
          }
          upBtnAction={() => {
            handleOpenModal(
              staticData?.GeneratorUp1,
              `${staticData?.GeneratorUp2} ${mining?.power_rize_generator}`,
              `${staticData?.GeneratorUp3} ${mining?.price_rize_generator}`,
              staticData?.GeneratorUpButton,
              () => {
                setIsModalVivible(false);
              }
            );
          }}
        />
        {isModalVisible && (
          <Modal
            title={modalTitle}
            text={modalText}
            secondText={secondModalText}
            btnText={modalBtnText}
            btnFunc={modalBtnFunc.current}
            setModalClose={() => setIsModalVivible(false)}
            bounding={minigBounding}
          />
        )}
      </div>
    </>
  );
};
