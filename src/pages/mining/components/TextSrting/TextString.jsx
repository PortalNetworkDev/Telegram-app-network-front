import React from "react";
import "./TextString.css";

export const TextString = ({
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
        {typeof big === "number" ? big.toLocaleString("ru") : big}
      </span>
      <span style={{ fontSize: `${smallFontSize}` }} className="string__text">
        {secondSmall}
      </span>
    </p>
  );
};
