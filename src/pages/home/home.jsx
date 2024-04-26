import React from "react";
import "./home.css";
import { MdAccountBalanceWallet } from "react-icons/md";
import { Link } from "react-router-dom";
import { RiFileList3Fill } from "react-icons/ri";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { GiOpenBook } from "react-icons/gi";
import { ImLocation2 } from "react-icons/im";
import { useMeQuery, useStaticQuery } from "../../context/service/me.service";
import { useSelector } from "react-redux";
import { TonConnectButton } from "@tonconnect/ui-react";
// import { useSendReferalMutation } from "../../context/service/task.service";

export const Home = () => {
  const { data: me = null } = useMeQuery();
  const lang = me?.language_code || "ru";
  const { data: staticData = null } = useStaticQuery(lang);
  const loading = useSelector((state) => state.loading);
  // const followId = window?.Telegram?.WebApp?.initDataUnsafe?.start_param;
  // const user_id = followId?.split("-").pop() || null;
  // const [sendReferal] = useSendReferalMutation();

  // useEffect(() => {
  //   if (user_id) (async () => await sendReferal(user_id))();
  // }, [user_id, sendReferal]);

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
            <MdAccountBalanceWallet />
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
                <RiFileList3Fill />
                <span>{staticData?.tasks}</span>
              </span>

              <MdOutlineArrowForwardIos />
            </Link>
          </li>
          <li>
            <Link to="/charging">
              <span>
                <ImLocation2 />
                <span>{staticData?.to_chargers}</span>
              </span>

              <MdOutlineArrowForwardIos />
            </Link>
          </li>
          <li>
            <Link to="/about">
              <span>
                <GiOpenBook />
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
