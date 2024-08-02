import React from "react";
import "./TextString.css";

const TextString = ({
  firstSmall,
  big,
  secondSmall,
  bigFontSize,
  smallFontSize,
  bigTextMargin,
}) => {
  return (
    <p className="string">
      <span style={{ fontSize: `${smallFontSize}` }} className="string__text">
        {firstSmall}
      </span>
      <span
        style={{ fontSize: `${bigFontSize}`, margin: `${bigTextMargin}` }}
        className="string__text_big"
      >
        {Array.isArray(big) &&
        typeof big[0] === "number" &&
        typeof big[1] === "number"
          ? `${big[0].toLocaleString("ru")} | ${big[1].toLocaleString("ru")}`
          : typeof big === "number"
          ? big.toLocaleString("ru")
          : big}
      </span>
      <span style={{ fontSize: `${smallFontSize}` }} className="string__text">
        {secondSmall}
      </span>
    </p>
  );
};

export default React.memo(TextString);
