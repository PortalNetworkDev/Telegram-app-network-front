import React from "react";
import "./MiningPage.css";
import { Balance } from "../../widgets/Balance/Balance";
import { TextString } from "../../ui/TextSrting/TextString";
import { UpBtn } from "../../ui/UpBtn/UpBtn";
import { Power } from "../../widgets/Power/Power";
import { HelpBtn } from "../../ui/HelpBtn/HelpBtn";

export const MiningPage = () => {
  return (
    <>
      <div className="mining-main">
        <img
          className="mining-main__background"
          src="./images/mining-main.png"
          alt="background"
        />
        <Balance balance={100000000} currency={1000} />

        <Power />
        <div className="battery-power">
          <img
            className="battery-power__lightning lightning-with-back"
            src="./icon/lightningWithBackground.svg"
            alt="lightning"
          />
          <TextString
            secondSmall={"кВт•Ч"}
            big={5000000}
            bigFontSize={"32px"}
          />
        </div>
        <div className="battery-level level">
          <div className="level__info">
            <TextString
              firstSmall={"Уровень"}
              big={1}
              bigFontSize={"17px"}
              bigTextMargin={"0px 0px 0px 3px"}
            />
            <HelpBtn />
          </div>
          <UpBtn />
        </div>
        <div className="battery">
          <img
            className="battery__img"
            src="./images/battery.png"
            alt="battery"
          />
        </div>
      </div>
    </>
  );
};
