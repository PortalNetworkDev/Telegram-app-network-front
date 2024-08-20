import React from "react";
import UpBtn from "../../ui/UpBtn/UpBtn";
import TextString from "../../ui/TextSrting/TextString";
import HelpBtn from "../../ui/HelpBtn/HelpBtn";

import "./Power.css";
import { useMeQuery } from "../../../../context/service/me.service";
import { useMiningQuery } from "../../../../context/service/mining.service";

const Power = ({ onClick , upBtnAction }) => {
  const { data: me = null } = useMeQuery();
  const lang = me?.language_code === "en" ? "en" : "ru";
  const { data: mining = null } = useMiningQuery();

  return (
    <div className="power">
      <div className="power__info">
        <TextString
          firstSmall={`${lang === 'ru' ? 'Мощность' : 'Power'}`}
          secondSmall={`${lang === 'ru' ? 'Вт (в час)' : 'W (per hour)'}`}
          big={mining?.power_poe}
        />
        <HelpBtn onClick={onClick} />
      </div>
      <UpBtn onClick={upBtnAction}/>
    </div>
  );
};

export default React.memo(Power);
