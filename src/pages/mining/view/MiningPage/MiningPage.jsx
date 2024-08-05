import React from "react";
import "./MiningPage.css";
import Balance from "../../widgets/Balance/Balance";
import TextString from "../../ui/TextSrting/TextString";
import Power from "../../widgets/Power/Power";
import LazyLoad from "react-lazyload";
import Battery from "../../widgets/Battery/Battery";
import Generator from "../../widgets/Generator/Generator";

export const MiningPage = () => {
  return (
    <>
      <div className="mining-main">
        <LazyLoad>
          <img
            className="mining-main__background"
            src="./images/mining-main.png"
            alt="background"
          />
        </LazyLoad>
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
        <Battery />
        <Generator />
      </div>
    </>
  );
};
