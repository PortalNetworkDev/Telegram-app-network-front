import React from "react";
import "./Navigation.css";
import { NavLink, useLocation } from "react-router-dom";

const Navigation = ({ style }) => {
  const navItems = [
    { title: "Майнить энергию", route: "" },
    { title: "Магазин", route: "store" },
    { title: "Розыгрыш призов", route: "gift" },
    { title: "Отправить кВт•Ч", route: "sendPower" },
    { title: "Задания", route: "tasks" },
  ];

  const location = useLocation();

  return (
    <div style={style} className="miningNavigation">
      <ul className="miningNavigation__list">
        {navItems.map((el) => {
          let isCurrentRoute;

          el.route === ""
            ? (isCurrentRoute = location.pathname === "/mining")
            : (isCurrentRoute = location.pathname === `/mining/${el.route}`);

          return (
            <li className="miningNavigation__item" key={el.route || "main"}>
              <NavLink
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
      <button className="battyry__collect miningNavigation__provileBtn">
        Мой профиль
      </button>
    </div>
  );
};

export default React.memo(Navigation);
