import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import {
  useMeQuery,
  useStaticQuery,
} from "../../../../context/service/me.service";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "../../widgets/ProgressBar/ProgressBar";

const StorePage = () => {
  const dispatch = useDispatch();
  const { data: me = null } = useMeQuery();
  const miningStore = useSelector((store) => store.mining);
  const lang = me?.language_code === "en" ? "en" : "ru";
  const { data: staticData = null } = useStaticQuery(lang);
  const [allRate, setAllRate] = useState(false);
  const rate = Array(100).fill(0);

  return (
    <div className="store profile">
      {!allRate ? (
        <>
          {" "}
          <h1 className="store__header">МОЙ ПРОФИЛЬ</h1>
          <div className="profile__progress">
            <p className="profile__nickname">@userNickname</p>
            <ProgressBar progress={35} />
            <p style={{ marginBottom: 5 }} className="profile__nickname">
              100 уровень
            </p>
            <p className="profile__powerBeforeNextLevel">
              {" "}
              1 000 кВт•Ч до следующего уровня
            </p>
          </div>
          <div className="profile_progress rate">
            <h2 className="rate__title">РЕЙТИНГ</h2>
            <div className="power transaction-card rate__card">
              <div className="transaction-card__cont ">
                <div className="transaction-card__img-cont rate__position">
                  {"1150".toLocaleString("ru")}
                </div>
                <div
                  className="transaction-card__status-cont"
                  style={{ alignItems: "flex-start" }}
                >
                  <p className="transaction-card__mainText">Name</p>
                  <p className="transaction-card__subText">level</p>
                </div>
              </div>
              <div className="transaction-card__info-cont">
                {me ? (
                  <p className="rate__power">
                    {me?.power_balance.toLocaleString("ru")} кВт•Ч
                  </p>
                ) : (
                  <div
                    style={{
                      height: 25,
                      width: 150,
                      borderRadius: "5px",
                    }}
                    className="store-loading-div"
                  ></div>
                )}
              </div>
            </div>
            <button
              onClick={() => setAllRate(true)}
              style={{
                width: "50%",
                margin: "10px 0 0 0 ",
                position: "relative",
              }}
              className="battyry__collect"
            >
              ВЕСЬ РЕЙТИНГ
            </button>
            <div className="profile__refContainer ref">
              <h2
                style={{ textAlign: "center", marginBottom: 17 }}
                className="rate__title"
              >
                РЕФЕРАЛЬНАЯ ССЫЛКА
              </h2>
              <div className="ref__container">
                <h3 className="ref__title">Это ваша персональная ссылка</h3>
                <p className="ref__info">
                  Отправьте её друзьям, и вы оба получите по 1 000 кВт•Ч на
                  баланс.{" "}
                </p>
                <div className="ref__link">
                  https://portalenergy.tech/
                  <img
                    style={{ marginLeft: 45 }}
                    alt="copy"
                    src="/icon/copy-icon.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <h1 className="store__header">Рейтинг игроков</h1>
          <div className="mining-info__header" style={{ left: "90%" }}>
            <button
              onClick={() => setAllRate(false)}
              style={{ position: "relative", margin: "0 0 1vh 0" }}
              className="modal__closeBtn"
            >
              <img src="/icon/cross.svg" alt="cross" />
            </button>
          </div>
          <div
            style={{ marginBottom: "22vh", top: "8vh" }}
            className="profile_progress rate"
          >
            {rate.map((el, idx) => {
              return (
                <div
                  style={{ marginBottom: 15 }}
                  key={idx}
                  className="power transaction-card "
                >
                  <div className="transaction-card__cont ">
                    <div
                      style={{ color: "white", fontSize: 12 }}
                      className="transaction-card__img-cont "
                    >
                      {"1150".toLocaleString("ru")}
                    </div>
                    <div
                      className="transaction-card__status-cont"
                      style={{ alignItems: "flex-start" }}
                    >
                      <p className="transaction-card__mainText">Name</p>
                      <p className="transaction-card__subText">level</p>
                    </div>
                  </div>
                  <div className="transaction-card__info-cont">
                    {me ? (
                      <p className="rate__power">
                        {me?.power_balance.toLocaleString("ru")} кВт•Ч
                      </p>
                    ) : (
                      <div
                        style={{
                          height: 25,
                          width: 150,
                          borderRadius: "5px",
                        }}
                        className="store-loading-div"
                      ></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(StorePage);
