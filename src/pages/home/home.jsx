import React, { useState, useEffect } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useMeQuery, useStaticQuery } from "../../context/service/me.service";
import { useSelector } from "react-redux";
import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
import { usePostTaskSelfConfirmMutation } from "../../context/service/task.service";
import { fetchBalance } from "../../utils/balance";

export const Home = () => {
  let { data: me = null } = useMeQuery();
  const [mybalance, setMyBalance] = useState([]);
  const lang = me?.language_code;
  const { data: staticData = null } = useStaticQuery(lang);
  const loading = useSelector((state) => state.loading);
  const [connect_wallet, setConnectWallet] = useState(true);
  const [postTaskSelfConfirm] = usePostTaskSelfConfirmMutation();
  const userFriendlyAddress = useTonAddress();
  const access = userFriendlyAddress || null;

  const themeParams = window?.Telegram?.WebApp?.themeParams;
  const isDarkTheme =
    themeParams.bg_color && parseInt(themeParams.bg_color, 16) < 0x808080;

  useEffect(() => {
    if (typeof me?.wallet !== "undefined" && me?.wallet !== "") {
      const fetchData = async () => {
        let _balance = await fetchBalance(me?.wallet);
        setMyBalance(_balance);
      };

      fetchData();
    }
  }, [me?.wallet]);

  useEffect(() => {
    if (access && connect_wallet) {
      const setData = { task_id: 4, result: access };
      postTaskSelfConfirm(setData);

      setConnectWallet(false);
    }
  }, [connect_wallet, access, postTaskSelfConfirm]);

  if (loading) {
    if (!me) {
      return "";
    }
    return (
      <div className="loading-home">
        <p>{lang === "en" ? "Loading..." : "Загрузка..."}</p>
      </div>
    );
  }

  return (
    <>
      <div className="page home animate__animated animate__fadeIn">
        <div className="page__header">
          <h1>{staticData?.main_title}</h1>
          <TonConnectButton />
        </div>

        <div className="wallet_info">
          <h1>
            <img src="/icon/wallet-icon.svg" alt="wallet-icon" />
            <span>{staticData?.your_balance}</span>
          </h1>

          <h2>
            {mybalance || 0} {staticData?.token_symbol}
          </h2>
        </div>

        <ol className="home__list">
          <li>
            <Link to="/task">
              <span>
                <img src="/icon/task-icon.svg" alt="task-icon" />
                <span>{staticData?.tasks}</span>
              </span>

              <MdOutlineArrowForwardIos />
            </Link>
          </li>
          <li>
            <Link to="/charging">
              <span>
                <img src="/icon/location-icon.svg" alt="location-icon" />
                <span>{staticData?.to_chargers}</span>
              </span>

              <MdOutlineArrowForwardIos />
            </Link>
          </li>
          <li>
            <Link to="/about">
              <span>
                <img src="/icon/openbook-icon.svg" alt="openbook-icon" />
                <span>{staticData?.about_project}</span>
              </span>

              <MdOutlineArrowForwardIos />
            </Link>
          </li>
        </ol>
      </div>
    </>
  );
};
