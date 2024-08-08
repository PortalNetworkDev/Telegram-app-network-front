import React, { useEffect, useRef, useState } from "react";
import TextString from "../../ui/TextSrting/TextString";
import LazyLoad from "react-lazyload";
import UpBtn from "../../ui/UpBtn/UpBtn";
import HelpBtn from "../../ui/HelpBtn/HelpBtn";
import "./Battery.css";

const Battery = ({ onClick }) => {
  const imgRef = useRef(null);
  const [divisions, setDivisions] = useState([]);
  const [isImgLoading, setIsImgLoading] = useState(true);
  const [percent, setPercent] = useState(1);
  const [prev, setPrev] = useState(0);

  useEffect(() => {
    const image = new Image();
    image.src = "./images/battery.svg";
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
      return percent > index * 10 ? index : lastIndex;
    }, 0); // Начальное значение 0

    setPrev(lastActiveIndex);
  }, [percent, divisions]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => Math.min(prev + 10, 100));
    }, 5000);

    return () => clearInterval(interval); // Очистка интервала при размонтировании
  }, []);

  return (
    <div className="battery">
      <div className="battery__level level">
        <div className="level__info">
          <TextString
            firstSmall={"Уровень"}
            big={1}
            bigFontSize={"15px"}
            bigTextMargin={"0px 0px 0px 5px"}
          />
          <HelpBtn onClick={onClick}/>
        </div>
        <UpBtn />
      </div>
      <LazyLoad>
        <div className="battery__img-container">
          <img
            ref={imgRef}
            className="battery__img"
            src="./images/battery.svg"
            alt="battery"
          />
          {divisions.map((division, index) => {
            const isActive = percent > index * 10;
            const isLast = index === prev && isActive;

            return (
              <div
                key={index}
                className={`battery-division ${
                  isActive ? (isLast ? "activeDivision last" : "activeDivision") : ""
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
            src="./icon/lightningWithBackground.svg"
            alt="lightning"
          />
          <TextString
            big={[4950, 10000]}
            secondSmall={"Вт•Ч"}
            bigFontSize={"15px"}
            bigTextMargin={"0px 5px 0px 10px"}
          />
        </div>
        <div className="battery__accumulation accumulation">
          <p className="accumulation__text">Накоплено</p>
          <div className="accumulation__percent">
            <img
              className="accumulation__progrecc-img"
              src="./icon/accumulation-progress.svg"
              alt="progress"
            />
            <p className="accumulation__value">100%</p>
          </div>
        </div>
      </div>
      <button className="battyry__collect" onClick={onClick}>
        СОБРАТЬ
      </button>
    </div>
  );
};

export default React.memo(Battery);
