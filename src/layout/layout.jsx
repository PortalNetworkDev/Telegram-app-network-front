import React, { memo, useEffect } from "react";
import "./layout.css";
import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setColorSchemeAction } from "../context/colorScheme";

export const Layout = memo(() => {
  const dispatch = useDispatch();
  const mining = useSelector((store) => store.mining.isMining);
  const colorScheme = useSelector((store) => store.colorScheme);

  //Устанавливаем цвет фона Telegram
  useEffect(() => {
    if (colorScheme === "light") {
      window.Telegram?.WebApp.setHeaderColor("#ffffff");
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

    tg?.onEvent("themeChanged", () => handleThemeChange);

    return () => {
      tg?.offEvent("themeChanged", () => handleThemeChange);
    };
  }, [dispatch]);

  // Запрещаем поворот экрана
  useEffect(() => {
    if (window.Telegram.WebApp.lockOrientation) {
      window.Telegram.WebApp.lockOrientation();
    } else {
      console.warn("lockOrientation is not supported in this environment");
    }
  }, []);

  //Пробный запрос установки эмодзи
  // useEffect(() => {
  //   if (window.Telegram.WebApp.setEmojiStatus) {
  //     window.Telegram.WebApp.setEmojiStatus(
  //       "5247176376045294117",
  //       { duration: 3600 },
  //       (success) => {
  //         if (success) {
  //           console.log("Эмодзи статус был успешно установлен!");
  //         } else {
  //           console.log("Не удалось установить эмодзи статус");
  //         }
  //       }
  //     );
  //   } else {
  //     console.warn("setEmojiStatus is not supported in this environment");
  //   }
  // }, []);

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
