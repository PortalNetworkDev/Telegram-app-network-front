import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

import { PreviewPage } from "./view/PreviewPage/PreviewPage";
import { MiningPage } from "./view/MiningPage/MiningPage";
import { useDispatch, useSelector } from "react-redux";
import { setMiningAction } from "../../context/mining";

export const Mining = () => {
  const navigate = useNavigate();
  const back = () => navigate(-1);
  const dispatch = useDispatch();
  const colorScheme = useSelector((store) => store.colorScheme);
  const [preview, setPreview] = useState(true);
  const [isGeneratorLoading, setIsGeneratorLoading] = useState(true);

  //Устанавливаем цвет фона Telegram
  useEffect(() => {
    window.Telegram?.WebApp.setHeaderColor("#212121");
    window.Telegram?.WebApp.setBackgroundColor("#0d0b0e");
  }, []);

  //Говорим, что открыта страница майнинга
  useEffect(() => {
    dispatch(setMiningAction(true));
  }, [dispatch]);

  //Возвращаем цвет Telegram
  const returnTgColor = () => {
    if (colorScheme === "light") {
      window.Telegram?.WebApp.setHeaderColor("#ffffff");
      window.Telegram?.WebApp.setBackgroundColor("#ffffff");
    } else {
      window.Telegram?.WebApp.setHeaderColor("#212121");
      window.Telegram?.WebApp.setBackgroundColor("#042129");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setPreview(false);
    }, 3000);
  }, []);

  return (
    <>
      <section
        className={
          preview
            ? `${"mining-info__body"}`
            : `${"mining-info__body_withScroll"}`
        }
      >
        <div className="mining-info__header">
          <button
            className="back-btn"
            onClick={() => {
              back();
              dispatch(setMiningAction(false));
              returnTgColor();
            }}
          >
            <IoArrowBack />
          </button>
        </div>
        <PreviewPage
          display={preview || isGeneratorLoading ? "block" : "none"}
        />
        <MiningPage
          setGeneratorLoading={setIsGeneratorLoading}
          opacity={preview || isGeneratorLoading ? "0" : "1"}
        />
      </section>
    </>
  );
};
