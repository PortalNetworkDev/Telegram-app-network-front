import React, { useEffect, useRef } from "react";
import "./MiningPage.css";
import Balance from "../../widgets/Balance/Balance";
import Power from "../../widgets/Power/Power";
import LazyLoad from "react-lazyload";
import Battery from "../../widgets/Battery/Battery";
import Generator from "../../widgets/Generator/Generator";
import Modal from "../../widgets/Modal/Modal";
import {
  useMeQuery,
  useStaticQuery,
} from "../../../../context/service/me.service";
import {
  useLazyGeneratorUpQuery,
  useMiningQuery,
  useLazyBatteryUpQuery,
  useLazyMultitabUpQuery,
} from "../../../../context/service/mining.service";
import { useGetPOERateQuery } from "../../../../context/service/geckoApi.service";
import { useModal } from "../../helpers/useModal";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../../../context/mining";

export const MiningPage = ({ opacity, setGeneratorLoading }) => {
  const dispatch = useDispatch();
  const { data: me = null } = useMeQuery();
  const lang = me?.language_code === "en" ? "en" : "ru";
  const { data: staticData = null } = useStaticQuery(lang);
  const { data: mining = null, refetch: refetchMining } = useMiningQuery();
  const miningStore = useSelector((store) => store.mining);
  const { data: rate } = useGetPOERateQuery();
  const [generatorUp] = useLazyGeneratorUpQuery();
  const [batteryUp] = useLazyBatteryUpQuery();
  const [multitabUp] = useLazyMultitabUpQuery();

  const {
    isModalVisible,
    modalTitle,
    modalText,
    secondModalText,
    modalBtnText,
    modalBtnFunc,
    upInfo,
    handleOpenModal,
    handleCloseModal,
  } = useModal();

  useEffect(() => {
    dispatch(updateData(mining));
  }, [mining, dispatch]);

  const miningRef = useRef(null);
  const minigBounding = useRef(null);

  useEffect(() => {
    if (miningRef.current) {
      minigBounding.current = miningRef.current?.getBoundingClientRect();
    }
  }, []);

  window.addEventListener("resize", (e) => {
    e.preventDefault();
    minigBounding.current = miningRef.current?.getBoundingClientRect();
  });

  return (
    <>
      <div ref={miningRef} style={{ opacity: opacity }} className="mining-main">
        <LazyLoad>
          <img
            className="mining-main__background"
            src="./images/mining-main.png"
            alt="background"
          />
        </LazyLoad>
        <Balance
          balance={me?.balance}
          currency={rate?.["portal-network-token"].usd * me?.balance}
        />
        <Power
          onClick={() =>
            handleOpenModal(
              staticData?.PoePowerDisc1,
              staticData?.PoePowerDisc2,
              "",
              staticData?.PoePowerDiscButton,
              () => handleCloseModal()
            )
          }
          upBtnAction={() => {
            handleOpenModal(
              staticData?.PoePowerUp1,
              staticData?.PoePowerUp2,
              "",
              staticData?.PoePowerUpButton,
              () => {
                handleCloseModal();
                window.location.href =
                  "https://app.ston.fi/swap?chartVisible=false&ft=TON&tt=POE";
              }
            );
          }}
        />
        <Battery
          onClick={() =>
            handleOpenModal(
              `${staticData?.BatteryDisc1}`,
              `${staticData?.BatteryDisc2}`,
              "",
              staticData?.BatteryDiscButton,
              () => handleCloseModal()
            )
          }
          upBtnAction={() => {
            handleOpenModal(
              staticData?.BatteryUp1,
              `+${mining?.power_rize_battery} ${staticData?.BatteryUp2} ${
                mining?.battery_level + 1
              } ${staticData?.LevelStatic}`,
              `${mining?.price_rize_battery} ${staticData?.BatteryUp3} ${
                mining?.battery_level + 1
              } Lvl`,
              staticData?.BatteryUpButton,
              async () => {
                if (mining?.power_balance < mining?.price_rize_battery) {
                  handleCloseModal();
                  setTimeout(
                    () =>
                      handleOpenModal(
                        staticData?.NotEnoughBalance1,
                        staticData?.NotEnoughBalance2,
                        "",
                        staticData?.NotEnoughBalanceButton,
                        () => {
                          handleCloseModal();
                          window.location.href =
                            "https://app.ston.fi/swap?chartVisible=false&ft=TON&tt=POE";
                        }
                      ),
                    100
                  );
                } else {
                  handleCloseModal();
                  await batteryUp();
                  await refetchMining();
                }
              },
              "battery"
            );
          }}
        />
        <Generator
          setGeneratorLoading={setGeneratorLoading}
          handleOpenModal={() => {
            if (miningStore.generator_balance - miningStore?.multitab < 1) {
              handleOpenModal(
                `${staticData?.LowGenerator1}`,
                `${staticData?.LowGenerator2}`,
                "",
                staticData?.LowGeneratorButton,
                () => {
                  handleCloseModal();
                }
              );
            } else if (
              miningStore.battery_balance >= mining?.battery_capacity
            ) {
              handleOpenModal(
                `${staticData?.FullBattery1}`,
                `${staticData?.FullBattery2}`,
                "",
                staticData?.FullBatteryButton,
                () => {
                  handleCloseModal();
                }
              );
            }
          }}
          onClick={() =>
            handleOpenModal(
              `${staticData?.GeneratorDisc1}`,
              `${staticData?.GeneratorDisc2}`,
              "",
              staticData?.GeneratorDiscButton,
              () => handleCloseModal()
            )
          }
          upBtnAction={() => {
            handleOpenModal(
              staticData?.GeneratorUp1,
              `+${mining?.power_rize_generator} ${staticData?.GeneratorUp2} ${
                mining?.generator_level + 1
              } ${staticData?.LevelStatic}`,
              `${mining?.price_rize_generator} ${staticData?.GeneratorUp3} ${
                mining?.generator_level + 1
              } Lvl`,
              staticData?.GeneratorUpButton,
              async () => {
                if (mining?.power_balance < mining?.price_rize_generator) {
                  handleCloseModal();
                  setTimeout(
                    () =>
                      handleOpenModal(
                        staticData?.NotEnoughBalance1,
                        staticData?.NotEnoughBalance2,
                        "",
                        staticData?.NotEnoughBalanceButton,
                        () => {
                          handleCloseModal();
                          window.location.href =
                            "https://app.ston.fi/swap?chartVisible=false&ft=TON&tt=POE";
                        }
                      ),
                    100
                  );
                } else {
                  handleCloseModal();
                  await generatorUp();
                  await refetchMining();
                }
              }, 'generator'
            );
          }}
          multitabUp={() => {
            handleOpenModal(
              staticData?.MultitabUp1,
              `${staticData?.MultitabUp2} ${
                mining?.multitab + 1
              } ${staticData?.LevelStatic}`,
              `${mining?.price_rize_multitab} ${staticData?.MultitabUp3} ${
                mining?.multitab + 1
              } Lvl`,
              staticData?.MultitabUpButton,
              async () => {
                if (mining?.power_balance < mining?.price_rize_multitab) {
                  handleCloseModal();
                  setTimeout(
                    () =>
                      handleOpenModal(
                        staticData?.NotEnoughBalance1,
                        staticData?.NotEnoughBalance2,
                        "",
                        staticData?.NotEnoughBalanceButton,
                        () => {
                          handleCloseModal();
                          window.location.href =
                            "https://app.ston.fi/swap?chartVisible=false&ft=TON&tt=POE";
                        }
                      ),
                    100
                  );
                } else {
                  handleCloseModal();
                  await multitabUp();
                  await refetchMining();
                }
              }, 'multitab'
            );
          }}
        />
        {isModalVisible && (
          <Modal
            title={modalTitle}
            text={modalText}
            secondText={secondModalText}
            btnText={modalBtnText}
            btnFunc={modalBtnFunc.current}
            setModalClose={handleCloseModal}
            bounding={minigBounding}
            upInfo={upInfo}
          />
        )}
      </div>
    </>
  );
};
