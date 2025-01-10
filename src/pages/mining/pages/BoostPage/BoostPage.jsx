import React, { useEffect, useRef, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query/react";
import "./BoostPage.css";
import { Link } from "react-router-dom";
import {
  miningService,
  useLazyMultitabUpQuery,
  useMiningQuery,
  useRecoveryBoostInfoQuery,
  useRecoveryGeneratorQuery,
} from "../../../../context/service/mining.service";
import { useModalStatic } from "../../helpers/useModalStatic";
import { useModal } from "../../helpers/useModal";
import Modal from "../../widgets/Modal/Modal";
import useBounding from "../../helpers/useBounding";
import { useDispatch } from "react-redux";

export const BoostPage = () => {
  const dispatch = useDispatch();
  const [multitabUp] = useLazyMultitabUpQuery();
  const { upMultitabModal, notEnoughtBalance } = useModalStatic();
  const { data: mining = null, refetch: refetchMining } = useMiningQuery();

  //Recovery
  const { data: recoveryInfo = null } = useRecoveryBoostInfoQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { data: recoveryGenerator = null } =
    useRecoveryGeneratorQuery(skipToken);

  const [timeToRecovery, setTimeToRecovery] = useState(0);
  const [timeForRender, setTimeForRender] = useState("00:00:00");
  const intervalRef = useRef(null);

  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (recoveryInfo?.activationPeriodLimit) {
      setTimeToRecovery(recoveryInfo.activationPeriodLimit * 60);
      setAttempts(recoveryInfo.leftAttempts);
    }
  }, [recoveryGenerator, recoveryInfo]);

  useEffect(() => {
    if (timeToRecovery <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeToRecovery((prev) => prev - 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timeToRecovery]);

  useEffect(() => {
    const hours = Math.floor(timeToRecovery / 3600);
    const minutes = Math.floor((timeToRecovery % 3600) / 60);
    const seconds = timeToRecovery % 60;

    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    setTimeForRender(formattedTime);
  }, [timeToRecovery]);

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
            {upMultitabModal[0] ? (
              <>
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
                  <p className="modal__text modal__text_up">
                    {upMultitabModal[2]}
                  </p>
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
              </>
            ) : (
              <div
                style={{ height: "100%", borderRadius: "10px" }}
                className="store-loading-div"
              ></div>
            )}
          </div>
          <div className="boost-page__card gradientBorder">
            {upMultitabModal[0] ? (
              <>
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
                  disabled={
                    mining?.generator_balance === mining?.generator_limit ||
                    timeToRecovery ||
                    !attempts
                  }
                  onClick={() => {
                    dispatch(
                      miningService.endpoints.recoveryGenerator.initiate()
                    );
                    setAttempts((prev) => prev - 1);
                    setTimeToRecovery(60);
                  }}
                  className="battyry__collect boost-page__acceptBtn"
                >
                  {"зарядить".toUpperCase()}
                </button>

                <p className="boost-page__info-text">
                  {!recoveryInfo ? (
                    <span
                      style={{ height: "30px", borderRadius: "10px" }}
                      className="store-loading-div"
                    ></span>
                  ) : (
                    `Сегодня вы можете зарядить генератор ${attempts} раз, следующий заряд
              доступен через ${timeForRender}`
                  )}
                </p>
              </>
            ) : (
              <div
                style={{ height: "100%", borderRadius: "10px" }}
                className="store-loading-div"
              ></div>
            )}
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
