import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

import { PreviewPage } from "./view/PreviewPage/PreviewPage";
import { MiningPage } from "./view/MiningPage/MiningPage";
import { useDispatch } from "react-redux";
import { setMiningAction } from "../../context/mining";

export const Mining = () => {
  const navigate = useNavigate();
  const back = () => navigate(-1);
  const dispatch = useDispatch();

  const [preview, setPreview] = useState(true);

  useEffect(() => {
    dispatch(setMiningAction(true));
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setPreview(false);
    }, 300);
  }, []);

  return (
    <>
      <section
        className={
          preview
            ? `${"mining-info__body"}`
            : `${"mining-info__body_withScroll"}`
        }
      >
        <div className="page">
          <div className="mining-info__header">
            <button
              className="back-btn"
              onClick={() => {
                back();
                dispatch(setMiningAction(false));
              }}
            >
              <IoArrowBack />
            </button>
          </div>
        </div>
        {preview ? <PreviewPage /> : <MiningPage />}
      </section>
    </>
  );
};
