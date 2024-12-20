import { useRef, useState } from "react";

export const useModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const [secondModalText, setSecondModalText] = useState("");
  const [modalBtnText, setModalBtnText] = useState("");
  const [upInfo, setUpInfo] = useState("");
  const modalBtnFunc = useRef(null);

  const handleOpenModal = (text, btnFunc, upInfo) => {
    setIsModalVisible(true);
    setModalTitle(text[0]);
    setModalText(text[1]);
    setSecondModalText(text[2]);
    setModalBtnText(text[3]);
    setUpInfo(upInfo);
    modalBtnFunc.current = btnFunc;
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return {
    isModalVisible,
    modalTitle,
    modalText,
    secondModalText,
    modalBtnText,
    modalBtnFunc,
    upInfo,
    handleOpenModal,
    handleCloseModal,
  };
};
