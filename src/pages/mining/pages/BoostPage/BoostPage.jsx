import React from "react";
import "./BoostPage.css";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import {
  useLazyMultitabUpQuery,
  useMiningQuery,
} from "../../../../context/service/mining.service";
import { useModalStatic } from "../../helpers/useModalStatic";
import { useModal } from "../../helpers/useModal";
import Modal from "../../widgets/Modal/Modal";
import useBounding from "../../helpers/useBounding";

export const BoostPage = () => {
  const [multitabUp] = useLazyMultitabUpQuery();
  const { upMultitabModal, notEnoughtBalance } = useModalStatic();
  const { data: mining = null, refetch: refetchMining } = useMiningQuery();

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

  return (
    <>
      <div ref={pageRef} className="boost-page">
        <div className="store__back mining-main__back"></div>
        <div className="mining-info__header" style={{ left: "90%" }}>
          <Link
            to={"/mining"}
            style={{ position: "relative", margin: "0 0 1vh 0" }}
            className="modal__closeBtn"
          >
            <img src="/icon/cross.svg" alt="cross" />
          </Link>
        </div>

        <div className="boost-page__header">BOOST </div>
        <div className="boost-page__content">
          <div className="boost-page__card gradientBorder">
            <img
              className="boost-page__img"
              src="/images/multitab.png"
              alt="multitab"
            ></img>
            <h1 className="boost-card__title">{upMultitabModal[0]}</h1>
            <p style={{ zIndex: 1 }} className="modal__text">
              {upMultitabModal[1]}
            </p>
            <div style={{ zIndex: 1 }} className="upContainer">
              <img
                style={{ width: "10%", margin: 0 }}
                className="modal__img"
                src="/images/lightningWithBackground.png"
                alt="lightning"
              />
              <p className="modal__text modal__text_up">{upMultitabModal[2]}</p>
            </div>

            <button
              onClick={async () => {
                if (mining?.power_balance < mining?.price_rize_multitab) {
                  handleOpenModal(notEnoughtBalance, () => {
                    handleCloseModal();
                    window.location.href =
                      "https://app.ston.fi/swap?chartVisible=false&ft=TON&tt=POE";
                  });
                } else {
                  await multitabUp();
                  await refetchMining();
                }
              }}
              className="battyry__collect boost-page__acceptBtn"
            >
              {upMultitabModal[3]}
            </button>
          </div>

          <div className="boost-page__card gradientBorder">
            <img
              style={{ top: 40 }}
              className="boost-page__img"
              src="/images/charging-station.png"
              alt="multitab"
            ></img>
            <h1 style={{ width: "100%" }} className="boost-card__title">
              Полная зарядка генератора
            </h1>
            <p style={{ width: "50%" }} className="modal__text">
              Вы можете зарядить генератор 1 раз в час
            </p>
            <div className="upContainer">
              <img
                style={{ width: "10%", margin: 0 }}
                className="modal__img"
                src="/images/lightningWithBackground.png"
                alt="lightning"
              />
              <p className="modal__text modal__text_up">
                Доступно 6 раз в день
              </p>
            </div>

            <button
              // onClick={""}
              className="battyry__collect boost-page__acceptBtn"
            >
              {"зарядить".toUpperCase()}
            </button>

            <p className="boost-page__info-text">
              Сегодня вы можете зарядить генератор 5 раз, следующий заряд
              доступен через 00:59:00
            </p>
          </div>
        </div>
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
    </>
  );
};
