import React, { useEffect, useState } from "react";
import "./MiningPage.css";
import Balance from "../../widgets/Balance/Balance";
import Power from "../../widgets/Power/Power";
import Battery from "../../widgets/Battery/Battery";
import Generator from "../../widgets/Generator/Generator";
import Modal from "../../widgets/Modal/Modal";
import DailyReward from "../../widgets/ DailyReward/DailyReward";

import { useMeQuery } from "../../../../context/service/me.service";
import {
  useLazyGeneratorUpQuery,
  useMiningQuery,
  useLazyBatteryUpQuery,
  useCheckDailyGiftsQuery,
  useLazyGetNotificationsQuery,
} from "../../../../context/service/mining.service";
import { useGetPOERateQuery } from "../../../../context/service/geckoApi.service";
import { useModal } from "../../helpers/useModal";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../../../context/mining";
import { useModalStatic } from "../../helpers/useModalStatic";
import useBounding from "../../helpers/useBounding";

export const MiningPage = ({ opacity }) => {
  const dispatch = useDispatch();
  const { data: me = null } = useMeQuery();
  const { data: mining = null, refetch: refetchMining } = useMiningQuery();
  const miningStore = useSelector((store) => store.mining);
  const { data: rate } = useGetPOERateQuery();
  const [generatorUp] = useLazyGeneratorUpQuery();
  const [batteryUp] = useLazyBatteryUpQuery();

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

  const {
    powerInfoModal,
    upPowerModal,
    batteryInfoModal,
    upBatteryModal,
    notEnoughtBalance,
    generatorInfoModal,
    lowGeneratorModal,
    fullBatteryModal,
    upGeneratorModal,
  } = useModalStatic();

  useEffect(() => {
    dispatch(updateData(mining));
  }, [mining, dispatch]);

  useEffect(() => {
    refetchMining();
  }, []);

  const { pageRef, pageBounding } = useBounding();

  //Ежедневные призы
  const { data: avaibleDailyGift = null } = useCheckDailyGiftsQuery();
  const [reward, setReward] = useState(false);

  useEffect(() => {
    if (avaibleDailyGift && avaibleDailyGift.isAbleToClaim) {
      setReward(true);
    }
  }, [avaibleDailyGift]);

  //notifications
  const [getNotifications, { notificationsData }] =
    useLazyGetNotificationsQuery();

  const notificationsFunc = async () => {
    const response = await getNotifications();
    if (Object.keys(response.data?.notification).length === 0) {
      return;
    } else if (Object.keys(response.data?.notification).includes("type")) {
      const type = response.data?.notification.type;
      handleOpenModal(
        [
          type === "transaction"
            ? `Вы получили ${response.data?.notification.powerAmount} Вт•Ч от пользователя @${response.data?.notification.sender.username}`
            : type === "referral"
            ? `Вы получили ${response.data?.notification.powerAmount} Вт•Ч за вход в приложение по ссылке-приглашению`
            : `Вы получили ${response.data?.notification.powerAmount} Вт•Ч за приглашение пользователя @${response.data?.notification.refUserName}`,
          type === "referral" &&
            `Вас пригласил пользователь @${response.data?.notification.inviterUserName}`,
          ``,
          "ПОНЯТНО",
        ],
        handleCloseModal
      );
    } else {
      handleOpenModal(
        [
          "У вас новые поступления, проверьте их в истории переводов",
          "",
          "",
          "ПОНЯТНО",
        ],
        handleCloseModal
      );
    }
  };

  useEffect(() => {
    if (avaibleDailyGift?.isAbleToClaim === false) {
      notificationsFunc();
    }
  }, [avaibleDailyGift]);

  return (
    <>
      <div ref={pageRef} style={{ opacity: opacity }} className="mining-main">
        {me && rate && (
          <Balance
            balance={me?.balance}
            currency={rate?.["portal-network-token"].usd * me?.balance}
          />
        )}
        <Power
          onClick={() =>
            handleOpenModal(powerInfoModal, () => handleCloseModal())
          }
          upBtnAction={() => {
            handleOpenModal(upPowerModal, () => {
              handleCloseModal();
              window.location.href =
                "https://app.ston.fi/swap?chartVisible=false&ft=TON&tt=POE";
            });
          }}
        />
        <Battery
          onClick={() =>
            handleOpenModal(batteryInfoModal, () => handleCloseModal())
          }
          upBtnAction={() => {
            handleOpenModal(
              upBatteryModal,
              async () => {
                if (mining?.power_balance < mining?.price_rize_battery) {
                  handleCloseModal();
                  setTimeout(
                    () =>
                      handleOpenModal(notEnoughtBalance, () => {
                        handleCloseModal();
                        window.location.href =
                          "https://app.ston.fi/swap?chartVisible=false&ft=TON&tt=POE";
                      }),
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
          handleOpenModal={() => {
            if (miningStore.generator_balance - miningStore?.multitab < 1) {
              handleOpenModal(lowGeneratorModal, () => {
                handleCloseModal();
              });
            } else if (
              miningStore.battery_balance >= mining?.battery_capacity
            ) {
              handleOpenModal(fullBatteryModal, () => {
                handleCloseModal();
              });
            }
          }}
          onClick={() =>
            handleOpenModal(generatorInfoModal, () => handleCloseModal())
          }
          upBtnAction={() => {
            handleOpenModal(
              upGeneratorModal,
              async () => {
                if (mining?.power_balance < mining?.price_rize_generator) {
                  handleCloseModal();
                  setTimeout(
                    () =>
                      handleOpenModal(notEnoughtBalance, () => {
                        handleCloseModal();
                        window.location.href =
                          "https://app.ston.fi/swap?chartVisible=false&ft=TON&tt=POE";
                      }),
                    100
                  );
                } else {
                  handleCloseModal();
                  await generatorUp();
                  await refetchMining();
                }
              },
              "generator"
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
            bounding={pageBounding}
            upInfo={upInfo}
          />
        )}
        {reward && (
          <DailyReward bounding={pageBounding} setModalClose={setReward} />
        )}
      </div>
    </>
  );
};
