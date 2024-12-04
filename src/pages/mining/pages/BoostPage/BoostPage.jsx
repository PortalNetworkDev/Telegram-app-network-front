import React from "react";
import "./BoostPage.css";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";

export const BoostPage = () => {
  return (
    <>
      <div className="boost-page">
        <LazyLoad>
          <img
            className="mining-main__background"
            src="/images/mining-main.png"
            alt="background"
          />
        </LazyLoad>
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
            <h1 className="boost-card__title">
              Увеличение эффективности клика
            </h1>
            <p className="modal__text">+1 кВт•Ч за тап для 2 Уровня</p>
            <div className="upContainer">
              <img
                style={{ width: "10%", margin: 0 }}
                className="modal__img"
                src="/images/lightningWithBackground.png"
                alt="lightning"
              />
              <p className="modal__text modal__text_up">
                500 кВт•Ч - цена 2 Уровня
              </p>
            </div>

            <button
              onClick={""}
              className="battyry__collect boost-page__acceptBtn"
            >
              {"увеличить".toUpperCase()}
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
              onClick={""}
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
    </>
  );
};
