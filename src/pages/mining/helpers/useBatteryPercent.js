import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useBatteryPercent = () => {
  const mining = useSelector((store) => store.mining);

  const [percent, setPercent] = useState(0);
  const [balance, setBalance] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [power, setPower] = useState(0);
  const [prev, setPrev] = useState(0);

  useEffect(() => {
    setBalance(mining?.battery_balance);
    setCapacity(mining?.battery_capacity);
    setPower(mining?.power_poe);
    setPercent((balance / capacity) * 100);
  }, [mining, balance, capacity]);

  return {
    percent,
    balance,
    capacity,
    power,
    prev,
    setPrev,
    setPercent,
  };
};
