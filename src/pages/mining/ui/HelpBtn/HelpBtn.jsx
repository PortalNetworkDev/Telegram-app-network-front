import React from "react";
import "./HelpBtn.css";
import LazyLoad from "react-lazyload";

const HelpBtn = ({ onClick }) => {
  return (
    <button onClick={onClick} className="power__help help">
      <LazyLoad>
        <img className="help__icon" src="./icon/help.svg" alt="help" />
      </LazyLoad>
    </button>
  );
};

export default React.memo(HelpBtn);
