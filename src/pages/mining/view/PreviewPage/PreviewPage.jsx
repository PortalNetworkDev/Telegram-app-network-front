import React, { useEffect, useRef, useState } from "react";
import "./PreviewPage.css";

export const PreviewPage = () => {
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
      const rect = imgRef.current.getBoundingClientRect();
      setImgProperties(rect.height);
    }
  }, [isImgLoading, imgProperties]);

  return (
    <>
      <img
        style={{ top: `${(clientHeight - imgProperties) / 2}px` }}
        ref={imgRef}
        src="./images/backGen.png"
        alt="bacground-gen"
        className="mining-info__gen"
      />
      <div className="mining-loader">
        <img
          src="./icon/lightning.svg"
          alt="lightning"
          className="mining-info__lightning"
        />
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
    </>
  );
};
