import React, { useState, useEffect } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useMeQuery, useStaticQuery } from "../../context/service/me.service";
import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
import { usePostTaskSelfConfirmMutation } from "../../context/service/task.service";
import { useSelector } from "react-redux";

export const Home = () => {
  const colorScheme = useSelector((store) => store.colorScheme);

  let { data: me = null } = useMeQuery();
  const lang = me?.language_code === "en" ? "en" : "ru";
  const { data: staticData = null } = useStaticQuery(lang);
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

  return (
    <>
      <div className="page home animate__animated animate__fadeIn">
        <div
          className={`page__header ${
            colorScheme === "light" ? "" : "page__header_dark"
          }`}
        >
          <h1>{staticData?.main_title}</h1>
          <TonConnectButton />
        </div>
        <div
          className={`wallet_info ${
            colorScheme === "light" ? "" : "wallet_info_dark"
          }`}
        >
          <h1>
            <img
              src={
                colorScheme === "light"
                  ? "/icon/wallet-icon.svg"
                  : "/icon/wallet-icon_dark.svg"
              }
              alt="wallet-icon"
            />
            <span>{staticData?.your_balance}</span>
          </h1>

          <h2>
            {me ? (
              `${me?.balance || 0} ${staticData?.token_symbol}`
            ) : (
              <div
                style={{ width: 100, height: 19, borderRadius: 5 }}
                className={`loading-div ${
                  colorScheme === "light" ? "" : "loading-div_dark"
                }`}
              ></div>
            )}
          </h2>
        </div>
        <ol
          className={`home__list ${
            colorScheme === "light" ? "" : "home__list_dark"
          }`}
        >
          <li>
            <Link to="/task">
              <span>
                <img
                  src={
                    colorScheme === "light"
                      ? "/icon/task-icon.svg"
                      : "/icon/task-icon_dark.svg"
                  }
                  alt="task-icon"
                />
                <span>{staticData?.tasks}</span>
              </span>

              <MdOutlineArrowForwardIos />
            </Link>
          </li>
          <li>
            <Link to="/charging">
              <span>
                <img
                  src={
                    colorScheme === "light"
                      ? "/icon/location-icon.svg"
                      : "/icon/location-icon_dark.svg"
                  }
                  alt="location-icon"
                />
                <span>{staticData?.to_chargers}</span>
              </span>

              <MdOutlineArrowForwardIos />
            </Link>
          </li>
          <li>
            <Link to="/about">
              <span>
                <img
                  src={
                    colorScheme === "light"
                      ? "/icon/openbook-icon.svg"
                      : "/icon/openbook-icon_dark.svg"
                  }
                  alt="openbook-icon"
                />
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
