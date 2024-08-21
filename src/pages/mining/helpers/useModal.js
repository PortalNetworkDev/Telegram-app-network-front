import { useRef, useState } from "react";

export const useModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const [secondModalText, setSecondModalText] = useState("");
  const [modalBtnText, setModalBtnText] = useState("");
  const modalBtnFunc = useRef(null);

  const handleOpenModal = (title, text, secondText, btnText, btnFunc) => {
    setIsModalVisible(true);
    setModalTitle(title);
    setModalText(text);
    setSecondModalText(secondText);
    setModalBtnText(btnText);
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
    handleOpenModal,
    handleCloseModal,
  };
};