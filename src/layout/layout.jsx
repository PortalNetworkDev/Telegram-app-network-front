import React, { memo, useEffect } from "react";
import "./layout.css";
import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setColorSchemeAction } from "../context/colorScheme";

export const Layout = memo(() => {
  const dispatch = useDispatch();
  const colorScheme = useSelector((store) => store.colorScheme);

  const tg = window.Telegram?.WebApp?.colorScheme;

  useEffect(() => {
    if (tg) {
      dispatch(setColorSchemeAction(tg));
    }
  }, [dispatch, tg]);

  return (
    <main className="layout">
      <section
        className={
          colorScheme === "light"
            ? "layout__content layout__content_light"
            : "layout__content layout__content_dark"
        }
      >
        <Outlet />
      </section>
    </main>
  );
});
