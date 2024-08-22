import React, { useEffect, useRef, useState } from "react";
import TextString from "../../ui/TextSrting/TextString";
import LazyLoad from "react-lazyload";
import UpBtn from "../../ui/UpBtn/UpBtn";
import HelpBtn from "../../ui/HelpBtn/HelpBtn";
import "./Battery.css";
import { useMeQuery } from "../../../../context/service/me.service";
import {
  useLazyClaimPowerQuery,
  useMiningQuery,
} from "../../../../context/service/mining.service";
import { useBatteryPercent } from "../../helpers/useBatteryPercent";
import { useDispatch, useSelector } from "react-redux";
import { setClaimingAction } from "../../../../context/mining";

const Battery = ({ onClick, upBtnAction }) => {
  const { data: me = null } = useMeQuery();
  const lang = me?.language_code === "en" ? "en" : "ru";
  const [claimPower] = useLazyClaimPowerQuery();
  const { data: mining = null, refetch: refetchMining } = useMiningQuery();
  const dispatch = useDispatch();
  const imgRef = useRef(null);
  const [divisions, setDivisions] = useState([]);
  const [isImgLoading, setIsImgLoading] = useState(true);
  const {
    percent,
    balance,
    capacity,
    power,
    prev,
    powerBalance,
    setPowerBalance,
    setPrev,
    setPercent,
    setBalance,
    percentReductionStep,
  } = useBatteryPercent();
  const miningStore = useSelector((store) => store.mining);

  useEffect(() => {
    const image = new Image();
    image.src = "./images/battery.png";
    image.onload = () => {
      setIsImgLoading(false);
    };
  }, []);

  useEffect(() => {
    if (!isImgLoading) {
      const rect = imgRef.current?.getBoundingClientRect();

      const newDivisions = [];
      const divisionHeight = rect?.height / 3.5;
      const divisionWidth = rect?.width / 140;

      for (let i = 0; i < 31; i++) {
        newDivisions.push({
          top: (rect?.height * 12) / 30.5,
          left: rect?.width / 6.4 + i * 3.12 * divisionWidth,
          width: divisionWidth,
          height: divisionHeight,
        });
      }

      setDivisions(newDivisions);
    }
  }, [isImgLoading]);

  useEffect(() => {
    // Определяем последний активный индекс
    const lastActiveIndex = divisions.reduce((lastIndex, _, index) => {
      return percent > index * 3.2 ? index : lastIndex;
    }, 0); // Начальное значение 0

    setPrev(lastActiveIndex);
  }, [percent, divisions, setPrev]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => Math.min(prev + power / 3600, 100));
    }, 1000);
    return () => clearInterval(interval); // Очистка интервала при размонтировании
  }, [power, setPercent]);

  // Сбор энергии
  useEffect(() => {
    if (!miningStore.isClaiming) return;
    const setPercentReductionStep = percent / balance;

    const handleBalanceUpdate = async () => {
      setPercent((prev) => {
        if (prev > 0.01) {
          return prev - setPercentReductionStep;
        } else {
          return prev;
        }
      });
      setPowerBalance((prev) => {
        if (prev < powerBalance + balance - 1) {
          return prev + 1;
        } else {
          return prev;
        }
      });
      setBalance((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          return prev;
        }
      });
      const currentBalance = balance - 1;

      if (currentBalance <= 1) {
        try {
          await claimPower();
          await refetchMining();
          dispatch(setClaimingAction(false));
        } catch (error) {
          console.error(error);
        } finally {
          clearInterval(interval);
        }
      }
    };

    const interval = setInterval(() => {
      handleBalanceUpdate();
    }, 25);

    return () => clearInterval(interval);
  }, [
    miningStore.isClaiming,
    claimPower,
    dispatch,
    percent,
    balance,
    powerBalance,
    refetchMining,
    setBalance,
    setPercent,
    setPowerBalance,
  ]);

  return (
    <>
      <div className="battery-power">
        <img
          className="battery-power__lightning lightning-with-back"
          src="./images/lightningWithBackground.png"
          alt="lightning"
        />
        <TextString
          secondSmall={"кВт•Ч"}
          big={powerBalance}
          bigFontSize={"32px"}
        />
      </div>
      <div className="battery">
        <div className="battery__level level">
          <div className="level__info">
            <TextString
              firstSmall={`${lang === "ru" ? "Уровень" : "Level"}`}
              big={mining?.battery_level}
              bigFontSize={"15px"}
              bigTextMargin={"0px 0px 0px 5px"}
            />
            <HelpBtn onClick={onClick} />
          </div>
          <UpBtn onClick={upBtnAction} />
        </div>
        <LazyLoad>
          <div className="battery__img-container">
            <img
              ref={imgRef}
              className="battery__img"
              src="./images/battery.png"
              alt="battery"
            />
            {divisions.map((division, index) => {
              const isActive = percent > index * 3.2;
              const isLast = index === prev && isActive;

              return (
                <div
                  key={index}
                  className={`battery-division ${
                    isActive
                      ? isLast && percent !== 100
                        ? "activeDivision last"
                        : "activeDivision"
                      : ""
                  }`}
                  style={{
                    top: division.top,
                    left: division.left,
                    width: division.width,
                    height: division.height,
                  }}
                />
              );
            })}
          </div>
        </LazyLoad>
        <div className="battery__capacity level">
          <div className="battery__level-info level__info">
            <img
              className="battery__lightning lightning-with-back"
              src="./images/lightningWithBackground.png"
              alt="lightning"
            />
            <TextString
              big={[
                balance === 0 || balance === 100
                  ? +balance?.toFixed()
                  : +balance?.toFixed(1) || 0,
                capacity,
              ]}
              secondSmall={lang === "ru" ? "Вт•Ч" : "W•h"}
              bigFontSize={"15px"}
              bigTextMargin={"0px 5px 0px 10px"}
            />
          </div>
          <div className="battery__accumulation accumulation">
            <p className="accumulation__text">{`${
              lang === "ru" ? "Накоплено" : "Accumulated"
            }`}</p>
            <div className="accumulation__percent">
              <div className="accumulation__progress-conteiner">
                <div
                  style={{ height: "20%" }}
                  className="accumulation__progress-division"
                ></div>
                <div
                  style={{
                    height: "40%",
                    opacity: percent > 60 ? "1" : "0.5",
                  }}
                  className="accumulation__progress-division"
                ></div>
                <div
                  style={{
                    opacity: percent === 100 ? "1" : "0.5",
                  }}
                  className="accumulation__progress-division"
                ></div>
              </div>
              <p className="accumulation__value">{`${
                percent < 0.1
                  ? 0
                  : percent === 100
                  ? percent
                  : percent.toFixed(1)
              } %`}</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            dispatch(setClaimingAction(true));
          }}
          className="battyry__collect"
        >
          {lang === "ru" ? "СОБРАТЬ" : "TO COLLECT"}
        </button>
      </div>
    </>
  );
};

export default React.memo(Battery);
