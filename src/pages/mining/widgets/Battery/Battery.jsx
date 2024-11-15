import React, { useEffect, useRef, useState } from "react";
import TextString from "../../ui/TextSrting/TextString";
import LazyLoad from "react-lazyload";
import UpBtn from "../../ui/UpBtn/UpBtn";
import HelpBtn from "../../ui/HelpBtn/HelpBtn";
import "./Battery.css";
import {
  useMeQuery,
  useStaticQuery,
} from "../../../../context/service/me.service";
import { useMiningQuery } from "../../../../context/service/mining.service";
import { useBatteryPercent } from "../../helpers/useBatteryPercent";
import { useDispatch, useSelector } from "react-redux";
import { setClaimingAction } from "../../../../context/mining";
import { useClaim } from "../../helpers/useClaim";

const Battery = ({ onClick, upBtnAction }) => {
  const { data: me = null } = useMeQuery();
  const lang = me?.language_code === "en" ? "en" : "ru";
  const { data: mining = null } = useMiningQuery();
  const { data: staticData = null } = useStaticQuery(lang);
  const miningStore = useSelector((store) => store.mining);
  const dispatch = useDispatch();
  const imgRef = useRef(null);
  const [divisions, setDivisions] = useState([]);
  const [isImgLoading, setIsImgLoading] = useState(true);
  const {
    percent,
    balance,
    capacity,
    prev,
    powerBalance,
    setPowerBalance,
    setPrev,
    setPercent,
    setBalance,
  } = useBatteryPercent();

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

  // Сбор энергии
  const handleClick = () => {
    if (miningStore.isClaiming) {
      return;
    }

    if (balance > 0) {
      dispatch(setClaimingAction(true));
    }
  };

  useClaim(
    percent,
    balance,
    powerBalance,
    setPercent,
    setPowerBalance,
    setBalance
  );

  return (
    <>
      <div className="battery-power">
        <img
          className="battery-power__lightning lightning-with-back"
          src="./images/lightningWithBackground.png"
          alt="lightning"
        />
        <TextString
          secondSmall={lang === "ru" ? "Вт•Ч" : "W•h"}
          big={(+powerBalance?.toFixed())?.toLocaleString("ru")}
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
                  : percent?.toFixed(1)
              } %`}</p>
            </div>
          </div>
        </div>
        <button
          disabled={miningStore.isClaiming}
          onClick={() => handleClick()}
          className="battyry__collect"
        >
          {staticData?.ClaimButton.toUpperCase()}
        </button>
      </div>
    </>
  );
};

export default React.memo(Battery);
