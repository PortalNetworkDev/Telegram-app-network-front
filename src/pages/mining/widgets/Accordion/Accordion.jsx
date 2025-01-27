import React from "react";

import "./Accordion.css";

const Accordion = ({ raffle, handleOpenAgreeModal }) => {
  return (
    <details className="details details_outer">
      <summary className="summary summary_outer">Голова</summary>
      {raffle.map((el) => {
        if (el.type === 1) {
          return (
            <>
              {" "}
              <div className="substrate"></div>
              <details className="details details_inner content">
                <summary className="summary summary_inner">Внутряк</summary>
                <div className="content content_inner">
                  <div className="raffle-card">
                    <img
                      className="raffle-card__img"
                      alt=""
                      src="/images/charging-station.png"
                    />
                    <p className="raffle-card__name">«Название розыгрыша»</p>
                    <p className="raffle-card__gift">Главный приз: 1 000 POE</p>
                    <p className="raffle-card__conditions">Условия участия:</p>
                    <ol className="raffle-card__conditions-list">
                      <li>Первое условия</li>
                      <li>Второе условие</li>
                      <li>Третье условие</li>
                    </ol>
                    <p className="raffle-card__price">
                      Стоимость участия: 4 400 Вт•Ч
                    </p>

                    <button
                      onClick={handleOpenAgreeModal}
                      className="battyry__collect raffle-card__btn"
                    >
                      УЧАВСТВОВАТЬ
                    </button>

                    <p className="raffle-card__conditions-result">
                      Результаты будут опубликованы 01.01.2025 в{" "}
                      <a href="#">группе проекта</a>
                    </p>
                  </div>
                </div>
              </details>
            </>
          );
        } else {
          return (
            <>
              <div className="substrate"></div>
              <details className="details details_inner content">
                <summary className="summary summary_inner">Внутряк</summary>
                <div className="content content_inner">
                  <div className="raffle-card raffle-card_mini">
                    <p className="raffle-card__info-text">
                      Главный приз: 80 POE
                    </p>
                    <p className="raffle-card__info-text">
                      Победитель: @winner123
                    </p>
                  </div>
                </div>
              </details>
            </>
          );
        }
      })}
    </details>
  );
};

export default React.memo(Accordion);
