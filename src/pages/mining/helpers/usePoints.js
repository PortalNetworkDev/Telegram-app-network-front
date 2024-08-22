import  {  useEffect, useState } from "react";

export const usePoints = (genRef, rotateContainerRef, pointRef) => {
  const rotateContainerBounding =
    rotateContainerRef.current?.getBoundingClientRect();
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
          rotateContainerBounding?.x * 2.2 +
          (Math.floor(Math.random() * (2 * 150 + 1)) - 150),
      }));
      setPositions(newPositions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isImgLoading]);

  return {
    positions,
    isImgLoading,
  };
};
