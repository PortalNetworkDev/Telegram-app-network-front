import { useCallback, useRef, useState } from "react";

export const useRotate = (genRef,lastClickTimeRef,animationRef) => {
  const [isRotating, setIsRotating] = useState(false);
  const speedRef = useRef(null);
  const rotation = useRef(0.01);
  const acceleration = 0.3;
  const maxSpeed = 32;

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

  const rotateFuncMemo = useCallback(rotateFunc, [genRef,lastClickTimeRef,animationRef]); // Мемоизация функции

  return {
    isRotating,
    rotateFuncMemo
  };
};