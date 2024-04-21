import React from "react";
import "./task.css";
import { IoClose } from "react-icons/io5";
import { MdAccountBalanceWallet } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const Task = () => {
  const navigate = useNavigate();
  const back = () => navigate(-1);
  return (
    <div className="page task animate__animated animate__fadeIn">
      <div className="page__header">
        <h1>Инфраструктура - Portal Network</h1>
        <button onClick={back}>
          <IoClose />
        </button>
      </div>

      <figure className="task__image">
        <img src="images/info.svg" alt="" loading="lazy" />
      </figure>

      <div className="wallet_info">
        <h1>
          <MdAccountBalanceWallet />
          <span>Ваш баланс</span>
        </h1>

        <h2>100 POE</h2>
      </div>

      <div className="task__text_info">
        <h1>Начальные задания</h1>
        <p>
          В данном разделе находятся задания для самых маленьких. Lorem ipsum
          dolor sit amet consectetur. Mauris justo dictum quis ultricies. Sapien
          orci ut at sodales sagittis euismod. Aliquam in pellentesque vel
          imperdiet platea massa semper lacus.{" "}
          <span>Sapien adipiscing vitae</span> a sapien viverra est pharetra
          suspendisse. Dolor velit turpis tortor est cras sollicitudin leo sit
          ornare. Gravida tortor tellus risus viverra ut magna non.
        </p>
      </div>

      <div className="task__info">
        <div className="task__info__header">
          <div className="task__info__header__icon">
            <FaCheck />
          </div>
          <h1>Кратко о Portal Network</h1>
          <span>1 POE</span>
        </div>
        <p>Краткое описание задания. Lorem ipsum dolor sit amet consectetur.</p>
      </div>

      <p className="task__info__text">
        Вводная информация о задании №2. Lorem ipsum dolor sit amet consectetur.
      </p>

      <div className="task__info">
        <div className="task__info__header lock">
          <div className="task__info__header__icon lock">
            <IoIosLock />
          </div>
          <h1>Ваше задание №2</h1>
          <span>1 POE</span>
        </div>
        <p>Краткое описание задания.</p>
      </div>

      <p className="task__info__text">
        Вводная информация о задании №3. Lorem ipsum dolor sit amet consectetur.
      </p>

      <div className="task__info">
        <div className="task__info__header lock">
          <div className="task__info__header__icon lock">
            <IoIosLock />
          </div>
          <h1>Ваше задание №3</h1>
          <span>1 POE</span>
        </div>
        <p>Краткое описание задания.</p>
      </div>

      <div className="task__text_info">
        <h1>Категория заданий №2</h1>
        <p>
          Aliquam in pellentesque vel imperdiet platea massa semper lacus.{" "}
          <span>Sapien adipiscing vitae</span> a sapien viverra est pharetra
          suspendisse. Dolor velit turpis tortor est cras sollicitudin leo sit
          ornare. Gravida tortor tellus risus viverra ut magna non.
        </p>
      </div>

      <div className="task__info">
        <div className="task__info__header lock">
          <div className="task__info__header__icon lock">
            <IoIosLock />
          </div>
          <h1>Ваше задание №4</h1>
          <span>1 POE</span>
        </div>
        <p>Краткое описание задания.</p>
      </div>
    </div>
  );
};
