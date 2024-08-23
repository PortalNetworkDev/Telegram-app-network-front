import React, { useEffect, useRef, useState } from "react";
import "./Generator.css";
import TextString from "../../ui/TextSrting/TextString";
import HelpBtn from "../../ui/HelpBtn/HelpBtn";
import UpBtn from "../../ui/UpBtn/UpBtn";
import { useMeQuery } from "../../../../context/service/me.service";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenModalAction,
  setRotateAction,
  updateData,
} from "../../../../context/mining";
import {
  useLazyGenRewardQuery,
  useMiningQuery,
} from "../../../../context/service/mining.service";
import { useRotate } from "../../helpers/useRotate";
import { usePoints } from "../../helpers/usePoints";

const Generator = ({
  onClick,
  upBtnAction,
  setGeneratorLoading,
  multitabUp,
}) => {
  const dispatch = useDispatch();
  const miningStore = useSelector((store) => store.mining);
  const [genReward] = useLazyGenRewardQuery();
  const { data: me = null } = useMeQuery();
  const lang = me?.language_code === "en" ? "en" : "ru";
  const level = miningStore?.generator_level;
  const balance = miningStore?.generator_balance;
  const limit = miningStore?.generator_limit;

  const [isFirstRender, setIsFirstRender] = useState(true);

  //Анимация вращения и отправка данных start
  const genRef = useRef(null);
  const [countOfRotate, setCountOfRotate] = useState(0);
  const animationRef = useRef(null);
  const lastClickTimeRef = useRef(0);
  const clickCountRef = useRef(0);
  const { isRotating, rotateFuncMemo } = useRotate(
    genRef,
    lastClickTimeRef,
    animationRef
  );
  const { refetch: refetchMining } = useMiningQuery(undefined, {
    skip: isRotating || miningStore.isClaiming,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (!miningStore.isClaiming) {
        !isRotating && refetchMining();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [refetchMining, isRotating, miningStore.isClaiming]);

  const fetchData = async (count) => {
    await genReward(count);
    setTimeout(() => {
      refetchMining().catch((err) => console.error(err));
    }, 300);
  };

  useEffect(() => {
    setIsFirstRender(false);
    dispatch(setRotateAction(isRotating));
    if (!isRotating && !isFirstRender && !miningStore.isClaiming) {
      fetchData(countOfRotate);
      setCountOfRotate(0);
      cancelAnimationFrame(animationRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRotating, dispatch]);

  //Анимация всплытия points start
  const rotateContainerRef = useRef(null);
  const pointRef = useRef(Array.from({ length: 100 }, () => React.createRef()));
  const { positions, isImgLoading } = usePoints(
    genRef,
    rotateContainerRef,
    pointRef
  );

  // Обработчик кликов с ограничением 5 кликов в секунду
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

    setCountOfRotate((prev) => prev + miningStore?.multitab);
    dispatch(
      updateData({
        ...miningStore,
        battery_balance:
          miningStore.battery_balance + miningStore?.multitab >
          miningStore.battery_capacity
            ? miningStore.battery_capacity
            : miningStore.battery_balance + miningStore?.multitab,
        generator_balance:
          miningStore.generator_balance - miningStore?.multitab < 1
            ? 0
            : miningStore.generator_balance - miningStore?.multitab,
      })
    );
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
    !isImgLoading && setGeneratorLoading(false);
    if (!isImgLoading && genRef.current) {
      genBounding.current = genRef.current.getBoundingClientRect();
    }
  }, [isImgLoading, setGeneratorLoading]);

  return (
    <>
      <div className="poin-container">
        {pointRef.current.map((ref, index) => {
          return (
            <div
              style={{
                top: `${positions[index]?.top}px`,
                left: `${positions[index]?.left}px`,
              }}
              key={index}
              ref={ref}
              className={`${
                index <
                (countOfRotate / miningStore?.multitab) %
                  pointRef.current.length
                  ? "generator-point"
                  : "generator-point_invisible"
              }`}
            >
              {`+${miningStore?.multitab}`}
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
          onClick={() => {
            if (
              miningStore.generator_balance > 1 &&
              miningStore.battery_balance < miningStore.battery_capacity
            ) {
              handleClick(setCountOfRotate);
            } else {
              dispatch(setOpenModalAction(true));
            }
          }}
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
          <div className="battery__level-info level__info">
            <img
              className="battery__lightning lightning-with-back"
              src="./images/lightningWithBackground.png"
              alt="lightning"
            />
            <TextString
              big={[+balance?.toFixed() || 0, limit]}
              secondSmall={lang === "ru" ? "Вт•Ч" : "W•h"}
              bigFontSize={"15px"}
              bigTextMargin={"0px 5px 0px 10px"}
            />
          </div>
          <UpBtn onClick={multitabUp} />
        </div>
      </div>
    </>
  );
};

export default React.memo(Generator);
