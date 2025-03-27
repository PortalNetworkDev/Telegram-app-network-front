import React from "react";
import "./Navigation.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMiningAction, setPreviewAction } from "../../../../context/mining";

const Navigation = ({ style }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const colorScheme = useSelector((store) => store.colorScheme);

  const navItems = [
    { title: "Майнить энергию", route: "" },
    { title: "Магазин", route: "store" },
    { title: "Розыгрыш призов", route: "raffle" },
    { title: "Отправить Вт•Ч", route: "transactions" },
    { title: "Задания", route: "tasks" },
  ];

  const miningStore = useSelector((store) => store.mining);

  const location = useLocation();

  return (
    <div style={style} className="miningNavigation">
      <ul className="miningNavigation__list">
        {navItems.map((el) => {
          let isCurrentRoute;

          el.route === ""
            ? (isCurrentRoute = location.pathname === "/mining")
            : (isCurrentRoute = location.pathname === `/mining/${el.route}`);
          if (el.route === "tasks") {
            return (
              <li className="miningNavigation__item" key={el.route || "main"}>
                <div
                  style={{ pointerEvents: miningStore.isRotate && "none" }}
                  className={
                    isCurrentRoute
                      ? "miningNavigation__link miningNavigation__link_active"
                      : "miningNavigation__link"
                  }
                  onClick={() => {
                    navigate("/task");
                    dispatch(setMiningAction(false));
                    dispatch(setPreviewAction(true));
                    if (colorScheme === "light") {
                      window.Telegram?.WebApp.setHeaderColor("#ffffff");
                      window.Telegram?.WebApp.setBackgroundColor("#ffffff");
                    } else {
                      window.Telegram?.WebApp.setHeaderColor("#212121");
                      window.Telegram?.WebApp.setBackgroundColor("#042129");
                    }
                  }}
                >
                  {el.title}
                </div>
              </li>
            );
          }
          return (
            <li className="miningNavigation__item" key={el.route || "main"}>
              <NavLink
                style={{ pointerEvents: miningStore.isRotate && "none" }}
                to={el.route === "" ? "/mining" : `/mining/${el.route}`}
                className={
                  isCurrentRoute
                    ? "miningNavigation__link miningNavigation__link_active"
                    : "miningNavigation__link"
                }
              >
                {el.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <NavLink
        style={{ width: "100%", pointerEvents: miningStore.isRotate && "none" }}
        to={"/mining/profile"}
      >
        <button
          style={{ width: "100%" }}
          className=" miningNavigation__provileBtn battyry__collect"
        >
          Мой профиль
        </button>
      </NavLink>
    </div>
  );
};

export default React.memo(Navigation);
