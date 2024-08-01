import React, { useEffect, useRef, useState } from "react";
import "./PreviewPage.css";

export const PreviewPage = () => {
  const backImgRef = useRef(null);
  const [isBackImgLoading, setIsBackImgLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = backImgRef.current?.src;
    image.onload = () => {
      setIsBackImgLoading(false);
    };
  }, [isBackImgLoading]);

  return (
    <>
      {isBackImgLoading && <div className="mining-loader"></div>}
      <>
        <img
          ref={backImgRef}
          className="mining-info__background-img"
          src="./images/info-page-background.png"
          alt="background"
        />
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
      </>
    </>
  );
};
