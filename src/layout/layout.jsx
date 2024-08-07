import React, { memo, useEffect } from "react";
import "./layout.css";
import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setColorSchemeAction } from "../context/colorScheme";

export const Layout = memo(() => {
  const dispatch = useDispatch();
  const mining = useSelector((store) => store.mining);
  const colorScheme = useSelector((store) => store.colorScheme);

  //Устанавливаем цвет фона Telegram
  useEffect(() => {
    if (colorScheme === "light") {
      window.Telegram?.WebApp.setBackgroundColor("#ffffff");
      window.Telegram?.WebApp.setBackgroundColor("#ffffff");
    } else {
      window.Telegram?.WebApp.setHeaderColor("#212121");
      window.Telegram?.WebApp.setBackgroundColor("#042129");
    }
  }, [colorScheme]);

  //Подписываемся на изменение темы
  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    const handleThemeChange = () => {
      const newColorScheme = tg?.colorScheme;
      if (newColorScheme) {
        dispatch(setColorSchemeAction(newColorScheme));
      }
    };

    handleThemeChange();

    tg?.onEvent("themeChanged", handleThemeChange);

    return () => {
      tg?.offEvent("themeChanged", handleThemeChange);
    };
  }, [dispatch]);

  return (
    <main className="layout">
      <section
        className={`layout__content ${
          colorScheme === "light" && mining
            ? "layout__content_mining"
            : colorScheme !== "light" && mining
            ? "layout__content_dark layout__content_mining"
            : colorScheme !== "light"
            ? "layout__content_dark"
            : ""
        }`}
      >
        <Outlet />
      </section>
    </main>
  );
});
