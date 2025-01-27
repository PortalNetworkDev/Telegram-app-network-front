import React, { useCallback, useEffect, useRef, useState } from "react";
import "./TransactionsPage.css";
import { useMeQuery } from "../../../../context/service/me.service";
import Modal from "../../widgets/Modal/Modal";
import { useModal } from "../../helpers/useModal";
import useBounding from "../../helpers/useBounding";

import TextString from "../../ui/TextSrting/TextString";
import {
  useLazyGetTransactionHistoryQuery,
  useLazySendPowerByIdQuery,
  useLazySendPowerQuery,
} from "../../../../context/service/mining.service";
import TransactionCard from "../../widgets/TransactionCard/TransactionCard";

const TransactionsPage = () => {
  const { data: me = null, refetch: refetchMe } = useMeQuery();
  const lang = me?.language_code === "en" ? "en" : "ru";
  const formRef = useRef(null);
  const [powerBalance, setPowerBalance] = useState();
  const { pageRef, pageBounding } = useBounding();
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

  //transactions req
  const [getTransactionHistory, { data }] = useLazyGetTransactionHistoryQuery();
  const [sendPower] = useLazySendPowerQuery();
  const [sendPowerById] = useLazySendPowerByIdQuery();
  const [transactionsList, setTransactionsList] = useState([]);
  const [partOfTransactions, setPartOfTransactions] = useState(1);
  const [allTransactions, setAllTransactions] = useState(false);
  let isFetching = useRef(false);
  let fetchTime = useRef(new Date().getTime());

  const fetchTransactions = async (partOfTransactions) => {
    if (isFetching.current) return;
    isFetching.current = true;

    try {
      const result = await getTransactionHistory({
        page: partOfTransactions,
      });

      if (allTransactions) {
        setPartOfTransactions((prev) => prev + 1);
        setTransactionsList((prev) => [...prev, ...result?.data?.items]);
      } else {
        setTransactionsList(result?.data?.items);
      }
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    } finally {
      isFetching.current = false;
      fetchTime.current = new Date().getTime();
    }
  };

  useEffect(() => {
    if (!allTransactions) {
      fetchTransactions(1);
      setPartOfTransactions(2);
    }
    if (allTransactions) {
      window.scrollTo({
        top: -500,
        left: 0,
        behavior: "instant",
      });
    }
  }, [allTransactions]);

  //effects
  useEffect(() => {
    setPowerBalance(me?.power_balance);
  }, [me]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  //inputs
  const [id, setId] = useState("");
  const [qnt, setQnt] = useState("");
  const [idPlaceholder, setIdPlaceholder] = useState(
    "ID или username получателя"
  );
  const [qntPlaceholder, setQntPlaceholder] = useState("Сумма Вт•Ч");

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
        e.target.value !== ""
          ? setId(e.target.value)
          : setIdPlaceholder("ID или @name получателя");
      } else {
        e.target.value !== ""
          ? setQnt(e.target.value)
          : setQntPlaceholder("Сумма Вт•Ч");
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
          <h1 className="store__header">Отправить Вт•Ч</h1>

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
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(me?.id);
                  }}
                  className="transaction__user-id"
                >
                  {" "}
                  <p>{`ID: ${me?.id}`}</p>{" "}
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
            <form ref={formRef}>
              <input
                name="id"
                onChange={(e) => {
                  const regex = /^[a-zA-Z0-9]*$/;
                  if (regex.test(e.target.value)) {
                    handleChange(e);
                  } else {
                    e.target.value = id;
                  }
                }}
                type="text"
                placeholder={idPlaceholder}
                className="power transactions__input"
              />
              <input
                type="number"
                onChange={handleChange}
                placeholder={qntPlaceholder}
                className="power transactions__input"
              />
            </form>
            <button
              onClick={() => {
                if (id !== "" && qnt !== "") {
                  handleOpenAgreeModal();
                } else {
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

            {transactionsList.length === 0 ? (
              <div className="transactions_isEmpty">
                ВАША ИСТОРИЯ ПЕРЕВОДОВ ПУСТА
              </div>
            ) : (
              <div className="transactions__container">
                {transactionsList.slice(0, 3).map((el) => {
                  return (
                    <TransactionCard
                      isSend={el?.sender?.id === me?.id}
                      nickname={
                        el?.sender?.id === me?.id
                          ? el?.recipient?.userName
                          : el?.sender?.userName
                      }
                      amount={el?.powerAmount}
                      date={el?.creationTime}
                      key={el?.id}
                    />
                  );
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
          <h1
            style={{ width: "100%", textAlign: "center" }}
            className="store__header"
          >
            История переводов
          </h1>
          <div
            className="all-transactions-container"
            onScroll={(e) => {
              const target = e.target;
              const scrollTop = target.scrollTop;
              const scrollHeight = target.scrollHeight;
              const clientHeight = target.clientHeight;
              const scrollFromBottom = scrollHeight - scrollTop - clientHeight;

              if (scrollFromBottom < 300) {
                if (data.isHasNextPage) {
                  if (new Date().getTime() - fetchTime.current < 500) return;
                  fetchTransactions(partOfTransactions);
                }
              }
            }}
            style={{ top: "8vh", position: "relative", marginBottom: "23vh" }}
          >
            {transactionsList.map((el, idx) => {
              const currentMonth = new Date(
                transactionsList[idx]?.creationTime
              ).getMonth();

              const prevMonth = new Date(
                transactionsList[idx - 1]?.creationTime
              ).getMonth();

              return (
                <>
                  {currentMonth && !prevMonth ? (
                    <div key={el?.creationTime} className="transactions__month">
                      {new Date(el?.creationTime).toLocaleString("default", {
                        month: "long",
                      })}
                    </div>
                  ) : currentMonth - prevMonth < 0 ? (
                    <div key={el?.creationTime} className="transactions__month">
                      {new Date(el?.creationTime).toLocaleString("default", {
                        month: "long",
                      })}
                    </div>
                  ) : (
                    ""
                  )}

                  <TransactionCard
                    isSend={el?.sender?.id === me?.id}
                    nickname={
                      el?.sender?.id === me?.id
                        ? el?.recipient?.userName
                        : el?.sender?.userName
                    }
                    amount={el?.powerAmount}
                    date={el?.creationTime}
                    key={el?.id}
                  />
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
              height: "30%",
            }}
          >
            <p className="modal__title">
              {`Вы действительно хотите перевести ${qnt} Вт•Ч пользователю`}
              <br />
              {`${Number(id) ? `ID ${id}` : `@${id}`}`}
            </p>
            <div className="agree-modal__btn-container">
              <button
                onClick={handleCloseAgreeModal}
                className="battyry__collect modal__acceptBtn agree-modal__btn"
              >
                Отмена
              </button>
              <button
                onClick={async () => {
                  if (!Number(id)) {
                    const result = await sendPower({
                      recipient: id,
                      amount: +qnt,
                    });
                    await fetchTransactions(1);
                    setPartOfTransactions(2);
                    handleCloseAgreeModal();
                    if (result.isError) {
                      handleOpenModal(
                        ["Ошибка", result.error.data.message, "", "ЗАКРЫТЬ"],
                        () => handleCloseModal()
                      );
                    } else {
                      formRef.current.reset();
                      refetchMe();
                    }
                  } else {
                    const result = await sendPowerById({
                      recipientId: +id,
                      amount: +qnt,
                    });
                    await fetchTransactions(1);
                    setPartOfTransactions(2);
                    handleCloseAgreeModal();
                    if (result.isError) {
                      handleOpenModal(
                        ["Ошибка", result.error.data.message, "", "ЗАКРЫТЬ"],
                        () => handleCloseModal()
                      );
                    } else {
                      formRef.current.reset();
                      refetchMe();
                    }
                  }
                }}
                className="battyry__collect modal__acceptBtn agree-modal__btn"
              >
                Отправить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(TransactionsPage);
