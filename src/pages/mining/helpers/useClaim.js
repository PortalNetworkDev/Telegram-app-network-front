import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLazyClaimPowerQuery,
  useMiningQuery,
} from "../../../context/service/mining.service";
import { setClaimingAction } from "../../../context/mining";

export const useClaim = (
  percent,
  balance,
  powerBalance,
  setPercent,
  setPowerBalance,
  setBalance
) => {
  const dispatch = useDispatch();
  const [claimPower] = useLazyClaimPowerQuery();
  const { refetch: refetchMining } = useMiningQuery();
  const miningStore = useSelector((store) => store.mining);

  useEffect(() => {
    if (!miningStore.isClaiming) return;
    const setPercentReductionStep = percent / balance;
    const balanceReductionStep = balance / 100;

    const handleBalanceUpdate = async () => {
      setPercent((prev) => {
        if (prev > 0.01) {
          return prev - setPercentReductionStep;
        } else {
          return prev;
        }
      });
      setPowerBalance((prev) => {
        if (prev < powerBalance + balance - balanceReductionStep) {
          return prev + balanceReductionStep;
        } else {
          return prev;
        }
      });
      setBalance((prev) => {
        if (prev > balanceReductionStep) {
          return prev - balanceReductionStep;
        } else {
          return prev;
        }
      });
      const currentBalance = balance - 1;

      if (currentBalance <= 1) {
        try {
          await claimPower();
          await refetchMining();
          dispatch(setClaimingAction(false));
        } catch (error) {
          console.error(error);
        } finally {
          clearInterval(interval);
        }
      }
    };

    const interval = setInterval(() => {
      handleBalanceUpdate();
    }, 1);

    return () => clearInterval(interval);
  }, [
    miningStore.isClaiming,
    claimPower,
    dispatch,
    percent,
    balance,
    powerBalance,
    refetchMining,
    setBalance,
    setPercent,
    setPowerBalance,
  ]);
};
