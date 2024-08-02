import React from "react";
import TextString from "../../ui/TextSrting/TextString";
import LazyLoad from "react-lazyload";
import UpBtn from "../../ui/UpBtn/UpBtn";
import HelpBtn from "../../ui/HelpBtn/HelpBtn";
import "./Battery.css";

const Battery = ({onClick}) => {
  return (
    <div className="battery">
      <div className=" battery__level level">
        <div className="level__info">
          <TextString
            firstSmall={"Уровень"}
            big={1}
            bigFontSize={"15px"}
            bigTextMargin={"0px 0px 0px 5px"}
          />
          <HelpBtn />
        </div>
        <UpBtn />
      </div>
      <LazyLoad>
        <img
          className="battery__img"
          src="./images/battery.png"
          alt="battery"
        />
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
      <button className="battyry__collect" onClick={onClick}>СОБРАТЬ</button>
    </div>
  );
};

export default React.memo(Battery);
