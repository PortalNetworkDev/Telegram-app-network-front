import { useRef, useState } from "react";

export const useModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const [secondModalText, setSecondModalText] = useState("");
  const [modalBtnText, setModalBtnText] = useState("");
  const [upInfo, setUpInfo] = useState("");
  const modalBtnFunc = useRef(null);

  const handleOpenModal = (title, text, secondText, btnText, btnFunc, upInfo) => {
    setIsModalVisible(true);
    setModalTitle(title);
    setModalText(text);
    setSecondModalText(secondText);
    setModalBtnText(btnText);
    setUpInfo(upInfo)
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
