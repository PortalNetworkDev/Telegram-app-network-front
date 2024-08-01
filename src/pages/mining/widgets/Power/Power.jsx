import React from "react";
import { UpBtn } from "../../ui/UpBtn/UpBtn";
import { TextString } from "../../ui/TextSrting/TextString";
import "./Power.css";

export const Power = () => {
  return (
    <div className="power">
      <div className="power__info">
        <TextString
          firstSmall={"Мощность"}
          secondSmall={"Вт (в час)"}
          big={7653000}
        />
        <button className="power__help help">
          <img className="help__icon" src="./icon/help.svg" alt="help" />
        </button>
      </div>
      <UpBtn />
    </div>
  );
};
