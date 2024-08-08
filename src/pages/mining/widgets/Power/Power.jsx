import React from "react";
import UpBtn from "../../ui/UpBtn/UpBtn";
import TextString from "../../ui/TextSrting/TextString";
import HelpBtn from "../../ui/HelpBtn/HelpBtn";

import "./Power.css";

const Power = ({onClick}) => {
  return (
    <div className="power">
      <div className="power__info">
        <TextString
          firstSmall={"Мощность"}
          secondSmall={"Вт (в час)"}
          big={7653000}
        />
        <HelpBtn onClick={onClick}/>
      </div>
      <UpBtn />
    </div>
  );
};

export default React.memo(Power);
