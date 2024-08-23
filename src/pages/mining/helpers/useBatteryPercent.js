import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useBatteryPercent = () => {
  const mining = useSelector((store) => store.mining);

  const [percent, setPercent] = useState(0);
  const [balance, setBalance] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [power, setPower] = useState(0);
  const [prev, setPrev] = useState(0);
  const [powerBalance, setPowerBalance] = useState(0);
  const miningStore = useSelector((store) => store.mining);

  useEffect(() => {
    if (!miningStore.isClaiming) {
      setBalance(mining?.battery_balance);
      setCapacity(mining?.battery_capacity);
      setPower(mining?.power_poe);
      setPercent((balance / capacity) * 100);
      setPowerBalance(mining?.power_balance);
    }
  }, [mining, balance, capacity, percent, miningStore.isClaiming]);

  return {
    percent,
    balance,
    capacity,
    power,
    prev,
    powerBalance,
    setPowerBalance,
    setPrev,
    setPercent,
    setBalance,
  };
};
