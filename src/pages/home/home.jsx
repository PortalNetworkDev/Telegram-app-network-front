import React, { useState, useEffect, useContext, useCallback } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useMeQuery, useStaticQuery } from "../../context/service/me.service";
import { enqueueSnackbar as EnSn } from "notistack";
import {
  TonConnectButton,
  TonConnectUIContext,
  useTonAddress,
  useTonWallet,
} from "@tonconnect/ui-react";
import { usePostTaskSelfConfirmMutation } from "../../context/service/task.service";
import { useSelector } from "react-redux";
import { useGetPOERateQuery } from "../../context/service/geckoApi.service";
import TextString from "../mining/ui/TextSrting/TextString";

export const Home = () => {
  const colorScheme = useSelector((store) => store.colorScheme);
  const { data: rate } = useGetPOERateQuery();
  const { data: me = null } = useMeQuery();
  const lang = me?.language_code === "en" ? "en" : "ru";
  const { data: staticData = null } = useStaticQuery(lang);
  const [connect_wallet, setConnectWallet] = useState(true);
  const [postTaskSelfConfirm] = usePostTaskSelfConfirmMutation();
  const userFriendlyAddress = useTonAddress();
  const access = userFriendlyAddress || null;
  const tonConnectContext = useContext(TonConnectUIContext);
  const wallet = useTonWallet();
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = useCallback(
    async (result) => {
      const setData = { task_id: 4, result: result };
      const { error } = await postTaskSelfConfirm(setData);

      if (error) {
        EnSn(error.data?.message, { variant: "error" });

        if (error.data?.message === "address_already_used") {
          await tonConnectContext.disconnect();
        }
      }
    },
    [postTaskSelfConfirm, tonConnectContext]
  );

  useEffect(() => {
    if (tonConnectContext?.connected) {
      setIsConnected(tonConnectContext.connected);
    }
  }, [tonConnectContext.connected]);

  useEffect(() => {
    if (access && connect_wallet && wallet) {
      handleConnect(access);

      setConnectWallet(false);
    }
  }, [connect_wallet, access, postTaskSelfConfirm, handleConnect, wallet]);

  useEffect(() => {
    if (!wallet && isConnected) {
      handleConnect("disconnect");
    }
  }, [wallet, handleConnect, isConnected]);

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
          {me ? (
            <div
              className={`main-balance ${
                colorScheme === "light" ? "" : "main-balance_dark"
              }`}
            >
              {colorScheme === "light" && (
                <img
                  className="main-balance__logo"
                  src="./icon/lightningFromBalance-light.svg"
                  alt="lightning"
                />
              )}
              {colorScheme !== "light" && (
                <img
                  className="main-balance__logo"
                  src="./icon/lightningFromBalance-dark.svg"
                  alt="lightning"
                />
              )}
              <h2>{`${me?.balance.toLocaleString("ru") || 0} ${
                staticData?.token_symbol
              }`}</h2>
              <span>
                ≈{" "}
                {(+(rate?.["portal-network-token"]?.usd * me?.balance).toFixed(
                  2
                )).toLocaleString("ru")}{" "}
                USD
              </span>
            </div>
          ) : (
            <div
              style={{ width: 100, height: 19, borderRadius: 5 }}
              className={`loading-div ${
                colorScheme === "light" ? "" : "loading-div_dark"
              }`}
            ></div>
          )}
          <div className="poe-power">
            <div className="battery-power">
              {me ? (
                <>
                  <img
                    className="battery-power__lightning lightning-with-back main-lightning"
                    src="./images/lightningWithBackground.png"
                    alt="lightning"
                  />
                  <TextString
                    secondSmall={lang === "ru" ? "Вт•Ч" : "W•h"}
                    big={me?.power_balance}
                    bigFontSize={"20px"}
                  />
                </>
              ) : (
                <div
                  style={{ width: 100, height: 19, borderRadius: 5 }}
                  className={`loading-div ${
                    colorScheme === "light" ? "" : "loading-div_dark"
                  }`}
                ></div>
              )}
            </div>
          </div>
        </div>

        <ol
          className={`home__list ${
            colorScheme === "light" ? "" : "home__list_dark"
          }`}
        >
          <li>
            <Link to="/task">
              <span>
                <div style={{ width: 20 }}>
                  <img
                    src={
                      colorScheme === "light"
                        ? "/icon/task-icon.svg"
                        : "/icon/task-icon_dark.svg"
                    }
                    alt="task-icon"
                  />
                </div>
                <span>{staticData?.tasks}</span>
              </span>

              <MdOutlineArrowForwardIos />
            </Link>
          </li>

          <li>
            <a
              href="https://app.ston.fi/swap?chartVisible=false&ft=TON&tt=POE"
              target="blank"
            >
              <span>
                <img
                  width={20}
                  height={20}
                  src={
                    colorScheme === "light"
                      ? "/icon/currency-icon.svg"
                      : "/icon/currency-icon_dark.svg"
                  }
                  alt="currency-icon"
                />
                <span
                  className={`buy-link ${
                    colorScheme === "light" ? "" : "buy-link_dark"
                  } `}
                >
                  {staticData?.buy || "Купить POE"}
                </span>
              </span>
              <MdOutlineArrowForwardIos />
            </a>
          </li>

          <li className="mining">
            <img
              src="./images/generator-preview.png"
              alt="gen-preview"
              className="preview-gen"
            />
            <Link className="mining__link" to="/mining">
              <div className="mining__container">
                <div className="mining__title-container">
                  <img className="gamepad" src={"/icon/gamepad.svg"} alt="mining-icon" />
                  <span className="mining__title">{staticData?.MiningTitle}</span>
                </div>
                <MdOutlineArrowForwardIos />
              </div>
              <span className="mining__info">
                {staticData?.MiningDisc}
              </span>
            </Link>
          </li>

          <li>
            <a href="https://onelink.to/7j9k8j">
              <span>
                <div style={{ width: 20 }}>
                  <img
                    src={
                      colorScheme === "light"
                        ? "/icon/location-icon.svg"
                        : "/icon/location-icon_dark.svg"
                    }
                    alt="location-icon"
                  />
                </div>
                <span>{staticData?.to_chargers}</span>
              </span>
              <MdOutlineArrowForwardIos />
            </a>
          </li>

          <li>
            <Link to="/about">
              <span>
                <div style={{ width: 20 }}>
                  <img
                    src={
                      colorScheme === "light"
                        ? "/icon/openbook-icon.svg"
                        : "/icon/openbook-icon_dark.svg"
                    }
                    alt="openbook-icon"
                  />
                </div>
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
