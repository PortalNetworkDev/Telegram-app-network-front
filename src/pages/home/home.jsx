import React, { useState, useEffect } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useMeQuery, useStaticQuery } from "../../context/service/me.service";
import { useSelector } from "react-redux";
import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
import { usePostTaskSelfConfirmMutation } from "../../context/service/task.service";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  
  const { data: me = null } = useMeQuery();
  const lang = (me?.language_code == "en") ? "en" : "ru";
  const { data: staticData = null } = useStaticQuery(lang);
  const loading = useSelector((state) => state.loading);
  const [connect_wallet, setConnectWallet] = useState(true);
  const [postTaskSelfConfirm] = usePostTaskSelfConfirmMutation();
  const userFriendlyAddress = useTonAddress();
  const access = userFriendlyAddress || null;
  

  useEffect(() => {
    if (access && connect_wallet) {

      const setData = { task_id: 4, result: access };
      postTaskSelfConfirm(setData);

      setConnectWallet(false);
    }
  }, [connect_wallet, access, postTaskSelfConfirm]);

  if (loading)
    return (
      <div className="loading-home">
        <p>{lang === "ru" ? "Загрузка..." : "Loading..."}</p>
      </div>
    );

  return (
    <>
      <div className="page home animate__animated animate__fadeIn">
        <div className="page__header">
          <h1>{staticData?.main_title}</h1>
          <TonConnectButton />
        </div>

        <div className="wallet_info">
          <h1>
            <img src="/icon/wallet-icon.svg" alt="" />
            <span>{staticData?.your_balance}</span>
          </h1>

          <h2>
            {me?.balance || 0} {staticData?.token_symbol}
          </h2>
        </div>

        <ol className="home__list">
          <li>
            <Link to="/task">
              <span>
                <img src="/icon/task-icon.svg" alt="" />
                <span>{staticData?.tasks}</span>
              </span>

              <MdOutlineArrowForwardIos />
            </Link>
          </li>
          <li>
            <Link to="/charging">
              <span>
                <img src="/icon/location-icon.svg" alt="" />
                <span>{staticData?.to_chargers}</span>
              </span>

              <MdOutlineArrowForwardIos />
            </Link>
          </li>
          <li>
            <Link to="/about">
              <span>
                <img src="/icon/openbook-icon.svg" alt="" />
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
