import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Generator.css";
import TextString from "../../ui/TextSrting/TextString";
import HelpBtn from "../../ui/HelpBtn/HelpBtn";
import UpBtn from "../../ui/UpBtn/UpBtn";

const Generator = ({ onClick }) => {
  //Анимация вращения start
  const genRef = useRef(null);
  const [countOfRotate, setCountOfRotate] = useState(0);
  const rotation = useRef(0.01);
  const animationRef = useRef(null);
  const [isRotating, setIsRotating] = useState(false);
  const speedRef = useRef(null);
  const maxSpeed = 32;
  const acceleration = 0.1;

  const rotateFunc = () => {
    const rotate = () => {
      if (genRef.current && rotation.current) {
        if (Date.now() - lastClickTimeRef.current < 300) {
          speedRef.current += acceleration;
          speedRef.current > maxSpeed && (speedRef.current = maxSpeed);
        } else {
          speedRef.current -= acceleration;
          speedRef.current <= 0 && (speedRef.current = 0);
        }

        rotation.current += speedRef.current;
        genRef.current.style.transform = `rotate(${rotation.current}deg)`;
        speedRef.current === 0 && setIsRotating(false);

        animationRef.current = requestAnimationFrame(rotate); // Запрос следующего кадра
      }
    };

    animationRef.current = requestAnimationFrame(rotate); // Запуск анимации
    setIsRotating(true);
  };

  const rotateFuncMemo = useCallback(rotateFunc, []); // Мемоизация функции

  useEffect(() => {
    if (!isRotating) {
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
        top:
          rotateContainerBounding?.y * 1.1 -
          (Math.floor(Math.random() * 50) + 1),
        left:
          rotateContainerBounding?.x / 1.5 +
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

  return (
    <div className="generator">
      <div className=" generator__level level">
        <div className="level__info">
          <TextString
            firstSmall={"Уровень"}
            big={1}
            bigFontSize={"15px"}
            bigTextMargin={"0px 0px 0px 5px"}
          />
          <HelpBtn onClick={onClick} />
        </div>
        <UpBtn onClick={onClick} />
      </div>
      <div
        ref={rotateContainerRef}
        onClick={handleClick}
        className="geterator__rotateContainer"
      >
        <img
          ref={genRef}
          onClick={handleClick}
          className="geterator__img"
          src="./images/generatorFromRotate.png"
          alt="generator"
        />
      </div>
      {pointRef.current.map((ref, index) => {
        return (
          <div
            style={{
              top: `${positions[index]?.top}px`,
              left: `calc(40vw + ${positions[index]?.left}px)`,
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
      <div className="generator__power level__info">
        <img
          className="generator__lightning lightning-with-back"
          src="./images/lightningWithBackground.png"
          alt="lightning"
        />
        <TextString
          big={[5000, 5000]}
          secondSmall={"Вт•Ч"}
          bigFontSize={"15px"}
          bigTextMargin={"0px 5px 0px 10px"}
        />
      </div>
    </div>
  );
};

export default React.memo(Generator);
