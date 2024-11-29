import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import { setMiningAction } from "../../context/mining";
import Navigation from "./widgets/Navigation/Navigation";
import useBounding from "./helpers/useBounding";

export const Mining = () => {
  const navigate = useNavigate();
  const back = () => navigate("/");
  const dispatch = useDispatch();
  const colorScheme = useSelector((store) => store.colorScheme);
  const [preview, setPreview] = useState(true);

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
    }, 0);
  }, []);

  const { pageRef, left, width } = useBounding(true);

  return (
    <>
      <section
        ref={pageRef}
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
        <Outlet />
        {!preview && (
          <Navigation
            style={{
              width: `${width}px`,
              left: `${left}px`,
            }}
          />
        )}
      </section>
    </>
  );
};
