import React, { useState, useEffect } from "react";
import "./home.css";
import { IoClose } from "react-icons/io5";
import { MdAccountBalanceWallet } from "react-icons/md";
import { Link } from "react-router-dom";
import { RiFileList3Fill } from "react-icons/ri";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { GiOpenBook } from "react-icons/gi";
import { ImLocation2 } from "react-icons/im";
import axios from "axios";

export const Home = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const url = `https://tonapi.io/v2/accounts/UQA2weH-PG_zo85e02cSHORKHtKjJPg3NsJjn3BcznnVQfmE/jettons?currencies=ton,usd,rub`;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data.balances);
        setBalance(response.data.balances[0].balance);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const closeWebApp = () => window.Telegram.WebApp.close();

  return (
    <div className="page animate__animated animate__fadeIn">
      <div className="page__header">
        <h1>Инфраструктура - Portal Network</h1>
        <button onClick={closeWebApp}>
          <IoClose />
        </button>
      </div>

      <div className="wallet_info">
        <h1>
          <MdAccountBalanceWallet />
          <span>Ваш баланс</span>
        </h1>

        <h2>{balance} TON</h2>
      </div>

      <ol className="home__list">
        <li>
          <Link to="/task">
            <span>
              <RiFileList3Fill />
              <span>Задания</span>
            </span>

            <MdOutlineArrowForwardIos />
          </Link>
        </li>
        <li>
          <Link to="/charging">
            <span>
              <ImLocation2 />
              <span>К зарядкам</span>
            </span>

            <MdOutlineArrowForwardIos />
          </Link>
        </li>
        <li>
          <Link to="/about">
            <span>
              <GiOpenBook />
              <span>О проекте (Light Paper)</span>
            </span>

            <MdOutlineArrowForwardIos />
          </Link>
        </li>
      </ol>
    </div>
  );
};
