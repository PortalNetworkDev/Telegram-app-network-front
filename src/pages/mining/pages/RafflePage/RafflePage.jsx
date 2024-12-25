import React, { useEffect, useState } from "react";
import "./RafflePage.css";
import useBounding from "../../helpers/useBounding";
import { useDispatch } from "react-redux";
import { setPreviewAction } from "../../../../context/mining";
import Accordion from "../../widgets/Accordion/Accordion";

const RafflePage = () => {
  const dispatch = useDispatch();

  const [isAgreeModalVisible, setIsAgreeModalVisible] = useState(false);

  const { pageRef, pageBounding } = useBounding();

  //функции для модалки подтверждения
  const [isClose, setIsClose] = useState(false);

  const handleCloseAgreeModal = () => {
    setIsClose(true);
    setTimeout(() => setIsAgreeModalVisible(false), 500);
  };

  const handleOpenAgreeModal = () => {
    setIsClose(false);
    setIsAgreeModalVisible(true);
  };

  useEffect(() => {
    dispatch(setPreviewAction(false));
  }, [dispatch]);

  return (
    <div className="store raffle" ref={pageRef}>
      <div className="store__back mining-main__back"></div>
      <h1 className="store__header">РОЗЫГРЫШИ</h1>

      <div className="raffle__content">
        <Accordion
          raffle={[{ type: 1 }]}
          handleOpenAgreeModal={handleOpenAgreeModal}
        />
        <Accordion raffle={[{ type: 1 }, { type: 1 }]} />
        <Accordion raffle={[{ type: 2 }, { type: 1 }]} />
      </div>

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

export default React.memo(RafflePage);
