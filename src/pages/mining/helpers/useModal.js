import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setOpenModalAction } from "../../../context/mining";

export const useModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const [secondModalText, setSecondModalText] = useState("");
  const [modalBtnText, setModalBtnText] = useState("");
  const modalBtnFunc = useRef(null);
  const dispatch = useDispatch();

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
    dispatch(setOpenModalAction(false));
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
