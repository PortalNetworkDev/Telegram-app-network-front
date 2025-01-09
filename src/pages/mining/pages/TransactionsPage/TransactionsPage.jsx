import React, { useCallback, useEffect, useState } from "react";

import "./TransactionsPage.css";
import {
  useMeQuery,
  useStaticQuery,
} from "../../../../context/service/me.service";
import Modal from "../../widgets/Modal/Modal";
import { useModal } from "../../helpers/useModal";
import useBounding from "../../helpers/useBounding";
import { useDispatch } from "react-redux";
import { setPreviewAction } from "../../../../context/mining";
import TextString from "../../ui/TextSrting/TextString";
import { useMiningQuery } from "../../../../context/service/mining.service";
import TransactionCard from "../../widgets/TransactionCard/TransactionCard";

const TransactionsPage = () => {
  const dispatch = useDispatch();
  const { data: me = null } = useMeQuery();

  const { data: mining = null, refetch: refetchMining } = useMiningQuery();
  const lang = me?.language_code === "en" ? "en" : "ru";
  const { data: staticData = null } = useStaticQuery(lang);

  useEffect(() => {
    dispatch(setPreviewAction(false));
  }, [dispatch]);

  const {
    isModalVisible,
    modalTitle,
    modalText,
    secondModalText,
    modalBtnText,
    modalBtnFunc,
    upInfo,
    handleOpenModal,
    handleCloseModal,
  } = useModal();

  const powerBalance = mining?.power_balance;

  const { pageRef, pageBounding } = useBounding();

  //transactions
  const transactions = [1, 2, 3];

  //main page or all transactions
  const [allTransactions, setAllTransactions] = useState(false);
  const listOfTransactions = {
    october: [1, 2, 3, 4, 5],
    septemder: [1, 2, 3, 4, 5],
    december: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  };

  //inputs
  const [id, setId] = useState("");
  const [qnt, setQnt] = useState("");
  const [idPlaceholder, setIdPlaceholder] = useState("ID получателя");
  const [qntPlaceholder, setQntPlaceholder] = useState("Сумма кВт•Ч");

  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }

  const handleInput = useCallback(
    debounce((e) => {
      if (e.target.name === "id") {
        setId(e.target.value);
      } else {
        setQnt(e.target.value);
      }
    }, 500),
    []
  );

  const handleChange = (e) => {
    handleInput(e);
  };

  //функции для модалки подтверждения
  const [isClose, setIsClose] = useState(false);
  const [isAgreeModalVisible, setIsAgreeModalVisible] = useState(false);

  const handleCloseAgreeModal = () => {
    setIsClose(true);
    setTimeout(() => setIsAgreeModalVisible(false), 500);
  };

  const handleOpenAgreeModal = () => {
    setIsClose(false);
    setIsAgreeModalVisible(true);
  };

  return (
    <div className="store transaction" ref={pageRef}>
      {!allTransactions ? (
        <div className="transactions__main">
          <h1 className="store__header">Отправить кВт•Ч</h1>

          <div className="battery-power transaction__balance">
            {powerBalance ? (
              <>
                <img
                  className="battery-power__lightning lightning-with-back"
                  src="/images/lightningWithBackground.png"
                  alt="lightning"
                />
                <TextString
                  secondSmall={lang === "ru" ? "Вт•Ч" : "W•h"}
                  big={(+powerBalance?.toFixed())?.toLocaleString("ru")}
                  bigFontSize={"32px"}
                />
                <div className="transaction__user-id">
                  {" "}
                  <p>ID: 000000</p>{" "}
                  <img
                    style={{ marginLeft: 5 }}
                    alt="copy"
                    src="/icon/copy-icon.svg"
                  />
                </div>
              </>
            ) : (
              <div
                style={{ height: "100%", borderRadius: "10px" }}
                className="store-loading-div"
              ></div>
            )}
          </div>
          <div className="transactions__inputs-container">
            <input
              name="id"
              onChange={handleChange}
              type="number"
              placeholder={idPlaceholder}
              className="power transactions__input"
            />
            <input
              type="number"
              onChange={handleChange}
              placeholder={qntPlaceholder}
              className="power transactions__input"
            />
            <button
              onClick={() => {
                if (id !== "" && qnt !== "") {
                  handleOpenAgreeModal();
                } else {
                  console.log(id, qnt);

                  setIdPlaceholder("Это поле обязательно к зополнению");
                  setQntPlaceholder("Это поле обязательно к зополнению");
                }
              }}
              style={{
                width: "100%",
                margin: "10px 0 0 0 ",
                position: "relative",
              }}
              className="battyry__collect"
            >
              ОТПРАВИТЬ
            </button>
            <h2 className="store__header transactions__header">
              История переводов
            </h2>

            {transactions.length === 0 ? (
              <div className="transactions_isEmpty">
                ВАША ИСТОРИЯ ПЕРЕВОДОВ ПУСТА
              </div>
            ) : (
              <div className="transactions__container">
                {transactions.map((el, idx) => {
                  return <TransactionCard key={idx} />;
                })}
                <button
                  onClick={() => setAllTransactions(true)}
                  style={{
                    width: "100%",
                    margin: "10px 0 0 0 ",
                    position: "relative",
                  }}
                  className="battyry__collect gradientBorder all-transactions__btn"
                >
                  <p className="all-transactions__text">ВСЕ ПЕРЕВОДЫ</p>
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="transactions__all">
          <div className="mining-info__header" style={{ left: "90%" }}>
            <button
              onClick={() => setAllTransactions(false)}
              style={{ position: "relative", margin: "0 0 1vh 0" }}
              className="modal__closeBtn"
            >
              <img src="/icon/cross.svg" alt="cross" />
            </button>
          </div>
          <h1 className="store__header">История переводов</h1>
          <div
            style={{ top: "8vh", position: "relative", marginBottom: "20vh" }}
          >
            {" "}
            {Object.entries(listOfTransactions).map((el, idx) => {
              return (
                <>
                  <div key={idx} className="transactions__month">
                    {el[0]}
                  </div>
                  {el[1].map((innderEl, i) => {
                    return <TransactionCard key={i} />;
                  })}
                </>
              );
            })}
          </div>
        </div>
      )}

      {isModalVisible && (
        <Modal
          title={modalTitle}
          text={modalText}
          secondText={secondModalText}
          btnText={modalBtnText}
          btnFunc={modalBtnFunc.current}
          setModalClose={handleCloseModal}
          bounding={pageBounding}
          upInfo={upInfo}
        />
      )}
      {isAgreeModalVisible && (
        <div
          className={`overlay ${isClose ? "overlayClose" : ""}`}
          onClick={handleCloseAgreeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="agree-modal"
            style={{
              width: `${pageBounding.width}px`,
              left: `${pageBounding.left}px`,
            }}
          >
            <p className="modal__title">
              Вы действительно хотите выбрать эту карточку?
            </p>
            <div className="agree-modal__btn-container">
              <button
                onClick={handleCloseAgreeModal}
                className="battyry__collect modal__acceptBtn agree-modal__btn"
              >
                Отмена
              </button>
              <button
                onClick={handleCloseAgreeModal}
                className="battyry__collect modal__acceptBtn agree-modal__btn"
              >
                Выбрать
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(TransactionsPage);
