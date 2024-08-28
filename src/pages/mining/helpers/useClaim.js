import { useEffect, useRef } from "react";
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

  const percentReductionStep = useRef(null);
  const balanceReductionStep = useRef(null);
  const isClaimingFinished = useRef(false);

  useEffect(() => {
    if (!miningStore.isClaiming || isClaimingFinished.current) return;

    if (
      percentReductionStep.current === null &&
      balanceReductionStep.current === null
    ) {
      balanceReductionStep.current = balance / 100;
      percentReductionStep.current =
        (percent * balanceReductionStep.current) / balance;
    }

    const handleBalanceUpdate = async () => {
      setPercent((prev) => {
        if (prev > 0.01) {
          return prev - percentReductionStep.current;
        } else {
          return prev;
        }
      });
      setPowerBalance((prev) => {
        if (prev < powerBalance + balance - balanceReductionStep.current) {
          return prev + balanceReductionStep.current;
        } else {
          return prev;
        }
      });
      setBalance((prev) => {
        if (prev > balanceReductionStep.current) {
          return prev - balanceReductionStep.current;
        } else {
          return 0;
        }
      });

      if (balance === 0 && !isClaimingFinished.current) {
        try {
          isClaimingFinished.current = true;
          await claimPower();
          await refetchMining();
          dispatch(setClaimingAction(false));
        } catch (error) {
          console.error(error);
        } finally {
          clearInterval(interval);
          percentReductionStep.current = null;
          balanceReductionStep.current = null;
          isClaimingFinished.current = false;
        }
      }
    };

    const interval = setInterval(() => {
      handleBalanceUpdate();
    }, 20);

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
