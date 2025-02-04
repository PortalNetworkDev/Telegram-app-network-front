import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import { setMiningAction, setPreviewAction } from "../../context/mining";
import Navigation from "./widgets/Navigation/Navigation";
import useBounding from "./helpers/useBounding";

export const Mining = () => {
  const navigate = useNavigate();
  const back = () => navigate("/");
  const dispatch = useDispatch();
  const colorScheme = useSelector((store) => store.colorScheme);
  const preview = useSelector((store) => store.mining.preview);

  //Устанавливаем цвет фона Telegram
  useEffect(() => {
    window.Telegram?.WebApp.setHeaderColor("#212121");
    window.Telegram?.WebApp.setBackgroundColor("#0d0b0e");
  }, []);


  //NOTE: delete after check
  useEffect(() => {
    console.log(window.Telegram?.WebApp.initDataUnsafe.user, "USER DATA");
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

  const location = useLocation();

  const { pageRef, left, width } = useBounding(true);

  return (
    <>
      <section
        ref={pageRef}
        className={
          location.pathname === "/mining/boost" ||
          (preview && location.pathname === "/mining")
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
              dispatch(setPreviewAction(true));
              returnTgColor();
            }}
          >
            <IoArrowBack />
          </button>
        </div>
        <Outlet />
        {location.pathname === "/mining/boost" ? (
          <div></div>
        ) : location.pathname === "/mining" && preview ? (
          <div></div>
        ) : (
          <Navigation
            style={{
              width: `${width + left * 2}px`,
              left: `${0}px`,
            }}
          />
        )}
      </section>
    </>
  );
};
