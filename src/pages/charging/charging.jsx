import React from "react";
import "./charging.css";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useMeQuery } from "../../context/service/me.service";

export const Charging = () => {
  const { data: me = null } = useMeQuery();
  const lang = me?.language_code === "en" ? "en" : "ru";

  const navigate = useNavigate();
  const back = () => navigate(-1);

  const text = {
    ru: `
    Здесь вы сможете зарядить свой электромобиль. Пока что для зарядки
    воспользуйтесь приложением Portal Energy.
    `,
    en: `
    Here you can charge your electric car. For now for charging
    use the Portal Energy application.
    `,
  };

  return (
    <div className="page animate__animated animate__fadeIn">
      <div className="page__header">
        <h1>
          {lang === "en" ? "Section under development" : "Раздел в разработке"}
        </h1>
        <button onClick={back}>
          <IoArrowBack />
        </button>
      </div>

      <figure style={{ minHeight: 658 }} className="charging__image">
        <img src="images/charging.svg" alt="charging" loading="lazy" />
        <figcaption>
          <p>{text[lang]}</p>
          <p>
            <span>
              <a href="https://play.google.com/store/apps/details?id=com.portal_energy.android">
                Android
              </a>
            </span>
          </p>
          <p>
            <span>
              <a href="https://apps.apple.com/us/app/portal-energy/id1551935371">
                Apple
              </a>
            </span>
          </p>
          <img src="images/portal_enargy.svg" alt="portal_enargy" />
        </figcaption>
      </figure>
    </div>
  );
};
