import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import {
  useMeQuery,
  useStaticQuery,
} from "../../../../context/service/me.service";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "../../widgets/ProgressBar/ProgressBar";
import {
  useGetUserPositionQuery,
  useLazyGetTopMinersQuery,
} from "../../../../context/service/mining.service";

const StorePage = () => {
  const dispatch = useDispatch();
  const { data: me = null } = useMeQuery();
  const miningStore = useSelector((store) => store.mining);
  const lang = me?.language_code === "en" ? "en" : "ru";
  const { data: staticData = null } = useStaticQuery(lang);
  const [allRate, setAllRate] = useState(false);
  const { data: userPosition = null } = useGetUserPositionQuery();
  const [getTopMinersList, { data, isLoading, error }] =
    useLazyGetTopMinersQuery();

  useEffect(() => {
    if (allRate) {
      getTopMinersList(0);
    }
  }, [allRate]);

  return (
    <div className="store profile">
      {!allRate ? (
        <>
          {" "}
          <h1 className="store__header">МОЙ ПРОФИЛЬ</h1>
          <div className="profile__progress">
            {me ? (
              <p className="profile__nickname">{`@${me?.username}`}</p>
            ) : (
              <div
                style={{
                  height: 19,
                  width: "50%",
                  borderRadius: "5px",
                  marginBottom: 15,
                }}
                className="store-loading-div"
              ></div>
            )}

            <ProgressBar progress={50} />
            {me ? (
              <p style={{ marginBottom: 5 }} className="profile__nickname">
                {`${me?.level} уровень`}
              </p>
            ) : (
              <div
                style={{
                  height: 19,
                  width: "50%",
                  borderRadius: "5px",
                  marginBottom: 5,
                }}
                className="store-loading-div"
              ></div>
            )}
            {me ? (
              <p className="profile__powerBeforeNextLevel">
                {`${me?.nextLevelPowerBalance.toLocaleString(
                  "ru"
                )} кВт•Ч до следующего уровня`}
              </p>
            ) : (
              <div
                style={{
                  height: 19,
                  width: "50vw",
                  borderRadius: "5px",
                  marginBottom: 15,
                }}
                className="store-loading-div"
              ></div>
            )}
          </div>
          <div className="profile_progress rate">
            <h2 className="rate__title">РЕЙТИНГ</h2>
            <div className="power transaction-card rate__card">
              {userPosition && me ? (
                <div className="transaction-card__cont ">
                  <div className="transaction-card__img-cont rate__position">
                    {userPosition?.position.toLocaleString("ru")}
                  </div>

                  <div
                    className="transaction-card__status-cont"
                    style={{ alignItems: "flex-start" }}
                  >
                    <p className="transaction-card__mainText">{`${me?.first_name} ${me?.last_name}`}</p>
                    <p className="transaction-card__subText">{`${me?.level} уровень`}</p>
                  </div>
                  <div
                    style={{ position: "absolute", right: 0 }}
                    className="transaction-card__info-cont"
                  >
                    <p className="rate__power">
                      {me?.power_balance.toLocaleString("ru")} кВт•Ч
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    height: 25,
                    width: "100%",
                    borderRadius: "5px",
                  }}
                  className="store-loading-div"
                ></div>
              )}
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
            {!isLoading && data?.list ? (
              data?.list.map((el, idx) => {
                return (
                  <div
                    style={{ marginBottom: 15 }}
                    key={idx}
                    className="power transaction-card "
                  >
                    <div className="transaction-card__cont ">
                      {el?.position <= 3 ? (
                        <div className="star-container">
                          <div className="star"> </div>
                          <div className="star__num">
                            {el?.position?.toLocaleString("ru")}
                          </div>
                        </div>
                      ) : (
                        <div
                          style={{ color: "white", fontSize: 12 }}
                          className="transaction-card__img-cont "
                        >
                          {el?.position?.toLocaleString("ru")}
                        </div>
                      )}

                      <div
                        className="transaction-card__status-cont"
                        style={{ alignItems: "flex-start" }}
                      >
                        <p className="transaction-card__mainText">Name</p>
                        <p className="transaction-card__subText">{`${el?.level} уровень`}</p>
                      </div>
                    </div>
                    <div className="transaction-card__info-cont">
                      {me ? (
                        <p className="rate__power">
                          {el?.powerBalance.toLocaleString("ru")} кВт•Ч
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
              })
            ) : (
              <div
                style={{ height: "100vh", width: "100%", borderRadius: "10px" }}
                className="store-loading-div"
              ></div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(StorePage);
