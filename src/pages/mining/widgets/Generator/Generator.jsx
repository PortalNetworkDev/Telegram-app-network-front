import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Generator.css";
import TextString from "../../ui/TextSrting/TextString";
import HelpBtn from "../../ui/HelpBtn/HelpBtn";
import UpBtn from "../../ui/UpBtn/UpBtn";
import { useMeQuery } from "../../../../context/service/me.service";
import { useMiningQuery } from "../../../../context/service/mining.service";

const Generator = ({ onClick, upBtnAction }) => {
  const { data: me = null } = useMeQuery();
  const lang = me?.language_code === "en" ? "en" : "ru";
  const { data: mining = null } = useMiningQuery();

  const [level, setlevel] = useState(0);
  const [balance, setBalance] = useState(0);
  const [limit, setlimit] = useState(0);

  useEffect(() => {
    setlimit(mining?.generator_limit);
    setlevel(mining?.generator_level);
    setBalance(mining?.generator_balance);
  }, [mining]);

  //Анимация вращения start
  const genRef = useRef(null);
  const [countOfRotate, setCountOfRotate] = useState(0);
  const rotation = useRef(0.01);
  const animationRef = useRef(null);
  const [isRotating, setIsRotating] = useState(false);
  const speedRef = useRef(null);
  const maxSpeed = 32;
  const acceleration = 0.3;

  const rotateFunc = () => {
    const rotate = () => {
      if (genRef.current && rotation.current) {
        if (Date.now() - lastClickTimeRef.current < 300) {
          speedRef.current += acceleration;
          speedRef.current > maxSpeed && (speedRef.current = maxSpeed);
        } else {
          speedRef.current -= acceleration * 2;
          speedRef.current <= 0 && (speedRef.current = 0);
        }

        rotation.current += speedRef.current;
        genRef.current.style.transform = `rotate(${rotation.current}deg)`;

        animationRef.current = requestAnimationFrame(rotate); // Запрос следующего кадра
        speedRef.current !== 0 ? setIsRotating(true) : setIsRotating(false);
      }
    };
    animationRef.current = requestAnimationFrame(rotate); // Запуск анимации
  };

  const rotateFuncMemo = useCallback(rotateFunc, []); // Мемоизация функции

  useEffect(() => {
    if (!isRotating) {
      console.log("стоит!");

      setCountOfRotate(0);
      cancelAnimationFrame(animationRef.current);
    }
  }, [isRotating]);
  //Анимация вращения end

  //Анимация всплытия points start
  const rotateContainerRef = useRef(null);
  const rotateContainerBounding =
    rotateContainerRef.current?.getBoundingClientRect();
  const pointRef = useRef(Array.from({ length: 100 }, () => React.createRef()));
  const [positions, setPositions] = useState([]);
  const [isImgLoading, setIsImgLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = "./images/generatorFromRotate.png";
    image.onload = () => {
      setIsImgLoading(false);
    };
  }, []);

  useEffect(() => {
    if (!isImgLoading && genRef.current) {
      const newPositions = pointRef.current.map(() => ({
        top: 70 - (Math.floor(Math.random() * 50) + 1),
        left:
          rotateContainerBounding?.x / 1.75 +
          (Math.floor(Math.random() * (2 * 150 + 1)) - 150),
      }));
      setPositions(newPositions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isImgLoading]);
  //Анимация всплытия points end

  // Обработчик кликов с ограничением 5 кликов в секунду
  const clickCountRef = useRef(0);
  const lastClickTimeRef = useRef(0);

  const handleClick = () => {
    const now = Date.now();
    if (now - lastClickTimeRef.current < 200) {
      return;
    }
    if (clickCountRef.current >= 5) {
      return;
    }

    clickCountRef.current += 1;
    lastClickTimeRef.current = now;

    setCountOfRotate((prev) => prev + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      clickCountRef.current = 0;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    rotateFuncMemo();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [countOfRotate, rotateFuncMemo]);

  //Определение размеров генератора
  const genBounding = useRef(null);

  useEffect(() => {
    if (!isImgLoading && genRef.current) {
      genBounding.current = genRef.current.getBoundingClientRect();
    }
  }, [isImgLoading]);

  return (
    <>
      <div className="poin-container">
        {pointRef.current.map((ref, index) => {
          return (
            <div
              style={{
                top: `${positions[index]?.top}px`,
                left: `${positions[index]?.left * 1.7}px`,
              }}
              key={index}
              ref={ref}
              className={`${
                index < countOfRotate % pointRef.current.length
                  ? "generator-point"
                  : "generator-point_invisible"
              }`}
            >
              +1
            </div>
          );
        })}
      </div>
      <div className="generator">
        <div className=" generator__level level">
          <div className="level__info">
            <TextString
              firstSmall={lang === "ru" ? "Уровень" : "Level"}
              big={level}
              bigFontSize={"15px"}
              bigTextMargin={"0px 0px 0px 5px"}
            />
            <HelpBtn onClick={onClick} />
          </div>
          <UpBtn onClick={upBtnAction} />
        </div>
        <div
          ref={rotateContainerRef}
          onClick={handleClick}
          className="geterator__rotateContainer"
        >
          <div
            style={{
              top: `${genBounding.current?.height / 2}px`,
              left: `${genBounding.current?.width / 2}px`,
              transform: "translate(-51%, -50%)",
            }}
            className="loader-container"
          >
            <img
              className={`loader ${
                isRotating ? "loader__animation-start" : "loader__animation-end"
              }`}
              src="./gif/loader.gif"
              alt="loader"
            />
          </div>
          <img
            ref={genRef}
            className="geterator__img"
            src="./images/generatorFromRotate.png"
            alt="generator"
          />
        </div>
        <div className="generator__power level__info">
          <img
            className="generator__lightning lightning-with-back"
            src="./images/lightningWithBackground.png"
            alt="lightning"
          />
          <TextString
            big={[balance || 0, limit]}
            secondSmall={lang === 'ru' ? "Вт•Ч" : "W•h"}
            bigFontSize={"15px"}
            bigTextMargin={"0px 5px 0px 10px"}
          />
        </div>
      </div>
    </>
  );
};

export default React.memo(Generator);
