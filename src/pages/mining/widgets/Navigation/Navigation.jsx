import React from "react";
import "./Navigation.css";
import { NavLink, useLocation } from "react-router-dom";

const Navigation = () => {
  const navItems = [
    { title: "Майнить энергию", route: "" },
    { title: "Магазин", route: "store" },
    { title: "Розыгрыш призов", route: "gift" },
    { title: "Отправить кВт•Ч", route: "sendPower" },
    { title: "Задания", route: "tasks" },
  ];

  const location = useLocation();

  return (
    <div className="miningNavigation">
      <ul className="miningNavigation__list">
        {navItems.map((el) => {
          const isMainRoute =
            el.route === "" && location.pathname === "/mining";

          return (
            <li className="miningNavigation__item" key={el.route || "main"}>
              <NavLink
                to={`/mining/${el.route}`}
                className={({ isActive }) =>
                  isActive || isMainRoute
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
