import React, { useEffect, useRef, useState } from "react";
import "./charging.css";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useMeQuery } from "../../context/service/me.service";

export const Charging = () => {
  const { data: me = null } = useMeQuery();
  const lang = me?.language_code === "en" ? "en" : "ru";
  const backImgRef = useRef(null);
  const logoImgRef = useRef(null);

  const navigate = useNavigate();
  const back = () => navigate(-1);

  const [isBackImgLoading, setIsBackImgLoading] = useState(true);
  const [isLogoImgLoading, setIsLogoImgLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = backImgRef.current.src;
    image.onload = () => {
      setIsBackImgLoading(false);
    };
  }, [isBackImgLoading]);

  useEffect(() => {
    const image = new Image();
    image.src = logoImgRef.current.src;
    image.onload = () => {
      setIsLogoImgLoading(false);
    };
  }, [isLogoImgLoading]);

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
        <img
          style={{
            display: isBackImgLoading ? "none" : "block",
          }}
          ref={backImgRef}
          src="images/charging.svg"
          alt="charging"
          loading="lazy"
        />
        <div
          style={{
            height: 658,
            display: !isBackImgLoading ? "none" : "block",
            borderRadius: 15,
          }}
          className="loading-div"
        ></div>
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
          <img
            ref={logoImgRef}
            style={{
              display: isLogoImgLoading ? "none" : "block",
            }}
            src="images/portal_enargy.svg"
            alt="portal_enargy"
          />
          <div
            style={{
              height: 23,
              width: 140,
              display: !isLogoImgLoading ? "none" : "block",
              borderRadius: 5,
            }}
            className="loading-div"
          ></div>
        </figcaption>
      </figure>
    </div>
  );
};
