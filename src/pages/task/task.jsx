import React, { useState, useRef, useEffect } from "react";
import "./task.css";
import { useNavigate } from "react-router-dom";
import { useGetMyStateQuery } from "../../context/service/task.service";
import { usePostTaskSelfConfirmMutation } from "../../context/service/task.service";
import { useMeQuery, useStaticQuery } from "../../context/service/me.service";
import { FaCheck } from "react-icons/fa";
import { useTonAddress, TonConnectButton } from "@tonconnect/ui-react";
import { Mousedown } from "../../utils/close";
import { IoMdClose } from "react-icons/io";
import { enqueueSnackbar as EnSn } from "notistack";
import { IoArrowBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { sanitize } from "dompurify";
import { fetchBalance } from "../../utils/balance";

function createMarkup(dirty) {
  return { __html: sanitize(dirty) };
}

export const Task = () => {
  const navigate = useNavigate();
  const [connect_wallet, setConnectWallet] = useState(null);
  const [mybalance, setMyBalance] = useState([]);
  const back = () => navigate(-1);
  const { data = null } = useGetMyStateQuery();
  const { data: me = null } = useMeQuery();
  const lang = (me?.language_code === "ru") ? "ru" : "en";
  const { data: staticData = null } = useStaticQuery(lang);
  const [postTaskSelfConfirm] = usePostTaskSelfConfirmMutation();
  const userFriendlyAddress = useTonAddress();
  const access = userFriendlyAddress || null;
  const [wallet, setWallet] = useState(false);
  const modalRef = useRef(null);
  Mousedown({ modalRef: modalRef, onClose: () => setWallet(false) });
  const loading = useSelector((state) => state.loading);
  const img = `${process.env.REACT_APP_MINIAPPAPI}/static/images/${lang}-info.png`;
  const peopleText = (lang === "ru") ? "/чел." : "/people"


  useEffect(() => {
    if(typeof me?.wallet !== "undefined" && me?.wallet !== ""){
      const fetchData = async() =>{
        let _balance = await fetchBalance(me?.wallet);
        setMyBalance(_balance)
      }

      fetchData()
    }
  }, [me?.wallet]);


  useEffect(() => {
    if (connect_wallet && access) {
      if (connect_wallet.is_complite) return null;
      const setData = { task_id: connect_wallet?.id, result: access };
      postTaskSelfConfirm(setData);
      setConnectWallet(null);
    }
  }, [connect_wallet, access, postTaskSelfConfirm]);

  const clickType = async (task) => {
    // checkSubscribe, selfConfirm, connectToTon, checkJetton, referal, checkLiquidity;
    let link;

    if (task?.type === "checkSubscribe") {
      link = task?.description.replace("@", "");
      return window.open(`https://t.me/${link}`, "_blank");
    }

    if (task?.type === "connectToTon") {
      if (task.is_complite) return null;

      if (!access) {
        setWallet(true);
        return setConnectWallet(task);
      }

      if (access) {
        const setData = { task_id: task?.id, result: access };
        const { error } = await postTaskSelfConfirm(setData);
        if (error) return EnSn((lang === "ru") ? "Ошибка": "Error", { variant: "error" });
        EnSn((lang === "ru") ? "Успешно": "Success", { variant: "success" });
      }
    }

    if (task?.type === "selfConfirm") {
      return navigate(`/confirm/${task?.id}`);
    }

    if (task?.type === "referal") {
      const link = `https://telegram.me/share/url?url=${process.env.REACT_APP_MINIAPPURL}?startapp=r-${me?.id} ${task?.other}`;
      return window.open(link, "_blank");
    }

    if(task?.type === "checkJetton") {
      const link = "https://app.ston.fi/swap?chartVisible=false&ft=TON&tt=POE&ta=5"
      return window.open(link, "_blank");
    }

    if(task?.type === "checkLiquidity"){
      const link = "https://app.ston.fi/liquidity/provide?ft=TON&tt=POE&ta=5";
      return window.open(link, "_blank");
    }

    return null;
  };

  if (loading)
    return (
      <div className="page task animate__animated animate__fadeIn">
        <div className="page__header">
          <h1>{staticData?.tasks}</h1>
          <button onClick={back}>
            <IoArrowBack />
          </button>
        </div>
        <div className="task__content">
          <p>{lang === "ru" ? "Загрузка..." : "Loading..."}</p>
        </div>
      </div>
    );

  return (
    <>
      <div className="page task animate__animated animate__fadeIn">
        <div className="page__header">
          <h1>{staticData?.tasks}</h1>
          <button onClick={back}>
            <IoArrowBack />
          </button>
        </div>

        <figure className="task__image">
          <img src={img} alt="" loading="lazy" />
        </figure>

        <div className="wallet_info">
          <h1>
            <img src="/icon/wallet-icon.svg" alt="" />
            <span>{staticData?.your_balance}</span>
          </h1>
          <h2>
            {mybalance || 0} {staticData?.token_symbol}
          </h2>
        </div>

        {data?.map((item) => {
          return (
            <div key={item.id} className="task__content">
              <div className="task__text_info">
                <h1>{item?.label}</h1>
                <p>{item?.description}</p>
              </div>

              {item?.tasks?.map((task) => {

                const img = `${process.env.REACT_APP_MINIAPPAPI}/static/icon/${task?.icon_url}`;
                return (
                  <div key={task?.id} className="task__item">

                    <p dangerouslySetInnerHTML={createMarkup(task?.title)}></p>
                    <div className="task__info" onClick={() => clickType(task)}>
                      <div
                        className={
                          "task__info__header" +
                          (!task?.is_complite ? " lock" : "")
                        }
                      >
                        <div
                          className={
                            "task__info__header__icon" +
                            (!task?.is_complite ? " lock" : "")
                          }
                        >
                          {task?.is_complite ? (
                            <FaCheck />
                          ) : (
                            <img src={img} alt={task?.label} />
                          )}
                        </div>
                        <h1>{task?.label}</h1>
                        <span className={task?.is_complite ? " lock" : ""}>
                          {task?.reward} {staticData?.token_symbol} {(task?.type === "referal") ? peopleText : ""}
                        </span>
                      </div>
                      <p dangerouslySetInnerHTML={createMarkup(task?.description)}></p>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className={"connect_to_ton" + (wallet ? " open" : "")}>
        <div ref={modalRef} className="connect_to_ton__content">
          <div>
            <h1>
              {me?.language_code === "ru"
                ? "Подключение к TON"
                : "Connect to TON"}
            </h1>

            <button onClick={() => setWallet(false)}>
              <IoMdClose />
            </button>
          </div>
          <TonConnectButton />
        </div>
      </div>
    </>
  );
};
