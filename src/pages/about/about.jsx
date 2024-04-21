import React from "react";
import "./about.css";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { FaClock } from "react-icons/fa6";

export const About = () => {
  const navigate = useNavigate();
  const back = () => navigate(-1);
  return (
    <div className="page task_item animate__animated animate__fadeIn">
      <div className="page__header">
        <h1>Инфраструктура - Portal Network</h1>
        <button onClick={back}>
          <IoClose />
        </button>
      </div>

      <p className="about__text">
        Вводная информация задания. Lorem ipsum dolor sit amet consectetur.
        Mauris justo dictum quis ultricies. Sapien orci ut at sodales sagittis
        euismod. Aliquam in pellentesque vel imperdiet platea massa semper
        lacus. <span>Sapien adipiscing vitae</span> a sapien viverra est
        pharetra suspendisse. Dolor velit turpis tortor est cras sollicitudin
        leo sit ornare. Gravida tortor tellus risus viverra ut magna non. Semper
        tellus aliquet platea in metus risus.
      </p>

      <div className="about__list">
        <h2>Список:</h2>

        <label>
          <div>
            <input type="checkbox" hidden />
            <span>
              <ImCheckboxUnchecked />
            </span>
            <b>
              <ImCheckboxChecked />
            </b>
          </div>
          <span>Mauris justo dictum quis ultricies</span>
        </label>
        <label>
          <div>
            <input type="checkbox" hidden />
            <span>
              <ImCheckboxUnchecked />
            </span>
            <b>
              <ImCheckboxChecked />
            </b>
          </div>
          <span>Sapien orci ut at sodales sagittis euismod</span>
        </label>
        <label>
          <div>
            <input type="checkbox" hidden />
            <span>
              <ImCheckboxUnchecked />
            </span>
            <b>
              <ImCheckboxChecked />
            </b>
          </div>
          <span>
            Aliquam in pellentesque vel imperdiet platea massa semper lacus
          </span>
        </label>
      </div>

      <button className="about btn active">
        <span>Текст кнопки</span>
      </button>
      <button className="about btn">
        <span>Текст неактивной кнопки</span>
      </button>

      <button className="about btn">
        <span>Текст неактивной кнопки</span>
        <i>01:23:59</i>
      </button>

      <div className="about__btn">
        <button disabled>
          <span>Текст неактивной кнопки</span>
        </button>

        <p>
          <FaClock />
          <span>01:23:59</span>
        </p>
      </div>
    </div>
  );
};
