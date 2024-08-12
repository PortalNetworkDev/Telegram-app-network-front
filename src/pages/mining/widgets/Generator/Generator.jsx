import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Generator.css";
import TextString from "../../ui/TextSrting/TextString";
import HelpBtn from "../../ui/HelpBtn/HelpBtn";
import UpBtn from "../../ui/UpBtn/UpBtn";

const Generator = ({ onClick }) => {
  //Анимация
  const genRef = useRef(null);
  const [countOfRotate, setCountOfRotate] = useState(0);
  const maxSpeed = 12;
  const startSpeedMultiplier = 2;
  const rotation = useRef(0.01);
  const animationRef = useRef(null);
  const [isRotating, setIsRotating] = useState(false);
  const speedFromVibration = useRef(0);

  const rotateFunc = () => {
    let currentSpeed = 0;
    const acceleration = 5;
    const maxRotation = 360 * countOfRotate;

    const rotate = () => {
      if (genRef.current && rotation.current) {
        currentSpeed = Math.min(currentSpeed + acceleration, maxSpeed);

        let speed =
          currentSpeed *
          Math.sin((Math.PI * rotation.current) / maxRotation) *
          startSpeedMultiplier;

        if (speed < 1) {
          speed = 1;
        }

        speedFromVibration.current = speed;

        rotation.current += speed;

        if (rotation.current >= maxRotation) {
          rotation.current = maxRotation;
          setIsRotating(false);
        }

        genRef.current.style.transform = `rotate(${rotation.current}deg)`;
        animationRef.current = requestAnimationFrame(rotate); // Запрос следующего кадра
      } else {
        cancelAnimationFrame(animationRef.current); // Остановка анимации
        setIsRotating(false);
      }
    };

    animationRef.current = requestAnimationFrame(rotate); // Запуск анимации
    setIsRotating(true);
  };

  const rotateFuncMemo = useCallback(rotateFunc, [countOfRotate]); // Мемоизация функции

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

    const handleVibration = (speed) => {
      const vibrationStrength = Math.min(speed / 12, 1); // maxSpeed = 12
      if (navigator.vibrate) {
        navigator.vibrate(vibrationStrength * 100); // Вибрация в миллисекундах
      }
    };

    handleVibration(speedFromVibration);
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

  useEffect(() => {
    if (!isRotating) {
      setCountOfRotate(0);
      rotation.current = 0.1;
      cancelAnimationFrame(animationRef.current);
    }
  }, [isRotating]);

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
      <div className="geterator__rotateContainer">
        <img
          ref={genRef}
          onClick={handleClick}
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
