import React, { useEffect, useRef, useState } from "react";
import "./PreviewPage.css";

export const PreviewPage = ({ display }) => {
  const imgRef = useRef(null);
  const [isImgLoading, setIsImgLoading] = useState(true);
  const [imgProperties, setImgProperties] = useState("0");
  const clientHeight = window.innerHeight;

  useEffect(() => {
    const image = new Image();
    image.src = "./images/backGen.png";
    image.onload = () => {
      setIsImgLoading(false);
    };
  }, []);

  useEffect(() => {
    if (!isImgLoading) {
      const rect = imgRef.current?.getBoundingClientRect();
      setImgProperties(rect);
    }
  }, [isImgLoading]);

  return (
    <div style={{ display: display }}>
      <div
        className="backGen-container"
        style={{
          top: `${(clientHeight - imgProperties?.height) / 2}px`,
        }}
      >
        <img
          ref={imgRef}
          src="./images/backGen.png"
          alt="bacground-gen"
          className="mining-info__gen"
        />
        <img
          style={{
            top: `calc(${imgProperties?.height / 2.1105}px)`,
            left: `calc(${imgProperties?.width / 2.105}px)`,
          }}
          src="./icon/lightning.svg"
          alt="lightning"
          className="mining-info__lightning"
        />
      </div>
      <div className="mining-loader">
        <img
          className="mining-info__logo"
          src="./images/logoFromMining.svg"
          alt="logo"
        />
        <div className="mininf-info__text info-text">
          <h1 className="info-text__title">
            Покупайте и храните POE — получайте Вт•Ч
          </h1>
          <p className="info-text__desc"> 1 POE = 5 000 Вт</p>
        </div>
      </div>
    </div>
  );
};
