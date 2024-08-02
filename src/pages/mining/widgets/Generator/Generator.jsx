import React from "react";
import "./Generator.css";
import TextString from "../../ui/TextSrting/TextString";
import HelpBtn from "../../ui/HelpBtn/HelpBtn";
import UpBtn from "../../ui/UpBtn/UpBtn";

const Generator = () => {
  return (
    <div className="generator">
      <div className=" generator__level level">
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
      <div className="geterator__rotateContainer">
        <img
          className="geterator__img"
          src="./images/generatorFromRotate.png"
          alt="generator"
        />
      </div>
      <div className="generator__power level__info">
        <img
          className="generator__lightning lightning-with-back"
          src="./icon/lightningWithBackground.svg"
          alt="lightning"
        />
        <TextString
          big={[5000, 5000]}
          secondSmall={"Вт•Ч"}
          bigFontSize={"15px"}
          bigTextMargin={"0px 5px 0px 10px"}
        />
      </div>
    </div>
  );
};

export default React.memo(Generator);
