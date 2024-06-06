import React, { useState, useRef } from "react";
import "./about.css";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useGetUserTaskByTaskIdQuery } from "../../context/service/task.service";
import { useMeQuery, useStaticQuery } from "../../context/service/me.service";
import { useGetHtmlQuery } from "../../context/service/task.service";
import { usePostTaskSelfConfirmMutation } from "../../context/service/task.service";
import { useTonAddress, TonConnectButton } from "@tonconnect/ui-react";
import { Mousedown } from "../../utils/close";
import { IoMdClose } from "react-icons/io";
import { enqueueSnackbar as EnSn } from "notistack";
import { useSelector } from "react-redux";

export const About = () => {
  const colorScheme = useSelector((store) => store.colorScheme);

  const [postTaskSelfConfirm] = usePostTaskSelfConfirmMutation();
  const navigate = useNavigate();
  const back = () => navigate(-1);

  const { data: me = null } = useMeQuery();
  const lang = me?.language_code === "en" ? "en" : "ru";
  const { data: staticData = null } = useStaticQuery(lang);
  const { data: task = null } = useGetUserTaskByTaskIdQuery("6");

  const html = useGetHtmlQuery(`${lang}-${task?.other}`);
  const htmlString = html?.error?.data;
  const [wallet, setWallet] = useState(false);
  const modalRef = useRef(null);
  Mousedown({ modalRef: modalRef, onClose: () => setWallet(false) });

  // convert html string to html
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(htmlString, "text/html");
  const htmlElement = htmlDoc.body;
  const und = String(htmlElement.innerHTML) === "undefined";
  const userFriendlyAddress = useTonAddress();
  const access = userFriendlyAddress || null;

  const selfConfirm = async () => {
    if (task?.is_complite) return navigate(-1);

    if (!access) {
      return setWallet(true);
    }

    const setData = { task_id: 1, result: access };
    const { error } = await postTaskSelfConfirm(setData);
    if (error)
      return EnSn(lang === "en" ? "Error" : "Ошибка", { variant: "error" });
    EnSn(lang === "en" ? "Success" : "Успешно", { variant: "success" });
    return navigate(-1);
  };

  if (und)
    return (
      <div
        className={`page confirm animate__animated animate__fadeIn ${
          colorScheme === "light" ? "" : "confirm_dark"
        }`}
      >
        <div
          className={`page__header ${
            colorScheme === "light" ? "" : "page__header_dark"
          }`}
        >
          <h1>{staticData?.main_title}</h1>
          <button onClick={back}>
            <IoArrowBack />
          </button>
        </div>
        <div
          className={`confirm__content ${
            colorScheme === "light" ? "" : "confirm__content_dark"
          }`}
        >
          <p>{lang === "en" ? "Loading..." : "Загрузка..."}</p>
        </div>
      </div>
    );

  return (
    <>
      <div
        className={`page confirm animate__animated animate__fadeIn ${
          colorScheme === "light" ? "" : "confirm_dark"
        }`}
      >
        <div
          className={`page__header ${
            colorScheme === "light" ? "" : "page__header_dark"
          }`}
        >
          <h1>{staticData?.main_title}</h1>
          <button onClick={back}>
            <IoArrowBack />
          </button>
        </div>

        {htmlElement.innerHTML !== "[object Object]" ? (
          <div
            className={`confirm__content ${
              colorScheme === "light" ? "" : "confirm__content_dark"
            }`}
            dangerouslySetInnerHTML={{ __html: htmlElement.innerHTML }}
          />
        ) : (
          <div
            className={`confirm__content ${
              colorScheme === "light" ? "" : "confirm__content_dark"
            }`}
          >
            <p>{lang === "en" ? "Loading..." : "Загрузка..."}</p>
          </div>
        )}

        {htmlElement.innerHTML !== "[object Object]" ? (
          <button onClick={selfConfirm}>{staticData?.thanks_understand}</button>
        ) : (
          ""
        )}
      </div>
      <div className={"connect_to_ton" + (wallet ? " open" : "")}>
        <div
          ref={modalRef}
          className={`connect_to_ton__content ${
            colorScheme === "light" ? "" : "connect_to_ton__content_dark"
          }`}
        >
          <div>
            <h1>{lang === "en" ? "Connect wallet" : "Подключить кошелек"}</h1>

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
